# orders-monorepo

# Orders & Products Management System (Monorepo)

A modern full-stack web application for tracking warehouse inventory, managing order sheets, and monitoring real-time active user sessions.

---

## 📊 Current Project Status (Milestone 1: Backend Completed)

We have successfully designed and built a robust, production-ready backend infrastructure. The API is active, secure, and ready for frontend integration.

### What has been done on the Backend:

- **Database Layer**: Implemented isolated PostgreSQL inside Docker with persistent data volumes.
- **Data Modeling & Seed**: Designed complete database schemas via Prisma ORM and filled tables with realistic multi-category testing data.
- **Architecture**: Enforced clean Separation of Concerns (SoC) by decoupling database config, modular Express controllers/routes, and WebSockets.
- **Real-Time Engine**: Built an event-driven session tracking module via Socket.io to broadcast live tab activity across all users.
- **REST APIs**: Designed and verified highly optimized queries with target selective queries (`select`/`include`) to reduce network overhead.

---

## 🏗️ Repository Structure

````text
orders-monorepo/
├── backend/            # Express, Node.js, Prisma, Socket.io (Backend Service)
│   ├── src/config/     # Prisma Client initialization
│   ├── src/routes/     # Isolated REST controllers (Orders, Products)
│   ├── src/sockets/    # Live session count engine
│   └── README.md       # Internal backend documentation
├── frontend/           # Next.js, React (Frontend Web Application)
└── README.md           # Main Monorepo Guide (This file)

Ты абсолютно прав — в твоём исходном тексте после блока **🚀 Quick Start Guide** оформление сбилось и пошло обычным текстом, а не Markdown. Я поправил структуру, чтобы весь раздел был в чистом Markdown и выглядел единообразно. Вот исправленный кусок:

```markdown
## 🚀 Quick Start Guide (All-in-One Execution)

Follow these steps to spin up the database, seed test data, and boot the backend server.

### 1️⃣ Launch the Database (Docker)

```bash
cd backend
docker compose -f docker-compose.db.yml up -d
````

### 2️⃣ Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:secret_password_2026@localhost:5433/orders_db?schema=public"
```

### 3️⃣ Setup Database Schemas & Seed Data

```bash
npm install
npx prisma generate
npx prisma db seed
```

### 4️⃣ Boot the Application

```bash
npm run dev
```
