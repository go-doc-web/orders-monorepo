import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Начало очистки и перезаполнения базы данных...");

  // 1. Очищаем базу перед заполнением
  await prisma.product.deleteMany({});
  await prisma.order.deleteMany({});

  // 2. Создаем 8 разных Приходов (Orders)
  const order1 = await prisma.order.create({
    data: {
      title: "Поставка мониторов для отдела дизайна (Основной склад)",
      date: new Date("2026-01-10 10:00:00"),
      description: "Профессиональные мониторы со стопроцентным sRGB",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      title: "Закупка ноутбуков для команды бэкенда (Киев Офис)",
      date: new Date("2026-02-15 12:30:00"),
      description: "Мощные рабочие станции на M-чипах и Intel Core i7",
    },
  });

  const order3 = await prisma.order.create({
    data: {
      title: "Срочный довоз периферии и аксессуаров со склада №3",
      date: new Date("2026-03-01 14:15:00"),
      description: "Мышки, клавиатуры и гарнитуры для опенспейса",
    },
  });

  const order4 = await prisma.order.create({
    data: {
      title: "Тестовая группа девайсов (Удаленные сотрудники)",
      date: new Date("2026-03-20 09:00:00"),
      description: "Смартфоны и планшеты для QA-отдела",
    },
  });

  const order5 = await prisma.order.create({
    data: {
      title: "Поставка сетевого оборудования (Серверная)",
      date: new Date("2026-04-05 16:45:00"),
      description: "Коммутаторы, роутеры и ИБП",
    },
  });

  const order6 = await prisma.order.create({
    data: {
      title: "Обновление мебели и эргономики (Одесса Офис)",
      date: new Date("2026-05-12 11:00:00"),
      description: "Кронштейны для мониторов и подставки",
    },
  });

  const order7 = await prisma.order.create({
    data: {
      title: "Крупная партия б/у техники на дефектовку",
      date: new Date("2026-05-28 15:00:00"),
      description:
        "Техника, вернувшаяся от сотрудников, для ремонта или списания",
    },
  });

  const order8 = await prisma.order.create({
    data: {
      title: "Плановое обновление смартфонов (Менеджеры по продажам)",
      date: new Date("2026-06-15 13:20:00"),
      description: "Новые iPhone для работы с клиентами",
    },
  });

  // 3. Добавляем 20 уникальных Продуктов, распределенных по ордерам
  await prisma.product.createMany({
    data: [
      // Order 1 (Мониторы)
      {
        orderId: order1.id,
        serialNumber: "SN-DELL-U2723",
        isNew: 1,
        photo: "monitor_dell.jpg",
        title: 'Dell UltraSharp U2723QE 27" 4K USB-C Hub Monitor',
        type: "monitors",
        specification: "IPS Black, 3840x2160, 100% sRGB, KVM",
        status: "free",
        guaranteeStart: new Date("2026-01-10"),
        guaranteeEnd: new Date("2029-01-10"),
        priceUsd: 650.0,
        priceUah: 26000.0,
      },
      {
        orderId: order1.id,
        serialNumber: "SN-ASUS-PA27",
        isNew: 1,
        photo: "monitor_asus.jpg",
        title: 'Asus ProArt PA278QV Professional Monitor 27"',
        type: "monitors",
        specification: "IPS, 2560x1440, 100% sRGB, Rec. 709",
        status: "free",
        guaranteeStart: new Date("2026-01-10"),
        guaranteeEnd: new Date("2029-01-10"),
        priceUsd: 350.0,
        priceUah: 14000.0,
      },
      {
        orderId: order1.id,
        serialNumber: "SN-GIGA-X58",
        isNew: 0,
        photo: "monitor_gigabyte.jpg",
        title: "Gigabyte M27Q Gaming Monitor 27 KVM",
        type: "monitors",
        specification: "SS IPS, 170Hz, 0.5ms, 2560x1440",
        status: "repair",
        guaranteeStart: new Date("2024-02-10"),
        guaranteeEnd: new Date("2026-02-10"),
        priceUsd: 300.0,
        priceUah: 12000.0,
      },

      // Order 2 (Ноутбуки)
      {
        orderId: order2.id,
        serialNumber: "SN-MAC-M1-16",
        isNew: 1,
        photo: "macbook_air.jpg",
        title: 'Apple MacBook Air 13" M1 / 16GB / 512GB Space Gray',
        type: "laptops",
        specification: "Apple M1, RAM 16 GB, SSD 512 GB",
        status: "free",
        guaranteeStart: new Date("2026-02-15"),
        guaranteeEnd: new Date("2027-02-15"),
        priceUsd: 1100.0,
        priceUah: 44000.0,
      },
      {
        orderId: order2.id,
        serialNumber: "SN-MAC-M3-PRO",
        isNew: 1,
        photo: "macbook_pro.jpg",
        title: 'Apple MacBook Pro 14" M3 Pro / 18GB / 1TB Silver',
        type: "laptops",
        specification: "M3 Pro 11-core CPU, 14-core GPU, 18GB, 1TB",
        status: "free",
        guaranteeStart: new Date("2026-02-15"),
        guaranteeEnd: new Date("2028-02-15"),
        priceUsd: 2200.0,
        priceUah: 88000.0,
      },

      // Order 3 (Периферия)
      {
        orderId: order3.id,
        serialNumber: "SN-LOGI-MX3",
        isNew: 1,
        photo: "mouse_mx_master.jpg",
        title: "Logitech MX Master 3S Wireless Ergonomic Mouse",
        type: "accessories",
        specification: "8K DPI, Quiet Clicks, Bluetooth/Logi Bolt",
        status: "free",
        guaranteeStart: new Date("2026-03-01"),
        guaranteeEnd: new Date("2028-03-01"),
        priceUsd: 100.0,
        priceUah: 4000.0,
      },
      {
        orderId: order3.id,
        serialNumber: "SN-KEY-CHRON",
        isNew: 1,
        photo: "keyboard_keychron.jpg",
        title: "Keychron K2 V2 Hot-swappable Mechanical Keyboard",
        type: "accessories",
        specification: "Gateron G Pro Brown, RGB, Bluetooth",
        status: "free",
        guaranteeStart: new Date("2026-03-01"),
        guaranteeEnd: new Date("2027-03-01"),
        priceUsd: 120.0,
        priceUah: 4800.0,
      },
      {
        orderId: order3.id,
        serialNumber: "SN-SONY-WH720",
        isNew: 1,
        photo: "headphones_sony.jpg",
        title: "Sony WH-CH720N Wireless Noise Canceling Headphones",
        type: "accessories",
        specification: "Over-Ear, ANC, up to 35 hours battery",
        status: "free",
        guaranteeStart: new Date("2026-03-01"),
        guaranteeEnd: new Date("2027-03-01"),
        priceUsd: 150.0,
        priceUah: 6000.0,
      },

      // Order 4 (Тестовая группа / Смартфоны)
      {
        orderId: order4.id,
        serialNumber: "SN-GOOG-PIX8",
        isNew: 1,
        photo: "phone_pixel8.jpg",
        title: "Google Pixel 8 Pro 128GB Obsidian",
        type: "phones",
        specification: "Tensor G3, 12GB RAM, 50MP Camera",
        status: "free",
        guaranteeStart: new Date("2026-03-20"),
        guaranteeEnd: new Date("2027-03-20"),
        priceUsd: 800.0,
        priceUah: 32000.0,
      },
      {
        orderId: order4.id,
        serialNumber: "SN-SAMS-S24",
        isNew: 1,
        photo: "phone_s24.jpg",
        title: "Samsung Galaxy S24 Ultra 512GB Titanium Gray",
        type: "phones",
        specification: "Dynamic AMOLED 2X, Snapdragon 8 Gen 3, S-Pen",
        status: "free",
        guaranteeStart: new Date("2026-03-20"),
        guaranteeEnd: new Date("2028-03-20"),
        priceUsd: 1300.0,
        priceUah: 52000.0,
      },

      // Order 5 (Сетевое оборудование)
      {
        orderId: order5.id,
        serialNumber: "SN-MIKRO-4011",
        isNew: 1,
        photo: "router_mikrotik.jpg",
        title: "MikroTik RB4011 iGS+5HacQ2HnD-IN Router",
        type: "network",
        specification: "Quad-core 1.4GHz, 1GB RAM, 10xGigabit LAN, SFP+",
        status: "free",
        guaranteeStart: new Date("2026-04-05"),
        guaranteeEnd: new Date("2028-04-05"),
        priceUsd: 250.0,
        priceUah: 10000.0,
      },
      {
        orderId: order5.id,
        serialNumber: "SN-UPS-MARSRIVA",
        isNew: 1,
        photo: "ups_marsriva.jpg",
        title: "MARSRIVA Smart Mini UPS for Router 10000mAh",
        type: "network",
        specification: "DC 5V/9V/12V, POE support, Lithium Batteries",
        status: "free",
        guaranteeStart: new Date("2026-04-05"),
        guaranteeEnd: new Date("2027-04-05"),
        priceUsd: 40.0,
        priceUah: 1600.0,
      },

      // Order 6 (Офис меблировка)
      {
        orderId: order6.id,
        serialNumber: "SN-ARM-ONKRON",
        isNew: 1,
        photo: "arm_onkron.jpg",
        title: "Onkron G80 Desktop Monitor Mount Heavy Duty",
        type: "furniture",
        specification: "Gas Spring, For 13-32 inch screens, VESA 75/100",
        status: "free",
        guaranteeStart: new Date("2026-05-12"),
        guaranteeEnd: new Date("2031-05-12"),
        priceUsd: 50.0,
        priceUah: 2000.0,
      },

      // Order 7 (Б/У группа и ремонты)
      {
        orderId: order7.id,
        serialNumber: "SN-THINK-X1",
        isNew: 0,
        photo: "thinkpad_x1.jpg",
        title: "Lenovo ThinkPad X1 Carbon Gen 10 Carbon Fiber",
        type: "laptops",
        specification: "Intel Core i7, 32GB RAM, 1TB SSD",
        status: "repair",
        guaranteeStart: new Date("2024-01-15"),
        guaranteeEnd: new Date("2026-01-15"),
        priceUsd: 1500.0,
        priceUah: 60000.0,
      },
      {
        orderId: order7.id,
        serialNumber: "SN-IPH11-OLD",
        isNew: 0,
        photo: "iphone11.jpg",
        title: "Apple iPhone 11 64GB Black (Battery replacement)",
        type: "phones",
        specification: "Liquid Retina HD, A13 Bionic, Battery 74%",
        status: "repair",
        guaranteeStart: new Date("2021-09-10"),
        guaranteeEnd: new Date("2022-09-10"),
        priceUsd: 250.0,
        priceUah: 10000.0,
      },
      {
        orderId: order7.id,
        serialNumber: "SN-LOGI-GPRO-BUG",
        isNew: 0,
        photo: "mouse_gpro.jpg",
        title: "Logitech G Pro X Superlight (Double Click Issue)",
        type: "accessories",
        specification: "HERO 25K Sensor, 63g Wireless Gaming Mouse",
        status: "repair",
        guaranteeStart: new Date("2025-01-10"),
        guaranteeEnd: new Date("2026-01-10"),
        priceUsd: 90.0,
        priceUah: 3600.0,
      },

      // Order 8 (Новые айфоны менеджерам)
      {
        orderId: order8.id,
        serialNumber: "SN-IPHONE-15-1",
        isNew: 1,
        photo: "iphone15.jpg",
        title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
        type: "phones",
        specification: "A17 Pro chip, 256GB, Titanium Design",
        status: "free",
        guaranteeStart: new Date("2026-06-15"),
        guaranteeEnd: new Date("2027-06-15"),
        priceUsd: 1200.0,
        priceUah: 48000.0,
      },
      {
        orderId: order8.id,
        serialNumber: "SN-IPHONE-15-2",
        isNew: 1,
        photo: "iphone15.jpg",
        title: "Apple iPhone 15 Pro Max 256GB Blue Titanium",
        type: "phones",
        specification: "A17 Pro chip, 256GB, Titanium Design",
        status: "free",
        guaranteeStart: new Date("2026-06-15"),
        guaranteeEnd: new Date("2027-06-15"),
        priceUsd: 1200.0,
        priceUah: 48000.0,
      },
      {
        orderId: order8.id,
        serialNumber: "SN-IPHONE-15-3",
        isNew: 1,
        photo: "iphone15.jpg",
        title: "Apple iPhone 15 Pro Max 256GB Black Titanium",
        type: "phones",
        specification: "A17 Pro chip, 256GB, Titanium Design",
        status: "free",
        guaranteeStart: new Date("2026-06-15"),
        guaranteeEnd: new Date("2027-06-15"),
        priceUsd: 1200.0,
        priceUah: 48000.0,
      },
      {
        orderId: order8.id,
        serialNumber: "SN-IPHONE-15-4",
        isNew: 1,
        photo: "iphone15.jpg",
        title: "Apple iPhone 15 Pro Max 256GB White Titanium",
        type: "phones",
        specification: "A17 Pro chip, 256GB, Titanium Design",
        status: "free",
        guaranteeStart: new Date("2026-06-15"),
        guaranteeEnd: new Date("2027-06-15"),
        priceUsd: 1200.0,
        priceUah: 48000.0,
      },
    ],
  });

  console.log("База данных успешно наполнена новыми тестовыми данными!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
