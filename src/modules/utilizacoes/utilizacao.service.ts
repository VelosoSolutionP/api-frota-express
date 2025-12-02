import { prisma } from "../../config/prisma";
import httpError from "http-errors";

export const UtilizacaoService = {
  async criar(data: {
    motoristaId: number | string;
    automovelId: number | string;
    inicio: string;
    motivo: string;
  }) {
    const motoristaId = Number(data.motoristaId);
    const automovelId = Number(data.automovelId);

    if (isNaN(motoristaId) || isNaN(automovelId)) {
      throw httpError(400, "IDs devem ser numéricos");
    }

    const motorista = await prisma.motorista.findUnique({ where: { id: motoristaId } });
    if (!motorista) throw httpError(404, "Motorista não encontrado");

    const automovel = await prisma.automovel.findUnique({ where: { id: automovelId } });
    if (!automovel) throw httpError(404, "Automóvel não encontrado");

    const conflitoMotorista = await prisma.utilizacao.findFirst({ where: { motoristaId, fim: null } });
    if (conflitoMotorista) throw httpError(400, "Motorista já está utilizando outro automóvel");

    const conflitoAutomovel = await prisma.utilizacao.findFirst({ where: { automovelId, fim: null } });
    if (conflitoAutomovel) throw httpError(400, "Automóvel já está em uso");

    return prisma.utilizacao.create({
      data: {
        motoristaId,
        automovelId,
        motivo: data.motivo,
        inicio: new Date(data.inicio),
      },
      include: { motorista: true, automovel: true },
    });
  },

  async finalizar(id: number, fim: string) {
    const utilizacao = await prisma.utilizacao.findUnique({ where: { id } });

    if (!utilizacao) throw httpError(404, "Registro de utilização não encontrado");
    if (utilizacao.fim) throw httpError(400, "Utilização já finalizada");

    return prisma.utilizacao.update({
      where: { id },
      data: { fim: new Date(fim) },
      include: { motorista: true, automovel: true },
    });
  },

  async listar() {
    return prisma.utilizacao.findMany({
      include: { motorista: true, automovel: true },
      orderBy: { inicio: "desc" },
    });
  },

  async obter(id: number) {
    return prisma.utilizacao.findUnique({
      where: { id },
      include: { motorista: true, automovel: true },
    });
  },
};