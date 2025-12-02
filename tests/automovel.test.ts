import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/config/prisma";

describe("Automoveis API", () => {
  let automovelId: number;

  beforeAll(async () => {
    await prisma.utilizacao.deleteMany();
    await prisma.automovel.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve criar um novo automóvel", async () => {
    const novo = { placa: "ABC-1", cor: "Preto", marca: "Ford" };
    const res = await request(app).post("/automoveis").send(novo);

    expect(res.status).toBe(201);
    expect(res.body.placa).toBe("ABC-1");
    expect(res.body.cor).toBe("Preto");
    expect(res.body.marca).toBe("Ford");

    automovelId = res.body.id;
  });

  it("deve listar todos os automóveis", async () => {
    const res = await request(app).get("/automoveis");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("deve filtrar automóvel por cor", async () => {
    const res = await request(app).get("/automoveis?cor=Preto");

    expect(res.status).toBe(200);
    expect(res.body.every((a: any) => a.cor.toLowerCase() === "preto")).toBe(true);
  });

  it("deve filtrar automóvel por marca", async () => {
    const res = await request(app).get("/automoveis?marca=Ford");

    expect(res.status).toBe(200);
    expect(res.body.every((a: any) => a.marca.toLowerCase() === "ford")).toBe(true);
  });

  it("deve filtrar automóvel por cor e marca", async () => {
    const res = await request(app).get("/automoveis?cor=Preto&marca=Ford");

    expect(res.status).toBe(200);
    expect(res.body.every((a: any) => a.cor.toLowerCase() === "preto" && a.marca.toLowerCase() === "ford")).toBe(true);
  });

  it("deve atualizar um automóvel", async () => {
    const res = await request(app).put(`/automoveis/${automovelId}`).send({ cor: "Branco" });

    expect(res.status).toBe(200);
    expect(res.body.cor).toBe("Branco");
  });

  it("deve obter um automóvel pelo id", async () => {
    const res = await request(app).get(`/automoveis/${automovelId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(automovelId);
  });

  it("deve excluir um automóvel", async () => {
    const res = await request(app).delete(`/automoveis/${automovelId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/removido/i);

    const check = await request(app).get(`/automoveis/${automovelId}`);
    expect(check.status).toBe(404);
  });
});
