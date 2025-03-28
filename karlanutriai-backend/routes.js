import express from "express";
import AuthRouter from "./middleware/authRouter.js";
import UserRouter from "./routes/userRouter.js"
import NutritionalDataRouter from "./routes/nutritionalDataRouter.js";
import MealRouter from "./routes/mealRouter.js"
import chatRouter from "./routes/chatRouter.js";
import {tokenValidate} from "./middleware/Auth.js";


const router = express.Router();

router.use("/auths", AuthRouter);
router.use("/users", UserRouter);
router.use("/datas", tokenValidate, NutritionalDataRouter);
router.use("/meals", tokenValidate, MealRouter);
router.use("/chats", tokenValidate, chatRouter);


export default router;