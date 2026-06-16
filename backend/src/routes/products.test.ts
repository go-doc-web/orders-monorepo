import { describe, it, expect } from "vitest";
import supertest from "supertest";
import { app } from "../index.js";

// 1. Группируем тесты для конкретного роутера

describe("Get /api/products", () => {
  it("should return 200 OK and an array of products with nested orders", async () => {
    const response = await supertest(app).get("/api/products");
    // 1.   Проверяем статус
    expect(response.status).toBe(200);
    //   2. Проверяем что сервер вернул массив
    expect(Array.isArray(response.body)).toBe(true);
    // 3. Проверяем, что массив не пустой
    expect(response.body.length).toBeGreaterThan(0);
    // 4. Берем самый первый продукт из массива и дотошно проверяем его свойства
    const firstProduct = response.body[0];

    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("title");
    expect(firstProduct).toHaveProperty("priceUah");
    // Проверяем, что внутри продукта есть объект order, а в нем есть строка title
    expect(firstProduct).toHaveProperty("order");
    expect(firstProduct.order).toHaveProperty("title");
    expect(typeof firstProduct.order.title).toBe("string");
  });
});
