"use client";

import Sidebar from "../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Наш новый Сайдбар */}
      <Sidebar />

      {/* Справа будет основной контент, пока оставим заглушку */}
      <div style={{ marginLeft: "260px", width: "100%" }} className="p-4">
        <h2 className="text-secondary">Основная рабочая область</h2>
        <p className="text-muted">Тут будут выводиться приходы и продукты.</p>
      </div>
    </div>
  );
}
