"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Clock } from "react-bootstrap-icons";
import ActiveSessions from "../active-session/ActiveSessions";

export default function LiveClock(): React.JSX.Element {
  const [time, setTime] = useState<Date | null>(null);
  const { locale } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(new Date());

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return (
      <div
        className="spinner-border spinner-border-sm text-muted"
        role="status"
      ></div>
    );
  }
  const rawDate: string = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(time);

  const formattedDate: string = rawDate.replace(/\s*[гр]\.?$/i, "");

  const formattedTime: string = time.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="d-flex flex-column align-items-end text-secondary small fw-bold">
      <span className="text-capitalize">{formattedDate}</span>

      <div className="d-flex align-items-center gap-2 mt-1">
        <ActiveSessions />
        <Clock className="text-dark" size={12} />
        <span className="text-dark font-monospace fw-semibold">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
