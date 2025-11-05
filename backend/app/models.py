from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    entries = relationship("Entry", back_populates="owner")

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(String)
    difficulty = Column(String)
    tags = Column(String) # Storing tags as a comma-separated string
    description = Column(Text)
    solution_code = Column(Text)
    notes = Column(Text)
    image_path = Column(String, nullable=True)
    voice_memo_path = Column(String, nullable=True)
    time_complexity = Column(String)
    space_complexity = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="entries")
