from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime
from .models import ArtifactType

# --- User Schemas ---
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- Artifact Schemas ---
class ArtifactBase(BaseModel):
    artifact_type: ArtifactType
    file_path: str

class ArtifactCreate(ArtifactBase):
    pass

class Artifact(ArtifactBase):
    id: int
    entry_id: int

    class Config:
        from_attributes = True

# --- Entry Schemas ---
class EntryBase(BaseModel):
    solution_code: str
    notes: str
    time_complexity: str
    space_complexity: str

class EntryCreate(EntryBase):
    pass

class Entry(EntryBase):
    id: int
    owner_id: int
    problem_id: int
    created_at: datetime
    artifacts: List[Artifact] = []

    class Config:
        from_attributes = True

# --- Problem Schemas ---
class ProblemBase(BaseModel):
    title: str
    url: str
    difficulty: str
    description: str
    tags: str # Keep as comma-separated string for input

class ProblemCreate(ProblemBase):
    pass

class Problem(ProblemBase):
    id: int
    entries: List[Entry] = []
    tags: List[str] # Convert to list for output

    @validator('tags', pre=True, always=True)
    def split_tags(cls, v):
        if isinstance(v, str):
            return [tag.strip() for tag in v.split(',')]
        return v

    class Config:
        from_attributes = True

# --- LeetCode Scraper Schemas ---
class LeetCodeURL(BaseModel):
    url: str

class ProblemDetails(BaseModel):
    title: str
    url: str
    difficulty: str
    tags: list[str]
    description: str

# --- AI Tool Schemas ---
class CodeExplanationRequest(BaseModel):
    code: str
    problem_description: str

class CodeExplanationResponse(BaseModel):
    explanation: str

class ComplexityCheckRequest(BaseModel):
    code: str

class ComplexityCheckResponse(BaseModel):
    user_complexity: str
    optimal_complexity: str
    explanation: str
