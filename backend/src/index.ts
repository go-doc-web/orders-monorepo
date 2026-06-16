import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// Routes import
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import { initCounterSocket } from "./sockets/counter.js";

const PORT: number = Number(process.env.PORT) || 3001;

export const app: Application = express();
const httpServer = createServer(app);

// Настраиваем инстанс Socket.io («пульт управления сокетами»)
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Разрешаем временное подключение со всех хостов при разработке
    methods: ["GET", "POST", "DELETE"],
  },
});
// Midlevare
app.use(cors());
app.use(express.json());

// Регистрируем роуты
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);

initCounterSocket(io);

if (process.env.NODE_ENV !== "test") {
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Модульный сервер Express + WebSockets запущен на порту ${PORT}`,
    );
    console.log(`🔗 Проверить приходы: http://localhost:${PORT}/api/orders`);
    console.log(`🔗 Проверить продукты: http://localhost:${PORT}/api/products`);
  });
}
