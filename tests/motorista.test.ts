import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/config/prisma";

describe("Motoristas API", () => {
  let motoristaId: number;

  beforeAll(async () => {
    await prisma.utilizacao.deleteMany();
    await prisma.motorista.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve criar um novo motorista", async () => {
    const novo = { nome: "Carlos Silva" };
    const res = await request(app).post("/motoristas").send(novo);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nome).toBe("Carlos Silva");

    motoristaId = res.body.id;
  });

  it("deve listar todos os motoristas", async () => {
    await prisma.motorista.create({ data: { nome: "Maria Oliveira" } });

    const res = await request(app).get("/motoristas");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it("deve filtrar motoristas por nome", async () => {
    const res = await request(app).get("/motoristas").query({ nome: "maria" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.some((m: any) => /maria/i.test(m.nome))).toBeTruthy();
  });

  it("deve obter um motorista pelo id", async () => {
    const res = await request(app).get(`/motoristas/${motoristaId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(motoristaId);
    expect(res.body.nome).toBe("Carlos Silva");
  });

  it("deve atualizar um motorista", async () => {
    const res = await request(app).put(`/motoristas/${motoristaId}`).send({ nome: "Carlos Atualizado" });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Carlos Atualizado");
  });

  it("deve excluir um motorista", async () => {
    const res = await request(app).delete(`/motoristas/${motoristaId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/removido/i);

    const check = await request(app).get(`/motoristas/${motoristaId}`);
    expect(check.status).toBe(404);
  });
});
