# A Samll To-do Task Web Application

A minimal to-do task manager built to fulfill the Full Stack Engineer Take Home Assessment requirements.

## 🛠️ Tech Stack

- **Frontend**: React (JavaScript, SPA)
- **Backend**: Node.js with Express (REST API)
- **Database**: MySQL (relational)
- **Containerization**: Docker & Docker Compose

## 📦 Project Structure
```brash
.
├── backend/          # Express API + MySQL integration
├── frontend/         # React SPA
├── todo_app.sql      # Database schema
├── docker-compose.yml 
└── README.md
```

## 🗃️ Database Schema (`todo_app.sql`)

The database uses a single table named `task`:

```sql
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## ▶️ How to Run

The entire application runs in Docker containers. No local installation of Node.js, npm, or MySQL is required.

# Prerequisites
  - Docker installed
  - Terminal with Bash (Linux, macOS, or Windows with WSL)

# Steps
  **1. Clone this repository**
  ```brash
  git clone https://github.com/your-username/todo-app.git
  cd todo-app
  ```

  **2. Start all services**
  ```brash
  docker-compose up --build
  ```

  **3. Open the app in your browser**
  - Frontend: http://localhost:3000
  - (Backend API runs internally on port 8080)

  **4. Use the app**
  - Add tasks with title & description
  - Only the 5 most recent uncompleted tasks are shown
  - Click “Done” to hide a task

  **5. Stop the app**
   Press `Ctrl + C` in the terminal, or run:
```brash
docker-compose down
```
    
## 🧪 Testing

**Backend Tests**
```brash
cd backend
npm test
```

**Frontend Tests**
```brash
cd frontend
npm test
```
