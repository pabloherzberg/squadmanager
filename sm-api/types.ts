import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomMiddlewareBodyRequest extends Request {
  user?: JwtPayload | string;
}

export enum RoleType {
  Manager = "Gerente",
  Employee = "Funcionário",
}

export enum TaskStatus {
  todo = "to-do",
  doing = "doing",
  done = "done",
  blocked = "blocked",
}
