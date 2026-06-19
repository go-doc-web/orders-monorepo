Вот собранный, полностью исправленный и красиво отформатированный файл **`README.md`** на английском языке.

Я убрал все разорванные куски кода, исправил разметку блоков `bash` и `env`, выровнял списки и сделал структуру монолитной. Можешь просто копировать весь текст из блока ниже и перезаписывать свой файл.

````markdown
# Orders & Products Management System

A high-performance full-stack web application designed for real-time warehouse inventory tracking, order management, and active session monitoring. Built with Next.js 16 (App Router), Express, Prisma, PostgreSQL, and Socket.io.

The entire system is containerized and ready to deploy via Docker Compose with automated database migrations and mock data seeding.

---

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router, Production Build-optimized)
- **Language**: TypeScript
- **State Management**: Redux Toolkit (RTK)
- **Styling & UI**: Bootstrap 5 / React-Bootstrap
- **Real-Time Integration**: Socket.io-client
- **Localization**: Custom context-based i18n framework (supports UA, EN, RU)
- **Animations**: Native CSS Keyframes with GPU optimization (`will-change: transform`)

### Backend & Database

- **Runtime**: Node.js with Express
- **ORM**: Prisma ORM (PostgreSQL Provider)
- **Database**: PostgreSQL (Containerized with persistent volumes)
- **Real-Time Engine**: Socket.io (Event-driven tab connection tracker)

---

## 🏗️ Core System Features

1. **Orders Page (`/orders`)**:
   - Interactive lists rendering total order amounts dynamically calculated in both **USD** and **UAH**.
   - Derived-state **Detail View** panel smoothly expanding on click, showing related products.
   - Secure cascading removal of orders and isolated product deletion via individual confirmation modals.
2. **Products Page (`/products`)**:
   - Flat tabular layout rendering serial numbers, production specs, warranty timelines, and master order titles.
   - Dynamic product-type filtration driven by reactive state.
3. **TopMenu & Real-Time Sync**:
   - Fixed top navigation bar keeping essential tools accessible during scrolling.
   - `LiveClock`: Multi-language real-time clock updating every second.
   - `ActiveSessions`: WebSocket-driven tab counter that safely broadcasts and animates updates when users open or close multiple tabs/browsers simultaneously.
4. **Security & Routing**:
   - Immediate server-side redirect from root `/` to `/orders` eliminating empty placeholder screens.
   - Strict `Disabled States` on incomplete features (Groups, Users, Settings) using UX-friendly native block cursors and explicit labels to prevent dead-end routing errors.

---

## 📦 Architecture & Repository Layout

The project is structured as a **monorepository** ensuring clean isolation between client logic and database models:

```text
orders-monorepo/
├── backend/            # Express, Node.js, Prisma REST & WS Controllers
│   ├── prisma/         # Database structural schemas and seed engines
│   └── src/            # Isolated routes, sockets, and server config
├── frontend/           # Next.js 16 Application (TypeScript + RTK)
│   └── src/app/        # App Router Pages, context layers, and shared components
└── docker-compose.yml  # Main orchestration layer for production deployment
```
````

---

## ⚡ Quick Start Guide (Production Docker Launch)

The absolute easiest way to clone, boot, and evaluate the entire ecosystem (Database, Backend, and Frontend) is utilizing **Docker Compose**.

### 1️⃣ Clone the Repository

Ensure you have the Docker engine running on your machine.

```bash
git clone <your-repository-url>
cd orders-monorepo

```

### 2️⃣ Run the Ecosystem

Execute the following single command in the project root folder. It will download the official base images, build isolated application layers, apply Prisma schema migrations, execute mock data seeders, and start the servers:

```bash
docker-compose up --build

```

### 3️⃣ Access the Application

Once the installation and seeding scripts terminate successfully, open your browser:

- **Frontend Panel**: `http://localhost:3000` _(Auto-redirects to `/orders`)_
- **Backend API Server**: `http://localhost:3001`
- **Database Access**: Available locally on port `5433` _(Configured on port 5433 to completely isolate it from any pre-existing local PostgreSQL systems on standard port 5432)_.

---

## 🛠️ Manual Local Development Setup

If you prefer to execute the application processes manually (e.g., for code debugging without restarting containers), you will still need a running PostgreSQL instance. We will spin up only the database container via Docker, while executing the backend and frontend apps natively.

### 🗄️ Step 0. Database Launch & Initialization

1. From the repository root, start only the PostgreSQL container:

```bash
docker-compose up -d postgres_db

```

2. Navigate to the backend folder and execute the schema synchronization command to automatically initialize the container and create the missing `orders_db` database:

```bash
cd backend
npx prisma db push

```

_Your isolated database is now created and accessible locally on port `5433`._

### 🔌 1. Backend Infrastructure Setup

1. Install the backend vendor dependencies:

```bash
npm install

```

2. Configure your local database access variables inside a `.env` file within the `backend/` directory:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:secret_password_2026@localhost:5433/orders_db?schema=public"

```

3. Insert mock datasets into the newly created database tables:

```bash
npx prisma db seed

```

4. Start the live local backend development process:

```bash
npm run dev

```

### 💻 2. Frontend Interface Setup

1. Open a new terminal instance, navigate to the frontend workspace, and install packages:

```bash
cd ../frontend
npm install

```

2. Establish the active environment pointers targeting your server instance inside `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"

```

3. Boot up the Next.js client engine in development mode:

```bash
npm run dev

```

---

## 📜 Evaluation Deliverables (dZENcode Checklist)

- **DB Schema Blueprint**: Fully declared and accessible under `backend/prisma/schema.prisma`.
- **Project Walkthrough Video**: A short demonstration showing reactive states, cascading deletions, localization switching, and active socket tab synchronization across duplicate screens is linked or attached inside the repository release materials.
- **Git Branching Strategy**: Code updates were developed incrementally using descriptive feature branches to ensure clean version control tracking for review.

```

```
