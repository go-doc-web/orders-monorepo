import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Тут будут продукты" });
});

export default router;
