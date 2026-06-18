import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();

// Get - Получить все прриходы с их продуктами

router.get("/", async (req: Request, res: Response) => {
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

router.delete("/:id", async (req: Request, res: Response) => {
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
// DELETE /api/orders/:orderId/products/:productId
router.delete(
  "/:orderId/products/:productId",
  async (req: Request, res: Response) => {
    try {
      const { orderId, productId } = req.params;

      const deleteResult = await prisma.product.deleteMany({
        where: {
          id: Number(productId),
          orderId: Number(orderId),
        },
      });

      if (deleteResult.count === 0) {
        return res
          .status(404)
          .json({ error: "Продукт не найден в данном ордере" });
      }

      res.json({ success: true, productId: Number(productId) });
    } catch (error) {
      console.error("Ошибка при удалении продукта из ордера:", error);
      res.status(500).json({ error: "Не удалось удалить продукт из прихода" });
    }
  },
);

export default router;
