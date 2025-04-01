import express from "express";
import MessageController from "../controllers/messageController.js";

const router = new express.Router();

router.post("/:chatId", MessageController.create);
router.get("/", MessageController.get);

export default router