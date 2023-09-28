
# Task Tracker API

A TypeScript Node.js API project for managing tasks with a PostgreSQL database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up the Database](#setting-up-the-database)
  - [Running Migrations](#running-migrations)
  - [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
  - [Task Enpoints](#task-endpoints)
  - [Metrics Enpoints](#metrics-endpoints)
- [Swagger Documentation](#swagger-documentation)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- PostgreSQL database server running.

## Getting Started

### Installing Dependencies

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/task-tracker-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracker-api
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

### Setting Up the Database

1. Create a PostgreSQL database for the project. 

2. Copy the `.env.example` file to `.env` and configure the database connection details:

   ```env
   DATABASE_NAME=yourdb
   DATABASE_USERNAME=yourusername
   DATABASE_PASSWORD=yourpassword
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   ```

### Running Migrations

To create the necessary database tables, run the following migration command:

```bash
npm run migrate
```


You will see the following message upon successful migration
```
Connected to the database
Migration completed successfully
Disconnected from the database
```

### Starting the Server

Start the Node.js server:

```bash
npm run dev
```

By default, the server will run on `http://localhost:3000`.

## API Endpoints

- **GET /**: Check app status
  - Response Example:
    ```json
    { "message":"App is running on port 3000" }
    ```
### Task Endpoints

- **POST /api/tasks**: Create a new task.
  - Request Body:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description",
      "status": "open"
    }
    ```
  - Response Example:
    ```json
    {
      "status": "success",
      "data": {
        "id": 1,
        "title": "Task Title",
        "description": "Task Description",
        "status": "open",
        "createdAt": "2023-09-28T12:00:00Z",
        "updatedAt": "2023-09-28T12:00:00Z"
      }
    }
    ```

- **PUT /api/tasks/{taskId}**: Update a task's status.
  - Request Params:
    - `taskId` (integer): ID of the task to update.
  - Request Body:
    ```json
    {
      "status": "inprogress"
    }
    ```
  - Response Example:
    ```json
    {
      "status": "success",
      "data": {
        "id": 1,
        "title": "Task Title",
        "description": "Task Description",
        "status": "inprogress",
        "createdAt": "2023-09-28T12:00:00Z",
        "updatedAt": "2023-09-28T14:00:00Z"
      }
    }
    ```

- **GET /api/tasks**: Get all tasks with pagination.
  - Query Params:
    - `page` (integer, optional): Page number (default: 1).
    - `limit` (integer, optional): Number of tasks per page (default: 10).
  - Request Example - `/api/tasks?page=1&limit=8`
  - Response Example:
    ```json
    {
      "status": "success",
      "data": {
        "totalTasks": 2,
        "currentPage": 1,
        "tasks": [
          {
            "id": 1,
            "title": "Task 1",
            "description": "Description 1",
            "status": "open",
            "createdAt": "2023-09-28T12:00:00Z",
            "updatedAt": "2023-09-28T12:00:00Z"
          },
          {
            "id": 2,
            "title": "Task 2",
            "description": "Description 2",
            "status": "completed",
            "createdAt": "2023-09-28T13:00:00Z",
            "updatedAt": "2023-09-28T13:00:00Z"
          }
        ]
      }
    }
    ```
### Metrics Endpoints

- **GET /api/metrics**: Get all task metrics (ungrouped).
  - Response Example:
    ```json
    {
      "status": "success",
      "data": {
        "totalTasks": 50,
        "openTasks": 20,
        "inprogressTasks": 15,
        "completedTasks": 15
      }
    }
    ```

- **GET /api/metrics/{month}**: Get task metrics for a specific month.
  - Request Params:
    - `month` (string): Month in 'YYYY-MM' format.
  - Response Example:
    ```json
    {
      "status": "success",
      "data": {
        "month": "October 2023",
        "metrics": {
          "totalTasks": "1",
          "openTasks": "0",
          "inprogressTasks": "0",
          "completedTasks": "1"
        }
      }
    }
    ```

- **GET /api/metrics/grouped**: Get task metrics grouped by month.
  - Response Example:
    ```json
    {
      "status": "success",
      "data": [
        {
          "month": "September 2023",
          "metrics": {
            "totalTasks": "2",
            "openTasks": "1",
            "inprogressTasks": "1",
            "completedTasks": "0"
          }
        },
        {
          "month": "October 2023",
          "metrics": {
            "totalTasks": "1",
            "openTasks": "0",
            "inprogressTasks": "0",
            "completedTasks": "1"
          }
        }
      ]
    }
    ```


For more API details of endpoints and documentation, please refer to the [Swagger Documentation](#swagger-documentation) section below.

## Swagger Documentation

You can access the Swagger documentation to explore and test the API endpoints:

- Local server Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Render deployed server Swagger UI: [https://task-tracker-api-2z5y.onrender.com/api-docs/](https://task-tracker-api-2z5y.onrender.com/api-docs/)