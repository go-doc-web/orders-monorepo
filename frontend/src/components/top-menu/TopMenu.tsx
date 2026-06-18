"use client";

import { useTranslation } from "@/context/LanguageContext";
import LiveClock from "../live-clock/LiveClock";

export default function TopMenu(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="w-100 bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
      <div style={{ maxWidth: "260px" }} className="w-100">
        <input
          type="text"
          className="form-control form-control-sm bg-light border-0 shadow-sm px-3 py-1.5"
          placeholder={`${t.topMenu?.search || "Search"}`}
        />
      </div>
      <LiveClock />
    </div>
  );
}
