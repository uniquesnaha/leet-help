from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_scrape():
    response = client.post(
        "/entries/scrape",
        json={"url": "https://leetcode.com/problems/two-sum/"},
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Two Sum"

def test_create_and_get_entry():
    # First, register and login a user to get a token
    client.post(
        "/auth/register",
        json={"email": "testuser3@example.com", "password": "password"},
    )
    response = client.post(
        "/auth/token",
        data={"username": "testuser3@example.com", "password": "password"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Then, create an entry
    response = client.post(
        "/entries/",
        headers=headers,
        files={"image": ("test.txt", b"test", "text/plain")},
        data={
            "title": "Two Sum",
            "url": "https://leetcode.com/problems/two-sum/",
            "difficulty": "Easy",
            "tags": "Array,Hash Table",
            "description": "Description",
            "solution_code": "Code",
            "notes": "Notes",
            "time_complexity": "O(n)",
            "space_complexity": "O(n)",
        },
    )
    assert response.status_code == 200

    # Finally, get the entries
    response = client.get("/entries/", headers=headers)
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "Two Sum"
