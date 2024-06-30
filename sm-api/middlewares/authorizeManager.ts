import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomMiddlewareBodyRequest, RoleType } from "../types";

export const authorizeManager = (
  req: CustomMiddlewareBodyRequest,
  res: Response,
  next: NextFunction
) => {
  const role = (req.user as JwtPayload).role;
  if (role !== RoleType.Manager) {
    return res.status(403).json({
      error: "Acesso negado: Apenas gerentes podem realizar esta operação",
    });
  }
  next();
};
