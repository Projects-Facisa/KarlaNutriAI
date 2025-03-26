import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./database.js";
import cookieParser from "cookie-parser";
import routes from "./routes.js";

config();

const app = express();
const portApi = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:8081"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(routes); //utiliza o arquivo de rotas que unifica tudo

connectDB();

app.listen(portApi, () => {
  console.log(`API Server rodando na porta ${portApi}`);
});
