import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./database.js";
import cookieParser from "cookie-parser";
import routes from "./routes.js";
import http from "http";
import { WebSocketServer } from "ws";
import aiService from "./services/aiService.js";

config();

const app = express();
const portApi = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("message", async (prompt) => {
    try {
      const data = JSON.parse(prompt);
      console.log("Recebi mensagem do usuário:", data);

      const msg = {
        text: data.text,
        sentBy: data.sentBy,
      };

      const result = await aiService.prompt(msg.text);

      const response = {
        text: await result.text(),
        sentBy: "Karla Nutri AI",
      };

      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(response));
      }
    } catch (err) {
      console.error("Erro ao processar mensagem do cliente:", err);
    }
  });

  client.on("close", () => {
    console.log("Cliente desconectado");
  });
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(routes);

connectDB();

server.listen(portApi, () => {
  console.log(`API + WebSocket rodando na porta ${portApi}`);
});
