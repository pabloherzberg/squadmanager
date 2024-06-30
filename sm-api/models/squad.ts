import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index";

interface SquadAttributes {
  squadid: number;
  name: string;
  description: string;
  createdby: number;
  createdat?: Date;
}

interface SquadCreationAttributes
  extends Optional<SquadAttributes, "squadid" | "createdat"> {}

export class Squad
  extends Model<SquadAttributes, SquadCreationAttributes>
  implements SquadAttributes
{
  public squadid!: number;
  public name!: string;
  public description!: string;
  public createdby!: number;
  public createdat?: Date;
}

Squad.init(
  {
    squadid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdat: {
      type: DataTypes.DATE,
      field: "createdat",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    tableName: "squads",
  }
);
