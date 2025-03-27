import express from "express";
import AuthRouter from "./middleware/authRouter.js";
import UserRouter from "./routes/userRouter.js"
import NutritionalDataRouter from "./routes/nutritionalDataRouter.js";
import MealRouter from "./routes/mealRouter.js"
import {tokenValidate} from "./middleware/Auth.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/data", tokenValidate, NutritionalDataRouter);
router.use("/meal", tokenValidate, MealRouter);


export default router;