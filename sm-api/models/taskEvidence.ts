import { DataTypes, Model, Optional } from "sequelize";
import { TaskStatus } from "types";
import { sequelize } from "./index";

interface TaskEvidenceAttributes {
  evidenceid: number;
  taskid: number;
  evidencepath: string;
  description?: string;
  status?:
    | TaskStatus.doing
    | TaskStatus.pending
    | TaskStatus.done
    | TaskStatus.blocked;
  uploadedat?: Date;
}

interface TaskEvidenceCreationAttributes
  extends Optional<TaskEvidenceAttributes, "evidenceid"> {}

export class TaskEvidence
  extends Model<TaskEvidenceAttributes, TaskEvidenceCreationAttributes>
  implements TaskEvidenceAttributes
{
  public evidenceid!: number;
  public taskid!: number;
  public evidencepath!: string;
  public uploadedat?: Date;
}

TaskEvidence.init(
  {
    evidenceid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evidencepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "doing", "done", "blocked"),
      allowNull: true,
    },
    uploadedat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "tasksevidence",
  }
);
