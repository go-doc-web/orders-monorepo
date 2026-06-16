"use client";

import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import TopMenu from "@/components/top-menu/TopMenu";

export default function Home(): React.JSX.Element {
  return (
    <div className="d-flex bg-light min-vh-100">
      {/* Сайдбар Слева*/}
      <Sidebar />
      {/* Top Menu */}
      <div className="w-100 d-flex flex-column main-content-layout">
        <TopMenu />
        {/* Main */}
        <div className="p-4">
          <h2 className="text-secondary">Основная рабочая область</h2>
          <p className="text-muted">Тут будут выводиться приходы и продукты.</p>
        </div>
      </div>
    </div>
  );
}
