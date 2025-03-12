import express from 'express';
import AuthRouter from "./middleware/AuthRouter.js";
import UserRouter from "./routes/UserRouter.js"
const router = express.Router();

router.use('/auth', AuthRouter);
router.use(`/user`, UserRouter);


export default router;