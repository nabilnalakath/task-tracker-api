// Library Imports
import * as express from "express";
import * as dotenv from "dotenv";
import * as myParser from "body-parser";
import cors from "cors";

// Local Imports --------------------------------
import sequelize from "./config/database.config"; // Import your Sequelize instance
import { serveSwaggerUI, setupSwaggerUI } from "../swagger"; // Import the Swagger setup
import { errorHandler } from "./middleware/errorHandler";
import taskRoutes from "./routes/taskRoutes";
import metricsRoutes from "./routes/metricsRoutes";

dotenv.config();
const app = express.default();
const PORT = process.env.PORT || 3000;

app.use(myParser.json({ limit: "10mb" }));
app.use(myParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cors());

// Default route to check app status
app.get("/", (req, res) => {
    res.status(200).json({ message: `App is running on port ${PORT}` });
});

// API Routes ------------------- Can be modified to different base endpoints for tasks and metrics if needed
app.use("/api", taskRoutes);
app.use("/api", metricsRoutes);

// Swagger routes -------------------- To show Swagger UI
app.use("/api-docs", serveSwaggerUI, setupSwaggerUI);

app.use(errorHandler);

// Initialize the database connection and start the Express server
sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });
