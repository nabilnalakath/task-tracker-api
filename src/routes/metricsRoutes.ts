import express, { Router } from "express";
import {
  getAllTaskMetrics,
  getTaskMetricsByMonth,
  getTaskMetricsGroupedByMonth,
} from "../controllers/metricsController"; // Import the metrics controller

const router: Router = express.Router();

// Route to get all task metrics (ungrouped)
router.get("/metrics", getAllTaskMetrics);

// Route to get task metrics grouped by month

router.get("/metrics/grouped", getTaskMetricsGroupedByMonth);

// Route to get task metrics for a specific month
router.get("/metrics/:month", getTaskMetricsByMonth);

export default router;
