"use client";

import { useTranslation } from "@/context/LanguageContext";
import LiveClock from "../live-clock/LiveClock";

export default function TopMenu(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between position-fixed top-0 start-0"
      style={{
        zIndex: 1020,
        width: "calc(100% - 260px)",
        marginLeft: "260px",
        height: "80px",
      }}
    >
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
