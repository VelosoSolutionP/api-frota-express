import { Request, Response } from "express";
import { MotoristaService } from "./motorista.service";

export const MotoristaController = {
  async create(req: Request, res: Response) {
    const novo = await MotoristaService.criar(req.body);
    return res.status(201).json(novo);
  },

  async list(req: Request, res: Response) {
    const { nome } = req.query;
    const lista = await MotoristaService.listar({ nome: nome as string | undefined });
    return res.json(lista);
  },

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await MotoristaService.obter(id);
    if (!item) return res.status(404).json({ message: "Motorista não encontrado" });
    return res.json(item);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await MotoristaService.atualizar(id, req.body);
    return res.json(updated);
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await MotoristaService.excluir(id);
    return res.json({ message: "Morotista removido com sucesso" });
  }
};