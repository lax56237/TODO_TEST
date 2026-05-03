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

### Get All Tasks

```
GET /task/tasks
```

### Create Task

```
POST /task/addtasks
```

Body:

```
{
  "title": "Task title",
  "description": "Optional",
  "category": "Optional"
}
```

### Update Task

```
PUT /task/tasks/:id
```

### Mark Task as Completed

```
PATCH /task/tasks/:id/complete
```

### Delete Task

```
DELETE /task/tasks/:id
```

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
