import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerDocs";

// Swagger configuration options
const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: swaggerDocs,
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], // Path to your route files
};

// Initialize Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const serveSwaggerUI = swaggerUi.serve;
export const setupSwaggerUI = swaggerUi.setup(swaggerSpec);
