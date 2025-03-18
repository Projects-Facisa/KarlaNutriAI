import express from "express";
import NutritionalDataController from "../controllers/nutritionalDataController.js";
import {tokenValidate} from "../middleware/Auth.js";
const router = new express.Router();

router.post("/",tokenValidate, NutritionalDataController.create);
router.put("/", tokenValidate, NutritionalDataController.update);
router.delete("/", tokenValidate, NutritionalDataController.delete);
router.get("/", tokenValidate, NutritionalDataController.get);
router.get("/:id", tokenValidate, NutritionalDataController.getById)

export default router;