import { z } from "zod";

export const createAutomovelSchema = z.object({
  placa: z.string().min(1),
  cor: z.string().min(1),
  marca: z.string().min(1)
});

export const updateAutomovelSchema = createAutomovelSchema.partial();