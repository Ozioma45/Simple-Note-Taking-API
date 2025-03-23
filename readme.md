# 📒 Simple Note-Taking API (TypeScript + Express + MongoDB)

A simple REST API for a note-taking application built using Node.js, Express, TypeScript, and MongoDB with user authentication and authorization.

## 🚀 Live API

**Base URL:** [https://notetakingapi-ruui.onrender.com](https://notetakingapi-ruui.onrender.com)

---

## 🛠️ Features

- **Create, Read, Update, and Delete (CRUD) notes**
- **Categories for notes**
- **Type Safety with TypeScript**
- **MongoDB Persistence using Mongoose**
- **Custom Middleware for Validation**
- **Logging Middleware to Track API Requests**
- **Error Handling with Custom Typed Classes**
- **User Authentication (Signup & Login with JWT)**
- **Secure Routes for Authorized Users**

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Ozioma45/NoteTakingApi.git
cd NoteTakingApi
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Create a `.env` File

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Development Server

```sh
npm run dev
```

The API will be running on `http://localhost:5000`

---

## 📌 API Endpoints

### 🔐 Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| `POST` | `/api/auth/signup` | Register a user   |
| `POST` | `/api/auth/login`  | Authenticate user |

### 📝 Notes Management

| Method   | Endpoint         | Description                         |
| -------- | ---------------- | ----------------------------------- |
| `POST`   | `/api/notes`     | Create a new note (Authenticated)   |
| `GET`    | `/api/notes`     | Get all notes (Authenticated)       |
| `GET`    | `/api/notes/:id` | Get a specific note (Authenticated) |
| `PUT`    | `/api/notes/:id` | Update a note (Authenticated)       |
| `DELETE` | `/api/notes/:id` | Delete a note (Authenticated)       |

### 📂 Categories Management

| Method | Endpoint                            | Description                           |
| ------ | ----------------------------------- | ------------------------------------- |
| `POST` | `/api/categories`                   | Create a category (Authenticated)     |
| `GET`  | `/api/categories`                   | Get all categories (Authenticated)    |
| `GET`  | `/api/notes/categories/:categoryId` | Get notes by category (Authenticated) |

---

## 📚 Usage

## 🔐 Authentication Usage

### ➤ User Signup

**Request:**

```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

### ➤ User Login

**Request:**

```json
POST /api/auth/login
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### ➤ Using Protected Routes

Authenticated routes require the `Authorization` header with the token received from login.

**Example:**

```sh
GET /api/notes
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
```

## 🏗️ Project Structure

```
📂 note-taking-api
│── 📂 dist                 # Compiled JavaScript output
│   ├── 📂 models         # Mongoose schemas
│   ├── 📂 routes         # Express routes
│   ├── 📂 middleware     # Error handling & authentication
│   ├── server.js        # Main entry point (compiled)
│── 📂 src
│   ├── 📂 models         # Mongoose schemas
│   ├── 📂 routes         # Express routes
│   ├── 📂 middleware     # Error handling & authentication
│   ├── 📂 controllers    # Business logic
│   ├── 📂 utils          # Helper functions
│   ├── server.ts        # Main entry point
│── .env                 # Environment variables
│── package.json         # Dependencies and scripts
│── tsconfig.json        # TypeScript config
│── README.md            # Documentation
```

---

---

## 🧪 Testing

## 🧪 Testing with Postman

1. Open **Postman**.
2. Set the **Base URL** to: `https://notetakingapi-ruui.onrender.com`
3. Use the above endpoints to send requests and test the API.

---

## 🛠️ Built With

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Typed JavaScript
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM for MongoDB
- **JSON Web Tokens (JWT)** - Secure Authentication

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 📞 Contact

For any inquiries or issues, reach out via:

- GitHub: [@Ozioma45](https://github.com/Ozioma45)
- Email: oziomaegole@gmail.com
