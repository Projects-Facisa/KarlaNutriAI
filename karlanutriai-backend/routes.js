import express from 'express';
import AuthRouter from "./middleware/authRouter.js";
import UserRouter from "./routes/userRouter.js"
const router = express.Router();

router.use('/auth', AuthRouter);
router.use(`/user`, UserRouter);


export default router;