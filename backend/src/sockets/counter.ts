import { Server } from "socket.io";

let activeSessionsCount = 0;

export function initCounterSocket(io: Server) {
  io.on("connection", (socket) => {
    // Как только чей то браузер установил связь с сервером , увеличиваем счетчик
    activeSessionsCount++;

    io.emit("active_sessions_update", activeSessionsCount);

    console.log(
      `[WebSocket] Вкладка открыта. Активных сессий ${activeSessionsCount}`,
    );

    socket.on("disconnect", () => {
      // Math.max(0, ...) — это страховка, чтобы счетчик магически не ушел в минус. И уменьшаем счетчик
      activeSessionsCount = Math.max(0, activeSessionsCount - 1);
      io.emit("active_sessions_update", activeSessionsCount);
      console.log(
        `[WebSocket] Вкладка закрыта. Активных сессий: ${activeSessionsCount}`,
      );
    });
  });
}
