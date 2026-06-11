A full-stack todo and task management web application built with React, Express, and PostgreSQL.

Tech Stack
Frontend: React 18, Vite, React Router DOM, Axios
Backend: Node.js, Express.js, Sequelize ORM
Database: PostgreSQL
Auth: JWT (1-day expiry), bcrypt password hashing
Project Structure
alter/
├── client/                  # React frontend (port 5173)
│   └── src/
│       ├── api/axios.js     # Axios instance with JWT interceptor
│       ├── components/      # Navbar
│       └── pages/           # Home, Login, Signup, About
└── server/                  # Express backend (port 5000)
    └── src/
        ├── config/          # Sequelize DB connection
        ├── models/          # User, TodoList, TodoItem, Tag, TodoItemTag
        ├── controllers/     # auth, todolist, todoitem, tag, stats, public
        ├── middleware/      # JWT verification
        └── routes/          # auth, lists, tasks, tags, stats, public
Getting Started
1. Start the backend
cd server
npm install
npm run dev
2. Start the frontend
cd client
npm install
npm run dev
App: http://localhost:5173
API: http://localhost:5000
Environment Variables
Create server/.env:

PORT=5000
NODE_ENV=development

DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo

JWT_SECRET=your_jwt_secret
API Routes
Auth
Method	Route	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login, returns JWT
Todo Lists
Method	Route	Description
GET	/api/lists	Get all user's lists
POST	/api/lists	Create a list
GET	/api/lists/:id	Get list by ID
PUT	/api/lists/:id	Update a list
DELETE	/api/lists/:id	Delete a list
PATCH	/api/lists/:id/share	Generate public shareable link
Todo Items
Method	Route	Description
POST	/api/tasks	Create a task
PATCH	/api/tasks/:id/status	Toggle completion
PATCH	/api/tasks/:id/rename	Rename task
DELETE	/api/tasks/:id	Delete task
POST	/api/tasks/:id/tags	Assign tags to task
PATCH	/api/tasks/reorder	Reorder tasks
GET	/api/tasks/filter/tag/:tagId	Filter tasks by tag
Tags
Method	Route	Description
GET	/api/tags	Get all tags
POST	/api/tags	Create a tag
DELETE	/api/tags/:id	Delete a tag
Stats & Public
Method	Route	Description
GET	/api/lists/:listId/stats	Get list statistics
GET	/api/public/:token	View public list (no auth)
Data Model
User → (1:N) → TodoList → (1:N) → TodoItem
User → (1:N) → Tag
TodoItem ↔ (M:N) ↔ Tag  (via TodoItemTag)
All child records cascade-delete with their parent.

Features
Create and manage multiple todo lists
Tasks with priority (low / medium / high), due dates, and reminders
Tag system with custom colors, filterable
Drag-and-drop task reordering
Public shareable list links via unique token
JWT-protected routes with token stored in localStorage
