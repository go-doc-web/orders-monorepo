"use client";

import React from "react";
import { Trash3 } from "react-bootstrap-icons";
import { useEscape } from "@/hooks/useEscape";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
}: DeleteModalProps): React.JSX.Element | null {
  useEscape(() => {
    if (isOpen) {
      onClose();
    }
  });

  // Если модалка закрыта — не рендерим HTML в DOM
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3"
      style={{
        zIndex: 1050,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Window container */}
      <div
        className="bg-white rounded shadow-lg border position-relative p-4 w-100"
        style={{ maxWidth: "500px" }}
      >
        {/* Btn */}
        <button
          onClick={onClose}
          className="btn btn-link text-muted position-absolute p-0"
          style={{
            top: "15px",
            right: "15px",
            fontSize: "24px",
            textDecoration: "none",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Title Modal */}
        <h5 className="fw-bold text-dark mb-4 pe-4">{title}</h5>

        <hr className="my-3 opacity-10" />

        {/* Info Modal */}
        <div className="d-flex align-items-center gap-3 py-2 mb-4">
          <div className="text-danger">
            <Trash3 size={22} />
          </div>
          <span className="text-dark fw-semibold" style={{ fontSize: "14px" }}>
            {itemName}
          </span>
        </div>

        {/* Button action  */}
        <div className="d-flex justify-content-end gap-2">
          <button
            onClick={onClose}
            className="btn btn-light text-uppercase fw-bold small px-4 py-2"
            style={{ fontSize: "12px", letterSpacing: "0.5px" }}
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger text-uppercase fw-bold small px-4 py-2 shadow-sm"
            style={{ fontSize: "12px", letterSpacing: "0.5px" }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
