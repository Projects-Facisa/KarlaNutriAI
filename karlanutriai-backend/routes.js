import express from "express";
import AuthRouter from "./middleware/authRouter.js";
import UserRouter from "./routes/userRouter.js";
import NutritionalDataRouter from "./routes/nutritionalDataRouter.js";
import MealRouter from "./routes/mealRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import mailerRouter from "./routes/mailRouter.js";
import aiRouter from "./routes/aiRouter.js";
import {tokenValidate} from "./middleware/Auth.js";


const router = express.Router();

router.use("/auths", AuthRouter);
router.use("/users", UserRouter);
router.use("/datas", tokenValidate, NutritionalDataRouter);
router.use("/meals", tokenValidate, MealRouter);
router.use("/chats", tokenValidate, chatRouter);
router.use("/messages", tokenValidate, messageRouter);
router.use("/mails",tokenValidate, mailerRouter);
router.use("/ai", tokenValidate, aiRouter)



export default router;
