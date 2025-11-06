from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    entries = relationship("Entry", back_populates="owner")

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(String, unique=True, index=True)
    difficulty = Column(String)
    tags = Column(String) # Storing tags as a comma-separated string
    description = Column(Text)

    entries = relationship("Entry", back_populates="problem")

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    solution_code = Column(Text)
    notes = Column(Text)
    time_complexity = Column(String)
    space_complexity = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    owner_id = Column(Integer, ForeignKey("users.id"))
    problem_id = Column(Integer, ForeignKey("problems.id"))

    owner = relationship("User", back_populates="entries")
    problem = relationship("Problem", back_populates="entries")
    artifacts = relationship("Artifact", back_populates="entry", cascade="all, delete-orphan")

class ArtifactType(enum.Enum):
    VOICE_MEMO = "voice_memo"
    IMAGE = "image"

class Artifact(Base):
    __tablename__ = "artifacts"

    id = Column(Integer, primary_key=True, index=True)
    file_path = Column(String, nullable=False)
    artifact_type = Column(SQLAlchemyEnum(ArtifactType), nullable=False)

    entry_id = Column(Integer, ForeignKey("entries.id"))
    entry = relationship("Entry", back_populates="artifacts")
