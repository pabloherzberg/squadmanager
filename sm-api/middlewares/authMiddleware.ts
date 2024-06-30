import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomMiddlewareBodyRequest } from "../types";

export const authenticateToken = (
  req: CustomMiddlewareBodyRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Acesso negado" });

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user as jwt.JwtPayload;
    next();
  });
};
