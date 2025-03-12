import express from "express";
const router = new express.Router();
import UserController from "../controllers/UserController.js";

router.post(`/`, UserController.create);

export default router;