# LeetCode Tracker

This is a full-stack application that helps you track your LeetCode progress. It features a Python FastAPI backend and a React frontend.

## Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    -   On Windows:
        ```bash
        venv\\Scripts\\activate
        ```
    -   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```

4.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Create a `.env` file:**
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    SECRET_KEY=a_very_secure_secret_key
    OPENROUTER_API_KEY=your_openrouter_api_key
    ```

6.  **Start the server:**
    ```bash
    uvicorn app.main:app --host 0.0.0.0 --port 8000
    ```

## Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```
