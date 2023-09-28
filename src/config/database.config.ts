
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), 
  dialect: 'postgres',
  logging: false, 
  pool: {
    max: 10, 
    min: 0,  
    acquire: 30000, // Maximum time, that a connection can be idle before being released
  },
});

export default sequelize;
