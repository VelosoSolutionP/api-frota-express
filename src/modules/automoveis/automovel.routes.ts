import { Router } from "express";
import { AutomovelController } from "./automovel.controller";
import { validateBody } from "../../middlewares/validateSchema";
import { createAutomovelSchema, updateAutomovelSchema } from "./automovel.schemas";

const router = Router();

router.post("/", validateBody(createAutomovelSchema), AutomovelController.create);
router.get("/", AutomovelController.list);
router.get("/:id", AutomovelController.get);
router.put("/:id", validateBody(updateAutomovelSchema), AutomovelController.update);
router.delete("/:id", AutomovelController.remove);

export default router;