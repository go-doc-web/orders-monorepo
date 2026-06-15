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

export default router;
