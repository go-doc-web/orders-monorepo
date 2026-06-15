import { Router } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();

// Get - Получить все прриходы с их продуктами

router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Ошибка API Orders при получении:", error);
    res.status(500).json({ error: "Ошибка сервера при получении приходов" });
  }
});

// Delete - удалить приход по ID

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedOrder);
  } catch (error) {
    console.error("Ошибка API Orders при удалении:", error);
    res.status(500).json({ error: "Не удалось удалить приход" });
  }
});

export default router;
