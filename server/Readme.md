# Basic Curd API

## Overview

Task API is a simple RESTful API built with **Node.js** and **Express.js** for managing tasks. It supports basic CRUD (Create, Read, Update, Delete) operations and includes interactive API documentation using **Swagger UI**.

---

## Features

- View API information
- Health check endpoint
- Get all tasks
- Get a task by Id
- Create a new task
- Update an existing task
- Delete a task
- Interactive Swagger documentation

---

## Installation & Run

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run the application

```bash
node index.js
```

The server will start on:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Returns API information |
| GET | `/health` | Returns server health status |
| GET | `/tasks` | Returns all tasks |
| GET | `/task/{id}` | Returns a task by ID |
| POST | `/tasks` | Creates a new task |
| PUT | `/task/{id}` | Updates an existing task |
| DELETE | `/task/{id}` | Deletes a task |

---

## cURL Request

```bash
curl -i http://localhost:3000/tasks
```

### Output

![Output](curl_request.png)
---

## Swagger Documentation Screenshot


![Swagger UI](swagger-ui.png)


---

## Technologies Used

- Node.js
- Express.js
- Swagger UI Express
- Swagger JSDoc

---

## Author

Abdul Wasay Rais