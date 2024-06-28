import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./index";

interface UserAttributes {
  userid: number;
  username: string;
  email: string;
  passwordhash: string;
  role: "Gerente" | "Funcionário";
  createdat?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userid"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public userid!: number;
  public username!: string;
  public email!: string;
  public passwordhash!: string;
  public role!: "Gerente" | "Funcionário";
  public createdat?: Date;
}

User.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Gerente", "Funcionário"),
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
    tableName: "users",
  }
);
