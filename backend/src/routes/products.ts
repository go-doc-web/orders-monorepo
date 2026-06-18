import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();
// Get : получить плоский список всех продуктов

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        order: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json(products);
  } catch (error) {
    console.error("Ошибка API Products:", error);
    res.status(500).json({ error: "Ошибка сервера при получении продуктов" });
  }
});

// Delete product by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    // 1. Защита от NaN (если пришла не строка с числом)
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Некорректный ID продукта" });
    }

    // 2. Сначала проверяем, существует ли запись в базе
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!productExists) {
      return res
        .status(404)
        .json({ error: "Продукт с таким ID не найден в базе данных" });
    }

    // 3. Если существует — удаляем
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    res.json(deletedProduct);
  } catch (error) {
    console.error("Ошибка API Products при удалении:", error);
    res.status(500).json({ error: "Не удалось удалить продукт" });
  }
});

export default router;
