import express, { Router } from "express";
import {
  getAllTaskMetrics,
  getTaskMetricsByMonth,
  getTaskMetricsGroupedByMonth,
} from "../controllers/metricsController"; // Import the metrics controller

const metricsRouter: Router = express.Router();

// Route to get all task metrics (ungrouped)
metricsRouter.get("/metrics", getAllTaskMetrics);

// Route to get task metrics grouped by month

metricsRouter.get("/metrics/grouped", getTaskMetricsGroupedByMonth);

// Route to get task metrics for a specific month
metricsRouter.get("/metrics/:month", getTaskMetricsByMonth);

export default metricsRouter;
