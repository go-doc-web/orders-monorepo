"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BroadcastPin } from "react-bootstrap-icons";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:3001";

export default function ActiveSessions(): React.JSX.Element {
  const [activeSessions, setActiveSessions] = useState<number>(1);
  const [isBumping, setIsBumping] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("active_sessions_update", (count: number) => {
      setActiveSessions(count);
      setIsBumping(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!isBumping) return;
    const timer = setTimeout(() => setIsBumping(false), 300);
    return () => clearTimeout(timer);
  }, [isBumping]);

  return (
    <div className="d-flex align-items-center gap-1 opacity-75">
      <BroadcastPin className="text-success animate-pulse-live" size={14} />
      <span
        className={`text-success fw-bold font-monospace fs-6 ${isBumping ? "animate-counter-bump" : ""}`}
        style={{ fontSize: "13px", lineHeight: 1, willChange: "transform" }}
      >
        {activeSessions}
      </span>
    </div>
  );
}
