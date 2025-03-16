import express from 'express';
import AuthRouter from "./middleware/authRouter.js";
import UserRouter from "./routes/userRouter.js"
import NutritionalDataRouter from "./routes/nutritionalDataRouter.js";
import MealRouter from "./routes/mealRouter.js"
const router = express.Router();

router.use('/auth', AuthRouter);
router.use(`/user`, UserRouter);
router.use(`/data`, NutritionalDataRouter);
router.use('/meal', MealRouter);


export default router;