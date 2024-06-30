import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Squad } from "../models/squad";
import { SquadMember } from "../models/squadMembers";
import { CustomMiddlewareBodyRequest, RoleType } from "../types";

/**
 * @swagger
 * tags:
 *   name: Squads
 *   description: Gerenciamento de squads
 */
/**
 * @swagger
 * /squad/create:
 *   post:
 *     summary: Criar uma nova squad
 *     tags: [Squads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Squad criada com sucesso
 *       400:
 *         description: Erro na criação da squad requisição
 */
export const createSquad = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const { name, description } = req.body;
    const createdBy = (req.user as JwtPayload).id;
    const squad = await Squad.create({
      name,
      description,
      createdby: createdBy,
    });
    res.status(201).json(squad);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /squad/{id}:
 *   get:
 *     summary: Obter detalhes de uma squad
 *     tags: [Squads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da squad
 *     responses:
 *       200:
 *         description: Detalhes da squad
 *       404:
 *         description: Squad não encontrada
 */
export const getSquadById = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const squad = await Squad.findByPk(req.params.id);
    if (!squad) return res.status(404).json({ error: "Squad não encontrada" });
    res.json(squad);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /squad:
 *   get:
 *     summary: Obter todas as squads
 *     tags: [Squads]
 *     responses:
 *       200:
 *         description: Lista de squads
 *       400:
 *         description: Erro na requisição
 */
export const getAllSquads = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const squads = await Squad.findAll();
    res.json(squads);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /squad/{id}:
 *   put:
 *     summary: Atualizar uma squad
 *     tags: [Squads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da squad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Squad atualizada com sucesso
 *       404:
 *         description: Squad não encontrada
 *       400:
 *         description: Erro na requisição
 */
export const updateSquad = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const { name, description } = req.body;
    const squad = await Squad.findByPk(req.params.id);
    if (!squad) return res.status(404).json({ error: "Squad não encontrada" });

    squad.name = name || squad.name;
    squad.description = description || squad.description;

    await squad.save();
    res.json(squad);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /squad/{id}:
 *   delete:
 *     summary: Deletar uma squad
 *     tags: [Squads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da squad
 *     responses:
 *       204:
 *         description: Squad deletada com sucesso
 *       404:
 *         description: Squad não encontrada
 *       400:
 *         description: Erro na requisição
 */
export const deleteSquad = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const squad = await Squad.findByPk(req.params.id);
    if (!squad) return res.status(404).json({ error: "Squad não encontrada" });

    await squad.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /squad/:id/members:
 *   post:
 *     summary: Adicionar um membro ao squad
 *     tags: [Squads]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do squad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Membro adicionado com sucesso
 *       400:
 *         description: Erro na requisição
 */
export const addMemberToSquad = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const { userId } = req.body;
    const squadId = Number(req.params.id);

    const squadMember = await SquadMember.create({
      squadid: squadId,
      userid: userId,
      role: RoleType.Employee,
    });

    res.status(201).json(squadMember);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};

/**
 * @swagger
 * /squad/{id}/members/{memberId}:
 *   delete:
 *     summary: Remover um membro do squad
 *     tags: [Squads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do squad
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro do squad
 *     responses:
 *       204:
 *         description: Membro removido com sucesso
 *       404:
 *         description: Membro ou squad não encontrado
 *       400:
 *         description: Erro na requisição
 */
export const removeMemberFromSquad = async (
  req: CustomMiddlewareBodyRequest,
  res: Response
) => {
  try {
    const { id: squadId, memberId } = req.params;

    const squadMember = await SquadMember.findOne({
      where: { squadid: squadId, squadmemberid: memberId },
    });

    if (!squadMember)
      return res.status(404).json({ error: "Membro ou squad não encontrado" });

    await squadMember.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
