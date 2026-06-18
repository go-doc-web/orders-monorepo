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
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    console.error("Ошибка API Products при удалении:", error);
    res.status(500).json({ error: "Не удалось удалить продукт" });
  }
});

export default router;
