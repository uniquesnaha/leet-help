from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from .. import schemas, database, models
from ..database import get_db
from ..auth_utils import get_current_user
import os
from typing import List, Optional
import shutil

router = APIRouter(
    prefix="/entries",
    tags=["entries"],
)

UPLOAD_DIRECTORY = "./uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

# --- Problems ---

@router.get("/", response_model=List[schemas.Problem])
def get_problems(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    search: Optional[str] = None,
    difficulty: Optional[str] = None,
    tags: Optional[str] = None,
):
    """
    Get all problems for the current user.
    A user has a problem if they have at least one entry for it.
    """
    # Start with a query for problems
    query = db.query(models.Problem).join(models.Entry).filter(models.Entry.owner_id == current_user.id)

    if search:
        query = query.filter(models.Problem.title.contains(search) | models.Entry.notes.contains(search))
    if difficulty:
        query = query.filter(models.Problem.difficulty == difficulty)
    if tags:
        # Assuming tags are stored as a comma-separated string in the model
        query = query.filter(models.Problem.tags.contains(tags))

    # Get unique problems
    problems = query.distinct().all()
    return problems


@router.post("/", response_model=schemas.Entry)
async def create_entry(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    # Problem details
    title: str = Form(...),
    url: str = Form(...),
    difficulty: str = Form(...),
    tags: str = Form(...),
    description: str = Form(...),
    # Entry details
    solution_code: str = Form(...),
    notes: str = Form(...),
    time_complexity: str = Form(...),
    space_complexity: str = Form(...),
    # Artifacts
    artifacts: List[UploadFile] = File(...),
):
    # Find or create the problem
    db_problem = db.query(models.Problem).filter(models.Problem.url == url).first()
    if not db_problem:
        db_problem = models.Problem(
            title=title,
            url=url,
            difficulty=difficulty,
            tags=tags,
            description=description,
        )
        db.add(db_problem)
        db.commit()
        db.refresh(db_problem)

    # Create the new entry
    db_entry = models.Entry(
        solution_code=solution_code,
        notes=notes,
        time_complexity=time_complexity,
        space_complexity=space_complexity,
        owner_id=current_user.id,
        problem_id=db_problem.id,
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)

    # Handle artifacts
    for artifact_file in artifacts:
        # Determine artifact type from MIME type
        artifact_type = models.ArtifactType.IMAGE if "image" in artifact_file.content_type else models.ArtifactType.VOICE_MEMO

        file_location = os.path.join(UPLOAD_DIRECTORY, f"{db_entry.id}_{artifact_file.filename}")
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(artifact_file.file, file_object)

        db_artifact = models.Artifact(
            file_path=file_location,
            artifact_type=artifact_type,
            entry_id=db_entry.id
        )
        db.add(db_artifact)

    db.commit()
    db.refresh(db_entry)

    return db_entry
