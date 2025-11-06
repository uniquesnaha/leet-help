import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db
from app.models import User, Problem, Entry, Artifact

# Setup the Test Database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

# Override the get_db dependency to use the test database
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_and_teardown_db():
    # Setup: ensure the database is clean before tests
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    # Teardown: clean up the database after tests
    Base.metadata.drop_all(bind=engine)

def get_auth_headers():
    # Register and login a user to get a token
    client.post("/auth/register", json={"email": "testuser@example.com", "password": "password"})
    response = client.post(
        "/auth/token",
        data={"username": "testuser@example.com", "password": "password"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_create_and_get_problem_with_entry():
    headers = get_auth_headers()

    # Create an entry
    entry_data = {
        "title": "Two Sum",
        "url": "https://leetcode.com/problems/two-sum/",
        "difficulty": "Easy",
        "tags": "Array, Hash Table",
        "description": "A classic problem.",
        "solution_code": "print('hello world')",
        "notes": "My notes.",
        "time_complexity": "O(n)",
        "space_complexity": "O(n)",
    }
    # In FastAPI TestClient, files are passed as a list of tuples
    files = [("artifacts", ("test_artifact.txt", b"some file content", "text/plain"))]

    response = client.post("/entries/", headers=headers, data=entry_data, files=files)

    assert response.status_code == 200
    created_entry = response.json()
    assert created_entry["solution_code"] == "print('hello world')"
    assert len(created_entry["artifacts"]) > 0

    # Get the problems for the user
    response = client.get("/entries/", headers=headers)
    assert response.status_code == 200
    problems = response.json()
    assert len(problems) == 1
    assert problems[0]["title"] == "Two Sum"
    assert len(problems[0]["entries"]) == 1
    assert problems[0]["entries"][0]["notes"] == "My notes."

def test_scrape_leetcode_url():
    # Note: This test makes a live network request to LeetCode
    response = client.post(
        "/entries/scrape",
        json={"url": "https://leetcode.com/problems/two-sum/"},
    )
    assert response.status_code == 200
    problem_details = response.json()
    assert problem_details["title"] == "Two Sum"
    assert "Array" in problem_details["tags"]
