import { DataTypes, Model, Optional } from "sequelize";
import { RoleType } from "types";
import { sequelize } from "./index";

interface SquadMemberAttributes {
  squadmemberid: number;
  squadid: number;
  userid: number;
  role: RoleType.Manager | RoleType.Employee;
}

interface SquadMemberCreationAttributes
  extends Optional<SquadMemberAttributes, "squadmemberid"> {}

export class SquadMember
  extends Model<SquadMemberAttributes, SquadMemberCreationAttributes>
  implements SquadMemberAttributes
{
  public squadmemberid!: number;
  public squadid!: number;
  public userid!: number;
  public role!: RoleType.Manager | RoleType.Employee;
}

SquadMember.init(
  {
    squadmemberid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    squadid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Gerente", "Funcionário"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "squadmembers",
  }
);
