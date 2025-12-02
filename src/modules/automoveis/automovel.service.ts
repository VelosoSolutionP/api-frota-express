import { prisma } from "../../config/prisma";

export const AutomovelService = {
  async criar(data: { placa: string; cor: string; marca: string }) {
    return prisma.automovel.create({ data });
  },

  async listar(filters: { marca?: string; cor?: string }) {
    const where: any = {};

    if (filters.marca) {
      where.marca = {
        contains: filters.marca,
      };
    }

    if (filters.cor) {
      where.cor = {
        contains: filters.cor,
      };
    }

    return prisma.automovel.findMany({
      where,
      orderBy: { id: "asc" }
    });
  },

  async obter(id: number) {
    return prisma.automovel.findUnique({ where: { id } });
  },

  async atualizar(
    id: number,
    data: Partial<{ placa: string; cor: string; marca: string }>
  ) {
    return prisma.automovel.update({
      where: { id },
      data
    });
  },

  async excluir(id: number) {
    return prisma.automovel.delete({ where: { id } });
  }
};