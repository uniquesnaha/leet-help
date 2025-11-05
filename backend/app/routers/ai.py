from fastapi import APIRouter, HTTPException
from .. import schemas
from openai import OpenAI
from ..config import OPENROUTER_API_KEY

router = APIRouter(
    prefix="/ai",
    tags=["ai"],
)

if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY environment variable not set")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

@router.post("/explain", response_model=schemas.CodeExplanationResponse)
def explain_code(request: schemas.CodeExplanationRequest):
    try:
        response = client.chat.completions.create(
            model="z-ai/glm-4.5-air",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that explains code."},
                {"role": "user", "content": f"Explain the following code for the problem: {request.problem_description}\n\n```python\n{request.code}\n```"},
            ],
        )
        explanation = response.choices[0].message.content
        return schemas.CodeExplanationResponse(explanation=explanation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/check-complexity", response_model=schemas.ComplexityCheckResponse)
def check_complexity(request: schemas.ComplexityCheckRequest):
    try:
        response = client.chat.completions.create(
            model="z-ai/glm-4.5-air",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that analyzes code complexity."},
                {"role": "user", "content": f"Analyze the time and space complexity of the following code:\n\n```python\n{request.code}\n```"},
            ],
        )
        feedback = response.choices[0].message.content
        return schemas.ComplexityCheckResponse(feedback=feedback)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
