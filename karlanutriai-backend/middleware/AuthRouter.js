import express from 'express';
import {signin, logout} from './AuthController.js';
const router = express.Router();

router.post("/signin", signin);
router.get("/logout", logout);

export default router;