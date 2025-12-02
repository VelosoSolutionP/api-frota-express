import request from "supertest";
import { prisma } from "../src/config/prisma";
import { app } from "../src/app";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

describe("Utilizacoes API", () => {
  let motoristaId: number;
  let automovelId: number;
  let utilizacaoId: number;

  beforeAll(async () => {
    await prisma.utilizacao.deleteMany();
    await prisma.automovel.deleteMany();
    await prisma.motorista.deleteMany();

    const motorista = await prisma.motorista.create({ data: { nome: "Joao" } });
    const automovel = await prisma.automovel.create({ data: { placa: "ZZZ-999", cor: "Branco", marca: "Toyota" } });

    motoristaId = motorista.id;
    automovelId = automovel.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve criar uma utilização corretamente", async () => {
    const inicio = new Date().toISOString();

    const res = await request(app)
      .post("/utilizacoes")
      .send({
        motoristaId,
        automovelId,
        inicio,
        motivo: "Reunião"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.motorista.id).toBe(motoristaId);
    expect(res.body.automovel.id).toBe(automovelId);

    utilizacaoId = res.body.id; // salvar id para os testes seguintes
  });

  it("não deve permitir conflito de motorista ou automóvel em uso", async () => {
    const inicio = new Date().toISOString();

    const res1 = await request(app).post("/utilizacoes").send({
      motoristaId,
      automovelId,
      inicio,
      motivo: "Outra reunião"
    });
    expect(res1.status).toBe(400);
    expect(res1.body.message).toBe("Motorista já está utilizando outro automóvel");

    const otherCar = await prisma.automovel.create({ data: { placa: "AAA-123", cor: "Preto", marca: "VW" } });
    const res2 = await request(app).post("/utilizacoes").send({
      motoristaId,
      automovelId: otherCar.id,
      inicio,
      motivo: "Teste"
    });
    expect(res2.status).toBe(400);
    expect(res2.body.message).toBe("Motorista já está utilizando outro automóvel");
  });

  it("deve listar todas as utilizações", async () => {
    const res = await request(app).get("/utilizacoes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("deve obter uma utilização por id", async () => {
    const res = await request(app).get(`/utilizacoes/${utilizacaoId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(utilizacaoId);
  });

  it("deve finalizar a utilização", async () => {
    const fim = new Date().toISOString();

    const res = await request(app).patch(`/utilizacoes/${utilizacaoId}/finalizar`).send({ fim });
    expect(res.status).toBe(200);
    expect(new Date(res.body.fim).toISOString()).toBe(new Date(fim).toISOString());

    const resNova = await request(app).post("/utilizacoes").send({
      motoristaId,
      automovelId,
      inicio: new Date().toISOString(),
      motivo: "Nova utilização"
    });
    expect(resNova.status).toBe(201);
  });
});
