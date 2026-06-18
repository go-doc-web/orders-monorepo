"use client";

import { useEffect } from "react";

/**
 * Хук для отслеживания нажатия клавиши Escape.
 * @param callback Функция, которая выполнится при нажатии Esc
 */
export function useEscape(callback: () => void): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}
