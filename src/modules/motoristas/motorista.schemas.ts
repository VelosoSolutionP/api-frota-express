import { z } from "zod";
export const createMotoristaSchema = z.object({ nome: z.string().min(1) });
export const updateMotoristaSchema = createMotoristaSchema.partial();