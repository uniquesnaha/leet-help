from fastapi import APIRouter, HTTPException
from .. import schemas
from ..config import settings
import openai
import json

router = APIRouter(
    prefix="/ai",
    tags=["ai"],
)

if not settings.OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY environment variable not set in .env file")

client = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

@router.post("/explain", response_model=schemas.CodeExplanationResponse)
def explain_code(request: schemas.CodeExplanationRequest):
    try:
        completion = client.chat.completions.create(
            model=settings.AI_MODEL,
            messages=[
                {"role": "system", "content": "You are an expert software engineer. Explain the following Python code in the context of the given LeetCode problem. Use Markdown for formatting."},
                {"role": "user", "content": f"Problem: {request.problem_description}\n\nCode:\n```python\n{request.code}\n```"},
            ],
        )
        explanation = completion.choices[0].message.content
        return schemas.CodeExplanationResponse(explanation=explanation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/check-complexity", response_model=schemas.ComplexityCheckResponse)
def check_complexity(request: schemas.ComplexityCheckRequest):
    system_prompt = """
You are an expert developer and algorithm analyst.
Analyze the time and space complexity of the provided Python code.
Also, determine the optimal complexity for the problem the code is trying to solve.
Respond ONLY with a valid JSON object in the following format:
{
  "user_complexity": "O(n^2)",
  "optimal_complexity": "O(n)",
  "explanation": "A brief, clear explanation of why the user's code has its complexity and what the optimal approach is. Use Markdown."
}
"""
    try:
        completion = client.chat.completions.create(
            model=settings.AI_MODEL,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Code:\n```python\n{request.code}\n```"},
            ],
        )

        response_content = completion.choices[0].message.content
        # The API should return valid JSON, but we parse it to be safe
        response_data = json.loads(response_content)

        return schemas.ComplexityCheckResponse(
            user_complexity=response_data.get("user_complexity", "N/A"),
            optimal_complexity=response_data.get("optimal_complexity", "N/A"),
            explanation=response_data.get("explanation", "No explanation provided."),
        )
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned an invalid JSON response.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
