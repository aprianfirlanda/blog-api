# Blog API

A simple REST API for blogging with user authentication built with Node.js, Express, Sequelize, MySQL, and JWT.

---

## Features

- **User Registration & Login**: Secure JWT-based authentication for users.
- **Create Posts**: Authenticated users can create blog posts.
- **Read Posts**: Anyone can view all posts or individual posts.
- **Update Posts**: Only the author can update a post.
- **Delete Posts**: Only the author can delete a post.
- **Robust Testing**: Automated tests with Jest and Supertest.
- **MySQL Database**: Database migrations and seeders managed via Sequelize CLI.

---

## Tech Stack

- **Runtime:** Node.js >= 22.16.0
- **Database:** MySQL 8.0+
- **ORM:** Sequelize
- **Testing:** Jest, Supertest
- **Authentication:** JWT

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v22.16.0 or above)
- [MySQL](https://www.mysql.com/) (8.0 or above)
- [npm](https://www.npmjs.com/get-npm)
- *(optionally)* [Docker Compose](https://docs.docker.com/compose/) for easier local DB setup

---

### 2. Installation

Clone the repository and install dependencies:
```shell
git clone https://github.com/aprianfirlanda/blog-api
cd blog-api
npm install
```


---

### 3. Database Setup

Update your `.env` or `config/config.js` file with your MySQL credentials.

#### Using Docker (Optional)

You can quickly run MySQL with:
```shell
docker-compose up -d
```


---

### 4. Running the App

Start the application:
```shell
npm run dev
```
The server will run at [http://localhost:3000](http://localhost:3000) by default.

---

### 5. Running Tests

Tests use an in-memory database (or your test database defined in config) and require no manual server start.
```shell
npm test
```


---

## API Endpoints

> All authenticated routes require the following header:  
> `Authorization: Bearer <your_jwt_token>`

---

### Authentication

#### Register a New User

- **Endpoint:** `POST /api/users/register`
- **Request (JSON):**
  ```json
  {
    "name": "string, required",
    "email": "string, required, email",
    "password": "string, required, min 6 chars"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "name": "Test User",
      "email": "email@example.com"
    }
  }
  ```
- **Response (400 Bad Request):**
  ```json
  {
    "error": "Email already in use"
  }

  ```
- **cURL Example:**
  ```shell
  curl -X POST http://localhost:3000/api/users/register \
    -H "Content-Type: application/json" \
    -d '{"name": "Test User", "email": "testuser@example.com", "password": "supersecret"}'
  ```

---

#### User Login

- **Endpoint:** `POST /api/users/login`
- **Request (JSON):**
  ```json
  {
    "email": "string, required, email",
    "password": "string, required"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "<jwt_token>"
  }
  ```
- **cURL Example:**
  ```shell
  curl -X POST http://localhost:3000/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "supersecret"}'
  ```

---

### Posts

#### Get All Posts

- **Endpoint:** `GET /api/posts`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "First Post",
      "content": "Hello World",
      "author": "user",
      "createdAt": "2025-05-20T15:00:00.000Z"
    }
  ]
  ```
- **cURL Example:**
  ```shell
  curl http://localhost:3000/api/posts
  ```

---

#### Get Single Post

- **Endpoint:** `GET /api/posts/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "title": "First Post",
    "content": "Hello World",
    "author": "user",
    "createdAt": "2025-05-20T15:00:00.000Z"
  }
  ```
- **cURL Example:**
  ```shell
  curl http://localhost:3000/api/posts/1
  ```

---

#### Create a Post

- **Endpoint:** `POST /api/posts`
- **Headers:**  
  `Authorization: Bearer <jwt_token>`
- **Request (JSON):**
  ```json
  {
    "title": "string, required",
    "content": "string, required"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": 3,
    "title": "My New Post",
    "content": "Post content here.",
    "author": "user",
    "createdAt": "2025-06-19T10:00:00.000Z"
  }
  ```
- **cURL Example:**
  ```shell
  curl -X POST http://localhost:3000/api/posts \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <jwt_token>" \
    -d '{"title": "My New Post", "content": "Post content here."}'
  ```

---

#### Update a Post

- **Endpoint:** `PUT /api/posts/:id`
- **Headers:**  
  `Authorization: Bearer <jwt_token>`
- **Request (JSON):**
  ```json
  {
    "title": "string, optional",
    "content": "string, optional"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Post updated",
    "post": {
      "id": 3,
      "title": "Updated Title",
      "content": "Updated content",
      "author": "user",
      "updatedAt": "2025-06-19T11:00:00.000Z"
    }
  }
  ```
- **cURL Example:**
  ```shell
  curl -X PUT http://localhost:3000/api/posts/3 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <jwt_token>" \
    -d '{"title": "Updated Title", "content": "Updated content"}'
  ```

---

#### Delete a Post

- **Endpoint:** `DELETE /api/posts/:id`
- **Headers:**  
  `Authorization: Bearer <jwt_token>`
- **Response:**
  ```json
  {
    "message": "Post deleted"
  }
  ```
- **cURL Example:**
  ```shell
  curl -X DELETE http://localhost:3000/api/posts/3 \
    -H "Authorization: Bearer <jwt_token>"
  ```

---

**Note:**
- All protected endpoints require a valid JWT token in the `Authorization` header.
- Replace `<jwt_token>` with your actual JWT obtained from the login route.

---

## Useful Commands

**Run migrations:**
```shell
npm run db:migrate
```
**Undo las migration:**
```shell
npm run db:migrate:undo
```
