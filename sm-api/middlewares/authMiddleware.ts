import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustumRequest extends Request {
  user?: jwt.JwtPayload | string;
}

export const authenticateToken = (
  req: CustumRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Acesso negado" });

  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
};
