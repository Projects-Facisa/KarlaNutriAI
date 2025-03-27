import express from 'express';
import AuthController from './authController.js';
import {tokenValidate} from "./Auth.js";
const router = express.Router();

router.post("/signin", AuthController.signin);
router.get("/displayHome", tokenValidate, AuthController.displayHome)

export default router;