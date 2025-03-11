import express from "express";
import cors from "cors";
import {config} from "dotenv";
import connectDB from "./Database.ts";
import cookieParser from "cookie-parser";

config();

const app = express();
const portApi: number = Number(process.env.PORT) || 5000; // Definindo o tipo como number

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
