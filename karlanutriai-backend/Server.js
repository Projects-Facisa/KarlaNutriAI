import express from "express";
import cors from "cors";
import {config} from "dotenv";
import connectDB from "./Database.js";
import cookieParser from "cookie-parser";

config();

const app = express();
const portApi= process.env.PORT || 5000;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

connectDB();

app.listen(portApi, () => {
    console.log(`API Server rodando na porta ${portApi}`);
});
