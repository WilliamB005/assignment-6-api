# Task Management RESTful API (Assignment 6)

A robust, fully functional RESTful backend API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. This service provides complete CRUD (Create, Read, Update, Delete) operations for managing tasks, complete with schema validation, environment configuration, and version control.

---

## 🚀 Features

* **Complete CRUD Functionality**: Create, retrieve, update, and delete tasks seamlessly.
* **MongoDB Persistence**: Powered by Mongoose ODM with structured schema validation and automatic timestamps (`createdAt`, `updatedAt`).
* **Robust Middleware**: Configured with `express.json()` for parsing incoming JSON payloads and `cors` for cross-origin resource sharing.
* **Error Handling**: Graceful error responses with appropriate HTTP status codes (`200`, `201`, `204`, `400`, `404`, `500`).

---

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database & ODM**: MongoDB, Mongoose
* **Environment Management**: `dotenv`
* **Development Tooling**: `node --watch` (native file watching)

---

## 📂 Project Structure

```text
assignment-6-api/
├── node_modules/         # Dependencies (ignored by Git)
├── .env                  # Environment variables (DB connection string)
├── .gitignore            # Git exclusion rules (node_modules, .env)
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Locked dependency tree
├── server.js             # Main application entry point & route definitions
└── README.md             # Project documentation
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd assignment-6-api
```

### 2. Install Dependencies
Install all required npm packages listed in `package.json`:
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of your project and add your MongoDB connection string and port:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here
```

### 4. Run the Server
Start the application using Node's built-in file watcher for seamless development:
```bash
node --watch server.js
```
*You should see terminal confirmation messages for both the server running on port 3000 and the successful database connection.*

---

## 🔌 API Endpoints & Usage

Base URL: `http://localhost:3000/api/tasks`

| Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Retrieve all tasks | None | `200 OK` |
| **GET** | `/api/tasks/:id` | Retrieve a single task by ID | None | `200 OK` |
| **POST** | `/api/tasks` | Create a new task | `{ "title": "String" }` | `201 Created` |
| **PATCH** | `/api/tasks/:id` | Update an existing task | `{ "completed": boolean }` | `200 OK` |
| **DELETE** | `/api/tasks/:id` | Delete a task by ID | None | `204 No Content` |

---

## 🧪 Testing the API

An exported API test collection (compatible with Thunder Client / Postman) is included in this repository. You can import the collection file directly into your REST client to instantly test all 5 CRUD endpoints.

---

## 👤 Author

* **William Bitar**  
* Course: Web Development / Assignment 6
