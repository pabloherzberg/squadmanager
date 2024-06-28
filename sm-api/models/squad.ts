import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index";
import { User } from "./user";

interface SquadAttributes {
  SquadID: number;
  Name: string;
  Description: string;
  CreatedBy: number;
  createdat?: Date;
}

interface SquadCreationAttributes
  extends Optional<SquadAttributes, "SquadID"> {}

export class Squad
  extends Model<SquadAttributes, SquadCreationAttributes>
  implements SquadAttributes
{
  public SquadID!: number;
  public Name!: string;
  public Description!: string;
  public CreatedBy!: number;
  public createdat?: Date;
}

Squad.init(
  {
    SquadID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "UserID",
      },
    },
    createdat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "squads",
  }
);

Squad.belongsTo(User, { foreignKey: "CreatedBy" });
