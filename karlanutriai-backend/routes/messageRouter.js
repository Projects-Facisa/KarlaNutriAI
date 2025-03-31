import express from "express";
import MessageController from "../controllers/messageController.js";

const router = new express.Router();

router.post("", MessageController.create);
router.put("", MessageController.edit);
router.delete("", MessageController.delete);

export default router