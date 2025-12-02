import { Request, Response, NextFunction } from "express";
import { UtilizacaoService } from "./utilizacao.service";

export const UtilizacaoController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const novo = await UtilizacaoService.criar(req.body);
      return res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  async finalizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { fim } = req.body;

      const updated = await UtilizacaoService.finalizar(id, fim);
      return res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const lista = await UtilizacaoService.listar();
      return res.json(lista);
    } catch (err) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = await UtilizacaoService.obter(id);

      if (!item) {
        return res.status(404).json({ message: "Registro não encontrado" });
      }

      return res.json(item);
    } catch (err) {
      next(err);
    }
  }
};