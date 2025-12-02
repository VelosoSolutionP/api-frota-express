import { prisma } from "../../config/prisma";

export const MotoristaService = {
  async criar(data: { nome: string }) {
    return prisma.motorista.create({ data });
  },

  async listar(filter?: { nome?: string }) {
    const where: any = {};

    if (filter?.nome) {
      where.nome = {
        contains: filter.nome,
      };
    }

    const results = await prisma.motorista.findMany({
      where,
      orderBy: { id: "asc" }
    });

    if (filter?.nome) {
      return results.filter((m) =>
        m.nome.toLowerCase().includes(filter.nome!.toLowerCase())
      );
    }

    return results;
  },

  async obter(id: number) {
    return prisma.motorista.findUnique({ where: { id } });
  },

  async atualizar(id: number, data: Partial<{ nome: string }>) {
    return prisma.motorista.update({ where: { id }, data });
  },

  async excluir(id: number) {
    return prisma.motorista.delete({ where: { id } });
  }
};