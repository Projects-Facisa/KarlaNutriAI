import express from "express";
const router = new express.Router();
import UserController from "../controllers/userController.js";
import {tokenValidate} from "../middleware/Auth.js";

router.post(`/`, UserController.create);
router.put(`/`, tokenValidate, UserController.update);

export default router;