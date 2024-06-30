import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Username
 *               - Email
 *               - Password
 *               - Role
 *             properties:
 *               Username:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro na requisição
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { Username, Email, Password, Role } = req.body;
    const PasswordHash = await bcrypt.hash(Password, 10);
    const user = await User.create({
      username: Username,
      email: Email,
      passwordhash: PasswordHash,
      role: Role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Erro na requisição
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ where: { email: Email } });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const isPasswordValid = await bcrypt.compare(Password, user.passwordhash);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Senha inválida" });

    const token = jwt.sign(
      {
        id: user.userid,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdat,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
