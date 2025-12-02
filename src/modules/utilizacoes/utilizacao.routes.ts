import { Router } from "express";
import { UtilizacaoController } from "./utilizacao.controller";

const router = Router();

router.post("/", UtilizacaoController.create);
router.get("/", UtilizacaoController.list);
router.get("/:id", UtilizacaoController.get);
router.patch("/:id/finalizar", UtilizacaoController.finalizar);

export default router;
