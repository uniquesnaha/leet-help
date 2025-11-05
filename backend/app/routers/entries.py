from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from .. import schemas, database, models
from ..database import get_db
import requests
import json
import os
from typing import Optional

router = APIRouter(
    prefix="/entries",
    tags=["entries"],
)

UPLOAD_DIRECTORY = "./uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

from ..auth_utils import get_current_user
import requests
import json

@router.post("/scrape", response_model=schemas.ProblemDetails)
def scrape_leetcode_url(leetcode_url: schemas.LeetCodeURL, db: Session = Depends(get_db)):
    url = leetcode_url.url
    # Extract the title slug from the URL
    try:
        title_slug = url.split("/problems/")[1].split("/")[0]
    except IndexError:
        raise HTTPException(status_code=400, detail="Invalid LeetCode URL")

    graphql_query = {
        "query": """
            query questionData($titleSlug: String!) {
                question(titleSlug: $titleSlug) {
                    questionId
                    title
                    content
                    difficulty
                    topicTags {
                        name
                        slug
                    }
                }
            }
        """,
        "variables": {
            "titleSlug": title_slug
        }
    }

    try:
        response = requests.post("https://leetcode.com/graphql", json=graphql_query)
        response.raise_for_status()
        data = response.json()
    except (requests.RequestException, json.JSONDecodeError) as e:
        raise HTTPException(status_code=400, detail=f"Error fetching data from LeetCode API: {e}")

    question_data = data.get("data", {}).get("question")

    if not question_data:
        raise HTTPException(status_code=404, detail="Problem not found")

    return schemas.ProblemDetails(
        title=question_data.get("title"),
        url=url,
        difficulty=question_data.get("difficulty"),
        tags=[tag.get("name") for tag in question_data.get("topicTags", [])],
        description=question_data.get("content"),
    )

@router.post("/", response_model=schemas.Entry)
async def create_entry(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    title: str = Form(...),
    url: str = Form(...),
    difficulty: str = Form(...),
    tags: str = Form(...),
    description: str = Form(...),
    solution_code: str = Form(...),
    notes: str = Form(...),
    time_complexity: str = Form(...),
    space_complexity: str = Form(...),
    image: Optional[UploadFile] = File(None),
    voice_memo: Optional[UploadFile] = File(None),
):
    image_path = None
    if image:
        image_path = os.path.join(UPLOAD_DIRECTORY, image.filename)
        with open(image_path, "wb") as buffer:
            buffer.write(await image.read())

    voice_memo_path = None
    if voice_memo:
        voice_memo_path = os.path.join(UPLOAD_DIRECTORY, voice_memo.filename)
        with open(voice_memo_path, "wb") as buffer:
            buffer.write(await voice_memo.read())

    db_entry = models.Entry(
        title=title,
        url=url,
        difficulty=difficulty,
        tags=tags, # Tags are sent as a comma-separated string
        description=description,
        solution_code=solution_code,
        notes=notes,
        time_complexity=time_complexity,
        space_complexity=space_complexity,
        image_path=image_path,
        voice_memo_path=voice_memo_path,
        owner_id=current_user.id,
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry
