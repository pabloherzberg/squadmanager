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
  pending = "pending",
  doing = "doing",
  done = "done",
  blocked = "blocked",
}
