from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register():
    response = client.post(
        "/auth/register",
        json={"email": "testuser@example.com", "password": "password"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login():
    # First, register a user
    client.post(
        "/auth/register",
        json={"email": "testuser2@example.com", "password": "password"},
    )
    # Then, log in with the same credentials
    response = client.post(
        "/auth/token",
        data={"username": "testuser2@example.com", "password": "password"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
