import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
});

async function runMigration() {
  try {
    await client.connect();
    console.log("Connected to the database");

    // SQL query to create the table
    const createTableSQL = `
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    await client.query(createTableSQL);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Error running migration:", error);
  } finally {
    await client.end();
    console.log("Disconnected from the database");
  }
}

runMigration();
