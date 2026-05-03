# 📝 Task Manager Backend API

A RESTful API built with Node.js, Express, and PostgreSQL to manage tasks with proper validation, error handling, and clean architecture.

---

## 🚀 Features

* Create, Read, Update, Delete (CRUD) tasks
* Mark tasks as completed
* Input validation middleware
* Centralized error handling
* Clean layered architecture (Controller → Service → DB)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* PostgreSQL
* pg (node-postgres)
* dotenv

---

## 📂 Project Structure

```
backend/
├── controllers/
│ └── tasks.controller.js
├── services/
│ └── tasks.service.js
├── middlewares/
│ ├── errorHandler.js
│ └── validateTask.js
│ └── validateIds.js
├── utils/
│ └── asyncHandler.js
├── database/
│ └── db.js
├── routers/
│ └── router.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## 🗄️ Database Setup

This project uses **PostgreSQL** for data persistence.

To run this project locally, you need to create a database and a `tasks` table with the following schema:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  category VARCHAR(100) DEFAULT 'other',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### ⚙️ Steps to Setup Database

1. Install PostgreSQL (if not already installed)

2. Create a database:

```sql
CREATE DATABASE your_database_name;
```

3. Connect to your database and run the table creation query above

4. Update your `.env` file with your database credentials:

```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
```

---

### 📝 Notes

* `title` → required field
* `description` → optional
* `completed` → defaults to `false`
* `category` → defaults to `"other"`
* `created_at` → automatically set when task is created

---


## ⚙️ Environment Variables

Create a `.env` file in the root:

```
# main sever
BACKEND_PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV= development or production

# postgers database
DB_USER=your postgers's username
DB_HOST=your postgers's host name
DB_NAME=name of database
DB_PASSWORD=password of postgres
DB_PORT=port of postgres server
```

---

## 📦 Installation

```
git clone <your-repo-url>
cd backend
npm install
```

---

## ▶️ Run the Server

```
npm start
```

Server will run at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔹 Get All Tasks

```
GET /task
```

---

### 🔹 Create Task

```
POST /task
```

**Body:**

```json
{
  "title": "Learn Express",
  "description": "Optional description",
  "category": "work",
  "completed": false
}
```

👉 Notes:

* `title` → required (string, not empty)
* `description` → optional (string or null)
* `category` → optional (default: `"other"`)
* `completed` → optional (default: `false`)

---

### 🔹 Delete Multiple Tasks

```
DELETE /task
```

**Body:**

```json
{
  "ids": [1, 2, 3]
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Delete operation completed",
  "deleted": [1, 2],
  "notFound": [3],
  "invalidIds": ["4", "abc", true]

}
```

---

### 🔹 Mark Tasks as Completed (Batch)

```
PATCH /task/complete
```

**Body:**

```json
{
  "ids": [1, 2, 3]
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Mark operation completed",
  "updated": [1],
  "alreadyCompleted": [2],
  "notFound": [3],
  "invalidIds": ["4", "abc", true]
}
```

---

### 🔹 Edit Multiple Tasks

```
PUT /task
```

**Body:**

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Updated title",
      "description": "Updated description",
      "category": "personal"
    },
    {
      "id": 2,
      "title": "Another update"
    }
  ]
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Edit operation completed",
  "updated": [1],
  "notFound": [2],
  "invalidTasks": [
    {
      "task": { "id": "abc" },
      "error": "Invalid ID"
    }
  ]
}
```

---

### 🔹 Error Response Format

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Only visible in development"
}
```

---

### 🔹 Key Highlights

* No `:id` in URL (uses request body instead)
* Supports batch operations
* Handles partial success (valid + invalid inputs together)
* Consistent response structure across all APIs

---

## ✅ Success Response

```
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

---

## ❌ Error Response

```
{
  "success": false,
  "message": "Error message"
}
```

---

## 🧠 Architecture Flow

```
Request → Route → Controller → Service → Database → Error Handler → Response
```

---


## ⚠️ Notes

* Ensure PostgreSQL is running
* Set correct DATABASE_URL
* `.env` file is not committed (see `.env.example`)

---
