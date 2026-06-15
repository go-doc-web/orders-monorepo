import express, { Application } from "express";
import cors from "cors";

// Routes import
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";

const PORT: number = Number(process.env.PORT) || 3001;

const app: Application = express();
// Midlevare
app.use(cors());
app.use(express.json());

// Регистрируем роуты
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Тестовый сервер успешно запущен на порту ${PORT}`);
  console.log(`🔗 Проверить приходы: http://localhost:${PORT}/api/orders`);
  console.log(`🔗 Проверить продукты: http://localhost:${PORT}/api/products`);
});
