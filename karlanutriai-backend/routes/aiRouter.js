import express from "express";
import aiController from "../controllers/aiController.js";

const router = new express.Router();

router.post("/", aiController.promptWithGemini);

export default router;
