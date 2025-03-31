import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes";
import dotenv from "dotenv";

import http from "http";
import useWebSocket from "./ws/wsConfig";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Разрешить CORS для всех доменов
app.use(
  cors({
    origin: "*", // Разрешить все домены
    methods: ["GET", "POST", "PUT", "DELETE"], // Разрешенные HTTP-методы
    allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
  })
);

app.use(express.json());
app.use("/api", aiRoutes);

const server = http.createServer(app);
useWebSocket(server);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
