import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: err.format()
    });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Registro não encontrado" });
    }

    if (err.code === "P2002") {
      return res.status(409).json({
        message: `Valor duplicado no campo: ${err.meta?.target}`
      });
    }

    return res.status(500).json({
      message: "Erro interno do banco de dados",
      code: err.code
    });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
