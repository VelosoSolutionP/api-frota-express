import { Router } from "express";
import { MotoristaController } from "./motorista.controller";
import { validateBody } from "../../middlewares/validateSchema";
import { createMotoristaSchema, updateMotoristaSchema } from "./motorista.schemas";

const router = Router();

router.post("/", validateBody(createMotoristaSchema), MotoristaController.create);
router.get("/", MotoristaController.list);
router.get("/:id", MotoristaController.get);
router.put("/:id", validateBody(updateMotoristaSchema), MotoristaController.update);
router.delete("/:id", MotoristaController.remove);

export default router;