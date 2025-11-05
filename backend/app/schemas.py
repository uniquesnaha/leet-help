from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class LeetCodeURL(BaseModel):
    url: str

class ProblemDetails(BaseModel):
    title: str
    url: str
    difficulty: str
    tags: list[str]
    description: str

from pydantic import BaseModel, validator

class EntryBase(BaseModel):
    title: str
    url: str
    difficulty: str
    tags: str
    description: str
    solution_code: str
    notes: str
    time_complexity: str
    space_complexity: str

class EntryCreate(EntryBase):
    pass

class Entry(EntryBase):
    id: int
    owner_id: int
    image_path: str | None = None
    voice_memo_path: str | None = None
    tags: list[str]

    @validator('tags', pre=True, always=True)
    def split_tags(cls, v):
        if isinstance(v, str):
            return [tag.strip() for tag in v.split(',')]
        return v

    class Config:
        from_attributes = True

class CodeExplanationRequest(BaseModel):
    code: str
    problem_description: str

class CodeExplanationResponse(BaseModel):
    explanation: str

class ComplexityCheckRequest(BaseModel):
    code: str

class ComplexityCheckResponse(BaseModel):
    feedback: str
