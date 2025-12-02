import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import automovelRoutes from "./modules/automoveis/automovel.routes";
import motoristaRoutes from "./modules/motoristas/motorista.routes";
import utilizacaoRoutes from "./modules/utilizacoes/utilizacao.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/automoveis", automovelRoutes);
app.use("/motoristas", motoristaRoutes);
app.use("/utilizacoes", utilizacaoRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);
