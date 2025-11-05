from fastapi import FastAPI
from .database import engine, Base
from .routers import auth, entries, ai

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(entries.router)
app.include_router(ai.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the LeetCode Tracker API"}
