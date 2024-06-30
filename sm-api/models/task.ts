import { DataTypes, Model, Optional } from "sequelize";
import { TaskStatus } from "types";
import { sequelize } from "./index";

interface TaskAttributes {
  taskid: number;
  title: string;
  description: string;
  duedate: Date;
  assignedto: number;
  squadid: number;
  status: TaskStatus.pending | TaskStatus.doing | TaskStatus.done;
  createdat?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "taskid"> {}

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public taskid!: number;
  public title!: string;
  public description!: string;
  public duedate!: Date;
  public assignedto!: number;
  public squadid!: number;
  public status!: TaskStatus.pending | TaskStatus.doing | TaskStatus.done;
  public createdat?: Date;
}

Task.init(
  {
    taskid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duedate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    assignedto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    squadid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "doing", "done"),
      allowNull: false,
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "tasks",
  }
);
