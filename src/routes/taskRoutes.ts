import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController";
import {
  validateTaskCreation,
  validateTaskUpdate,
} from "../middleware/validationMiddleware";

const taskRouter = Router();

// create a new route with validation middleware
taskRouter.post("/tasks", validateTaskCreation, createTask);

// Update Task Route with Validation Middleware
taskRouter.put("/tasks/:taskId", validateTaskUpdate, updateTask);

// Get All Tasks with Pagination Route
taskRouter.get("/tasks", getAllTasks);

export default taskRouter;
