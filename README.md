Full Stack Todo & Task Management Application

A modern full-stack Todo and Task Management web application built with **React**, **Express.js**, and **PostgreSQL**. The application allows users to create and manage multiple todo lists, organize tasks with tags, track progress, and share lists publicly.

---

## 🚀 Tech Stack

### Frontend

* React 18
* Vite
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* Sequelize ORM

### Database

* PostgreSQL

### Authentication

* JSON Web Tokens (JWT) – 1 Day Expiry
* bcrypt Password Hashing

---

## 📁 Project Structure

```text
alter/
├── client/                       # React Frontend (Port 5173)
│   └── src/
│       ├── api/
│       │   └── axios.js          # Axios instance with JWT interceptor
│       ├── components/
│       │   └── Navbar.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── Signup.jsx
│           └── About.jsx
│
└── server/                       # Express Backend (Port 5000)
    └── src/
        ├── config/               # Database configuration
        ├── models/               # Sequelize models
        │   ├── User
        │   ├── TodoList
        │   ├── TodoItem
        │   ├── Tag
        │   └── TodoItemTag
        │
        ├── controllers/          # Business logic
        │   ├── auth
        │   ├── todolist
        │   ├── todoitem
        │   ├── tag
        │   ├── stats
        │   └── public
        │
        ├── middleware/
        │   └── verifyToken.js    # JWT verification middleware
        │
        └── routes/
            ├── auth
            ├── lists
            ├── tasks
            ├── tags
            ├── stats
            └── public
```

---

## ✨ Features

### Authentication

* User Registration
* Secure Login
* JWT-based Authentication
* Password Hashing with bcrypt
* Protected Routes

### Todo Lists

* Create Multiple Todo Lists
* Update List Details
* Delete Lists
* Public Shareable Links

### Task Management

* Create Tasks
* Rename Tasks
* Mark Tasks as Completed
* Delete Tasks
* Set Priorities (Low / Medium / High)
* Due Dates & Reminders
* Drag-and-Drop Reordering

### Tags

* Create Custom Tags
* Assign Multiple Tags to Tasks
* Custom Tag Colors
* Filter Tasks by Tags

### Statistics

* View List Progress
* Completion Statistics
* Task Insights

### Public Sharing

* Generate Unique Public Links
* Share Lists Without Authentication

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd alter
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
NODE_ENV=development

DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo

JWT_SECRET=your_jwt_secret
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | `/api/auth/signup` | Register a new user         |
| POST   | `/api/auth/login`  | Login and receive JWT token |

---

### Todo Lists

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/api/lists`           | Get all user lists         |
| POST   | `/api/lists`           | Create a new list          |
| GET    | `/api/lists/:id`       | Get list by ID             |
| PUT    | `/api/lists/:id`       | Update list                |
| DELETE | `/api/lists/:id`       | Delete list                |
| PATCH  | `/api/lists/:id/share` | Generate public share link |

---

### Todo Items

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| POST   | `/api/tasks`                   | Create a task            |
| PATCH  | `/api/tasks/:id/status`        | Toggle completion status |
| PATCH  | `/api/tasks/:id/rename`        | Rename task              |
| DELETE | `/api/tasks/:id`               | Delete task              |
| POST   | `/api/tasks/:id/tags`          | Assign tags to task      |
| PATCH  | `/api/tasks/reorder`           | Reorder tasks            |
| GET    | `/api/tasks/filter/tag/:tagId` | Filter tasks by tag      |

---

### Tags

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/api/tags`     | Get all tags     |
| POST   | `/api/tags`     | Create a new tag |
| DELETE | `/api/tags/:id` | Delete tag       |

---

### Statistics & Public Access

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/lists/:listId/stats` | Get list statistics       |
| GET    | `/api/public/:token`       | Access public shared list |

---

## 🗄️ Database Schema

### Relationships

```text
User
 ├── TodoList (1:N)
 │     └── TodoItem (1:N)
 │
 └── Tag (1:N)

TodoItem
    ↕
TodoItemTag
    ↕
Tag

(Many-to-Many Relationship)
```

### Cascade Delete

* Deleting a User removes all Lists, Tasks, and Tags.
* Deleting a List removes all associated Tasks.
* Deleting a Task removes tag associations automatically.

---

## 🔒 Security

* Passwords hashed using bcrypt.
* JWT authentication with 1-day expiry.
* Protected API routes using middleware.
* User-specific data isolation.
* Environment variable configuration for secrets.

---

## 📈 Future Enhancements

* Email reminders
* Task notifications
* Team collaboration
* Real-time updates using WebSockets
* Dark mode
* Task attachments
* Search and advanced filters

---

## 👨‍💻 Author

Built using React, Express.js, Sequelize, PostgreSQL, and JWT Authentication.
