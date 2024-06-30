import { Request, Response } from "express";
import { Task } from "../models/task";
import { TaskEvidence } from "../models/taskEvidence";

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
 *               - assignedto
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
 *               assignedto:
 *                 type: number
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
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, duedate, assignedto, squadid, status } =
      req.body;
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
    const tasks = await Task.findAll();
    res.json(tasks);
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
 *                 enum: ["Pendente", "Em Progresso", "Concluído"]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskid
 *               - evidencepath
 *             properties:
 *               taskid:
 *                 type: number
 *               evidencepath:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evidência adicionada com sucesso
 *       400:
 *         description: Erro na requisição
 */
export const addTaskEvidence = async (req: Request, res: Response) => {
  try {
    const { taskid, evidencepath } = req.body;
    const taskEvidence = await TaskEvidence.create({ taskid, evidencepath });
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
    const taskEvidence = await TaskEvidence.findByPk(req.params.id);
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
