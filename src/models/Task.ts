import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks", // Actual table name
    timestamps: true,
    underscored: true,
  },
);

export default Task;
