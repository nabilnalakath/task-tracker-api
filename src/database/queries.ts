
import { NextFunction } from "express-serve-static-core";

// Local imports
import Task from "../models/Task";
import { CustomError } from "../middleware/errorHandler";

export const getTaskMetricsQuery = async (options: any) => {
  try {
    const metrics = await Task.findAll(options);
    return metrics;
  } catch (error) {
     throw new CustomError(500, "Error fetching task metrics");
  }
};
