

# Node.js MongoDB CRUD Application Documentation

## Overview

This Node.js application serves as a RESTful API that interacts with a MongoDB database to perform CRUD (Create, Read, Update, Delete) operations on a collection named "TaskCollection." It exposes various endpoints to manage tasks, such as creating, reading, updating, and deleting tasks.

## Prerequisites

Before running the application, ensure you have the following prerequisites:

1. Node.js installed on your system.
2. MongoDB Atlas account or a locally running MongoDB instance.
3. MongoDB Node.js driver (`mongodb`) installed as a dependency (`npm install mongodb`).
4. A `.env` file containing the MongoDB connection string, as specified in the `.env` example below:

   ```
   DB_USER=test-crud
   DB_PASS=dKxyHDKaiYni9rd2
   DB_URI=mongodb+srv://<username>:<password>@cluster0.dp3om9f.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   ```

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies:

   ```
   npm install
   ```

## Usage

1. Start the application:

   ```
   npm start
   ```

2. The API server will start on the specified port (default is 5000). You can access it at `http://localhost:5000`/`https://task-management-server-nu.vercel.app/`.

## Endpoints

### Home

- **GET** `/`
  - Description: Verifies if the server is running.
  - Response: "Server is running!"

### Get All Tasks

- **GET** `/getTasks`
  - Description: Retrieves all tasks from the "TaskCollection" collection.
  - Response: An array of task objects.

### Get Task by ID

- **GET** `/getTask/:id`
  - Description: Retrieves a task by its ID.
  - Request Parameters:
    - `id` (string): The ID of the task to retrieve.
  - Response: The task object with the specified ID.

### Create Task

- **POST** `/postTasks`
  - Description: Creates a new task and adds it to the "TaskCollection" collection.
  - Request Body: JSON object representing the new task.
  - Response: The inserted task object.

### Update Task by ID

- **PUT** `/updateTask/:id`
  - Description: Updates an existing task by its ID.
  - Request Parameters:
    - `id` (string): The ID of the task to update.
  - Request Body: JSON object with updated task data.
  - Response: The updated task object.

### Delete Task by ID

- **DELETE** `/deleteTask/:id`
  - Description: Deletes a task by its ID.
  - Request Parameters:
    - `id` (string): The ID of the task to delete.
  - Response: A success message or an error message.

## Error Handling

- The API returns appropriate HTTP status codes (e.g., 200 for success, 404 for not found, 500 for server errors) along with corresponding error messages in case of errors.

## Closing Notes

This documentation provides an overview of the Node.js application that connects to a MongoDB database to perform CRUD operations on tasks. You can use this application as a foundation for building your task management system or integrate it into your projects as needed.

For any questions or issues, please refer to the application's repository or contact the developer.