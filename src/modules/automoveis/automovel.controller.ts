import { Request, Response } from "express";
import { AutomovelService } from "./automovel.service";

export const AutomovelController = {
  async create(req: Request, res: Response) {
    const novo = await AutomovelService.criar(req.body);
    return res.status(201).json(novo);
  },

  async list(req: Request, res: Response) {
    const { marca, cor } = req.query;

    const filters = {
      marca: marca ? String(marca) : undefined,
      cor: cor ? String(cor) : undefined
    };

    const lista = await AutomovelService.listar(filters);
    return res.json(lista);
  },

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await AutomovelService.obter(id);

    if (!item) {
      return res.status(404).json({ message: "Automóvel não encontrado" });
    }

    return res.json(item);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await AutomovelService.atualizar(id, req.body);
    return res.json(updated);
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await AutomovelService.excluir(id);
    return res.json({ message: "Automóvel removido com sucesso" });
  }
};