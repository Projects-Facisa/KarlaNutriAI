import express from "express";
import chatController from "../controllers/chatController.js";

const router = new express.Router();

router.post("", chatController.create);
router.put("/:id", chatController.update);
router.delete("/:id", chatController.delete);
router.get("/:id", chatController.getById);
router.get("", chatController.getAllChats);

export default router;