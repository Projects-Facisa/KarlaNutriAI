import express from 'express';
import {signin, logout, displayHome} from './AuthController.js';
import {tokenValidate} from "./Auth.js";
const router = express.Router();

router.post("/signin", signin);
router.get("/logout", logout);
router.get("/displayHome", tokenValidate, displayHome)

export default router;