import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./database.js";
import cookieParser from "cookie-parser";
import routes from "./routes.js";
import http from "http";
import { WebSocketServer } from "ws";

config();

const app = express();
const portApi = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on("connection", (client) => {
  clients.add(client);
  console.log("Cliente conectado");

  client.on("message", (message) => {
    const data = JSON.parse(message);

    const msg = {
      text: data.text,
      sentBy: data.sentBy,
    };

    const msgString = JSON.stringify(msg);

    for (const c of clients) {
      if (c.readyState === c.OPEN) {
        c.send(msgString);
      }
    }
  });

  client.on("close", () => {
    clients.delete(client);
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

app.use(routes); //utiliza o arquivo de rotas que unifica tudo

connectDB();

server.listen(portApi, () => {
  console.log(`API + WebSocket rodando na porta ${portApi}`);
});
