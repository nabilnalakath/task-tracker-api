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

const router = Router();

// create a new route with validation middleware
router.post("/tasks", validateTaskCreation, createTask);

// Update Task Route with Validation Middleware
router.put("/tasks/:taskId", validateTaskUpdate, updateTask);

// Get All Tasks with Pagination Route
router.get("/tasks", getAllTasks);

export default router;
