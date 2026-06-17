import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Начало очистки и перезаполнения базы данных...");

  // 1. Очищаем базу перед заполнением, чтобы не было дубликатов
  await prisma.product.deleteMany({});
  await prisma.order.deleteMany({});

  // 2. Создаем 3 разных Прихода (Orders) для разнообразия
  const order1 = await prisma.order.create({
    data: {
      title: "Длинное предлинное длиннющее название прихода №1",
      date: new Date("2017-04-06 17:20:00"),
      description: "Поставка мониторов для отдела дизайна",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      title: "Приход новой электроники (Офис Манагеры)",
      date: new Date("2017-06-09 12:00:00"),
      description: "Ноутбуки и телефоны для сотрудников",
    },
  });

  const order3 = await prisma.order.create({
    data: {
      title: "Срочный довоз техники со склада №3",
      date: new Date("2017-09-12 14:30:00"),
      description: "Дополнительная закупка оборудования",
    },
  });

  // 3. Добавляем 5 уникальных Продуктов по 3 категориям
  await prisma.product.createMany({
    data: [
      // Категория 1: Monitors
      {
        orderId: order1.id,
        serialNumber: "SN-12.3456789",
        isNew: 1, // Новый
        photo: "monitor_dell.jpg",
        title: "Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3",
        type: "monitors",
        specification: "Specification 1",
        guaranteeStart: new Date("2017-04-06 17:20:00"),
        guaranteeEnd: new Date("2025-08-06 17:20:00"),
        priceUsd: 2500.0,
        priceUah: 250000.5,
      },
      {
        orderId: order1.id,
        serialNumber: "SN-98.7654321",
        isNew: 0, // Б/У
        photo: "monitor_asus.jpg",
        title: 'Asus ProArt PA278QV Professional Monitor 27"',
        type: "monitors",
        specification: "IPS, 2560x1440, 100% sRGB",
        guaranteeStart: new Date("2017-05-10 10:00:00"),
        guaranteeEnd: new Date("2020-05-10 10:00:00"),
        priceUsd: 350.0,
        priceUah: 14000.0,
      },

      // Категория 2: Laptops
      {
        orderId: order2.id,
        serialNumber: "SN-MAC-M1-2026",
        isNew: 1,
        photo: "macbook_air.jpg",
        title: 'Apple MacBook Air 13" M1 / 16GB / 512GB Space Gray',
        type: "laptops",
        specification: "Apple M1, RAM 16 GB, SSD 512 GB",
        guaranteeStart: new Date("2017-06-09 12:00:00"),
        guaranteeEnd: new Date("2026-06-09 12:00:00"),
        priceUsd: 1100.0,
        priceUah: 44000.0,
      },
      {
        orderId: order3.id,
        serialNumber: "SN-THINK-X1",
        isNew: 0,
        photo: "thinkpad_x1.jpg",
        title: "Lenovo ThinkPad X1 Carbon Gen 10 Carbon Fiber",
        type: "laptops",
        specification: "Intel Core i7, 32GB RAM, 1TB SSD",
        guaranteeStart: new Date("2017-01-15 09:15:00"),
        guaranteeEnd: new Date("2024-01-15 09:15:00"),
        priceUsd: 1500.0,
        priceUah: 60000.0,
      },

      // Категория 3: Phones
      {
        orderId: order2.id,
        serialNumber: "SN-IPHONE-15",
        isNew: 1,
        photo: "iphone15.jpg",
        title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
        type: "phones",
        specification: "A17 Pro chip, 256GB, Titanium Design",
        guaranteeStart: new Date("2017-06-09 12:00:00"),
        guaranteeEnd: new Date("2025-06-09 12:00:00"),
        priceUsd: 1200.0,
        priceUah: 48000.0,
      },
    ],
  });

  console.log("База данных успешно заполнена!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
