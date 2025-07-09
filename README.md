# MoaNote: Weekly Commit Digest

## 1. Project Overview

MoaNote is a web application designed to provide system engineers with a weekly digest of Gerrit commits. It aims to summarize individual contributions into concise, AI-generated summaries (2-3 sentences) that can be read in under 30 seconds, facilitating quicker code reviews and team awareness.

## 2. Getting Started

### 2.1 Prerequisites

Ensure you have the following installed:
- Docker Desktop (or Docker Engine + Docker Compose)
- Node.js (LTS recommended) and npm
- Python 3.9+ and pip

### 2.2 Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/taeels/moa-note.git
    cd moa-note
    ```

2.  **Build and Run Docker Containers:**
    Navigate to the `infrastructure` directory and start the services. This will build the frontend and backend images and start the PostgreSQL database.
    ```bash
    cd infrastructure
    docker-compose up --build -d
    ```
    _Note: If you encounter port allocation errors (e.g., port 3000 or 8000 already in use), ensure no other applications are using these ports or restart your Docker daemon._

### 2.3 Accessing the Application

Once the Docker containers are running:
-   **Frontend (Web UI):** Access in your browser at `http://localhost:3000`
-   **Backend (API):** Access at `http://localhost:8000` (e.g., `http://localhost:8000/` will return `{"Hello": "World"}`)

## 3. Project Structure

This project is organized as a monorepo with the following top-level directories:

-   `frontend/`: Contains the Next.js (React/TypeScript) application for the web UI.
-   `backend/`: Contains the FastAPI (Python) application for the API and business logic.
-   `infrastructure/`: Contains Docker Compose configurations for orchestrating services (frontend, backend, PostgreSQL).

## 4. Key Technologies

-   **Frontend:** Next.js, React, TypeScript, Ant Design
-   **Backend:** FastAPI, Python, SQLAlchemy, PostgreSQL
-   **Containerization:** Docker, Docker Compose

## 5. Development Guidelines

### 5.1 Running Locally (without Docker)

While Docker Compose is recommended for integrated development, you can run services individually:

-   **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
-   **Backend:**
    ```bash
    cd backend
    pip install -r requirements.txt
    uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
    ```
    _Note: You will need a running PostgreSQL instance accessible at `postgresql://user:password@localhost:5432/db` for the backend to connect._

### 5.2 Database Migrations

Database schema changes are handled via SQLAlchemy models. Ensure your Docker `db` service is running, and the `create_tables()` function in `backend/src/main.py` will create the necessary tables on startup.

### 5.3 Contribution

-   Follow the existing code style and project conventions.
-   Create granular commits, with each commit addressing a single logical change or task.
-   Ensure your changes pass linting and tests (if applicable).

## 6. Contact

For any questions or issues, please refer to the project maintainers.
