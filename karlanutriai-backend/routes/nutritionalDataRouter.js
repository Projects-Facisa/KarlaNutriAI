import express from "express";
import NutritionalDataController from "../controllers/nutritionalDataController.js";

const router = new express.Router();

router.post("", NutritionalDataController.create);
router.put("", NutritionalDataController.update);
router.delete("", NutritionalDataController.delete);
router.get("", NutritionalDataController.get);
router.get("/phrase", NutritionalDataController.getDataPhrase);

export default router;