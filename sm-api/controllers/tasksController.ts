import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CustomMiddlewareBodyRequest } from "types";
import { Task } from "../models/task";
import { TaskEvidence } from "../models/taskEvidence";
import { User } from "../models/user";

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tasks
 */
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - duedate
 *               - squadid
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duedate:
 *                 type: string
 *                 format: date-time
 *               squadid:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: ["Pendente", "Em Progresso", "Concluído"]
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
export const createTask = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const { title, description, duedate, squadid, status } = req.body;
    const assignedto = (req.user as JwtPayload).id;
    const task = await Task.create({
      title,
      description,
      duedate,
      assignedto,
      squadid,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obter detalhes de uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Detalhes da tarefa
 *       404:
 *         description: Tarefa não encontrada
 */
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obter todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *       400:
 *         description: Erro na requisição
 */
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll<any>();
    const users = await User.findAll<any>();

    const userMap: { [key: number]: string } = users.reduce((acc, user) => {
      acc[user.userid] = user.username;
      return acc;
    }, {} as { [key: number]: string });

    const updatedTasks = tasks.map((task) => ({
      ...task.toJSON(),
      assignedtoUsername: userMap[task.assignedto] || task.assignedto,
    }));

    res.json(updatedTasks);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duedate:
 *                 type: string
 *                 format: date-time
 *               assignedto:
 *                 type: number
 *               squadid:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: ["todo", "doing", "done", "blocked"]
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       400:
 *         description: Erro na requisição
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, duedate, assignedto, squadid, status } =
      req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.duedate = duedate || task.duedate;
    task.assignedto = assignedto || task.assignedto;
    task.squadid = squadid || task.squadid;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletar uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       400:
 *         description: Erro na requisição
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks/{id}/evidence:
 *   post:
 *     summary: Adicionar evidência à tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - evidencepath
 *             properties:
 *               evidencepath:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               status:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Evidência adicionada com sucesso
 *       400:
 *         description: Erro na requisição
 */
export const addTaskEvidence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { evidencepath, description, status } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Task ID is required." });
    }

    const taskEvidence = await TaskEvidence.create({
      taskid: Number(id),
      evidencepath,
      description,
      status,
    });
    res.status(201).json(taskEvidence);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks/{id}/evidence:
 *   get:
 *     summary: Obter detalhes de uma evidência de tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evidência de tarefa
 *     responses:
 *       200:
 *         description: Detalhes da evidência de tarefa
 *       404:
 *         description: Evidência de tarefa não encontrada
 */
export const getTaskEvidenceById = async (req: Request, res: Response) => {
  try {
    const taskEvidence = await TaskEvidence.findAll({
      where: { taskid: req.params.id },
    });
    if (!taskEvidence)
      return res
        .status(404)
        .json({ error: "Evidência de tarefa não encontrada" });
    res.json(taskEvidence);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /tasks/{id}/evidence:
 *   delete:
 *     summary: Deletar uma evidência de tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da evidência de tarefa
 *     responses:
 *       204:
 *         description: Evidência de tarefa deletada com sucesso
 *       404:
 *         description: Evidência de tarefa não encontrada
 *       400:
 *         description: Erro na requisição
 */
export const deleteTaskEvidence = async (req: Request, res: Response) => {
  try {
    const taskEvidence = await TaskEvidence.findByPk(req.params.id);
    if (!taskEvidence)
      return res
        .status(404)
        .json({ error: "Evidência de tarefa não encontrada" });

    await taskEvidence.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
