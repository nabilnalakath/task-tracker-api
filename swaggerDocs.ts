export const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "Task Management API Documentation",
    version: "1.0.0",
    description: "API documentation for managing tasks and getting metrics",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Dev server",
    },
    {
      url: "https://task-tracker-api-2z5y.onrender.com/api",
      description: "Render Dev server",
    },
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Get all tasks",
        description: "Route to get all tasks",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                example: {
                  status: "SUCCESS",
                  data: {
                    totalTasks: 2,
                    currentPage: 1,
                    tasks: [
                      {
                        id: 1,
                        title: "Task 1",
                        description: "Description 1",
                        status: "open",
                        createdAt: "2023-09-28T12:00:00Z",
                        updatedAt: "2023-09-28T12:00:00Z",
                      },
                      {
                        id: 2,
                        title: "Task 2",
                        description: "Description 2",
                        status: "completed",
                        createdAt: "2023-09-28T13:00:00Z",
                        updatedAt: "2023-09-28T13:00:00Z",
                      },
                    ],
                  },
                },
              },
            },
          },

          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        summary: "Create a new task",
        description: "Route to create a new task",
        requestBody: {
          description: "Task data",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Task 3",
                  },
                  description: {
                    type: "string",
                    example: "Description 3",
                  },
                  status: {
                    type: "string",
                    example: "open",
                  },
                },
                required: ["title", "status"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                example: {
                  status: "SUCCESS",
                  data: {
                    id: 3,
                    title: "Task 3",
                    description: "Description 3",
                    status: "open",
                    createdAt: "2023-09-28T14:00:00Z",
                    updatedAt: "2023-09-28T14:00:00Z",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                example: {
                  status: "FAIL",
                  data: {
                    error: "Validation error: 'title' is required",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/tasks/{taskId}": {
      put: {
        summary: "Update a task",
        description: "Route to update a task status",
        parameters: [
          {
            in: "path",
            name: "taskId",
            required: true,
            schema: {
              type: "integer",
              example: 1,
            },
            description: "ID of the task to update",
          },
        ],
        requestBody: {
          description: "Task status update",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "inprogress",
                  },
                },
                required: ["status"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                example: {
                  status: "SUCCESS",
                  data: {
                    id: 1,
                    title: "Task 1",
                    description: "Description 1",
                    status: "inprogress",
                    createdAt: "2023-09-28T12:00:00Z",
                    updatedAt: "2023-09-28T14:00:00Z",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                example: {
                  status: "FAIL",
                  data: {
                    error: "Validation error: 'status' is required",
                  },
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                example: {
                  status: "FAIL",
                  data: {
                    error: "Task not found",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/metrics": {
      get: {
        summary: "Get all task metrics (ungrouped)",
        description: "Route to get all task metrics (ungrouped)",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                example: {
                  status: "SUCCESS",
                  data: {
                    totalTasks: 50,
                    openTasks: 20,
                    inprogressTasks: 15,
                    completedTasks: 15,
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/metrics/{month}": {
      get: {
        summary: "Get task metrics for a specific month",
        description: "Route to get task metrics for a specific month",
        parameters: [
          {
            in: "path",
            name: "month",
            required: true,
            schema: {
              type: "string",
              example: "2023-09",
            },
            description: "Month in 'YYYY-MM' format",
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                example: {
                  status: "SUCCESS",
                  data: {
                    month: "October 2023",
                    metrics: {
                      totalTasks: "1",
                      openTasks: "0",
                      inprogressTasks: "0",
                      completedTasks: "1",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                example: {
                  status: "FAIL",
                  data: {
                    error: "Invalid month format",
                  },
                },
              },
            },
          },
          404: {
            description: "No metrics found for the specified month",
            content: {
              "application/json": {
                example: {
                  status: "FAIL",
                  data: {
                    error: "No metrics found for the specified month",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/metrics/grouped": {
      get: {
        summary: "Get task metrics grouped by month",
        description: "Route to get task metrics grouped by month",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                example: {
                  status: "SUCCESS",
                  data: [
                    {
                      month: "September 2023",
                      metrics: {
                        totalTasks: "2",
                        openTasks: "1",
                        inprogressTasks: "1",
                        completedTasks: "0",
                      },
                    },
                    {
                      month: "October 2023",
                      metrics: {
                        totalTasks: "1",
                        openTasks: "0",
                        inprogressTasks: "0",
                        completedTasks: "1",
                      },
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: "No metrics found",
            content: {
              "application/json": {
                example: {
                  status: "FAIL",
                  data: {
                    error: "No metrics found",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};

export default swaggerDocs;
