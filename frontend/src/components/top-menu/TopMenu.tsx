"use client";
import React from "react";
import { useTranslation } from "@/context/LanguageContext";

import LiveClock from "../live-clock/LiveClock";

export default function TopMenu(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="w-100 bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between ">
      <div>
        <input
          type="text"
          className="form-control form-control-sm bg-light border-0 shadow-sm"
          placeholder={`${t.topMenu.search}`}
        />
      </div>
      <div className="d-flex align-items-center text-secondary small fw-bold">
        <LiveClock />
      </div>
    </div>
  );
}
