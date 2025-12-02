import { z } from "zod";

export const criarUtilizacaoSchema = z.object({
  motoristaId: z.number().int(),
  automovelId: z.number().int(),
  inicio: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "data inválida" }),
  motivo: z.string().min(1)
});

export const finalizarUtilizacaoSchema = z.object({
  fim: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "data inválida" })
});