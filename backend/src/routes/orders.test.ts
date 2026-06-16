import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "../index.js";

// Get api/orders

describe("Get /api/orders", () => {
  it("should return 200 ok and return array", async () => {
    const response = await supertest(app).get("/api/orders");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const firstOrder = response.body[0];

    expect(firstOrder).toHaveProperty("id");
    expect(firstOrder).toHaveProperty("title");
    expect(firstOrder).toHaveProperty("date");

    expect(firstOrder).toHaveProperty("products");
  });
});

describe("Delete /api/orders/:id", () => {
  it("should return delete order by id and return deleted object  ", async () => {
    const response = await supertest(app).delete("/api/orders/16");
    // Проверяю статус
    expect(response.status).toBe(200);
    // Проверяю что сервер вернул удаленный обьект
    expect(response.body.id).toBe(16);
  });
});
