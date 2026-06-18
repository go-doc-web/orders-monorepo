"use client";

import React from "react";
import { Trash3 } from "react-bootstrap-icons";

interface DeleteButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteButton({
  onClick,
}: DeleteButtonProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      className="btn btn-link text-muted p-0 border-0 d-inline-flex align-items-center justify-content-center action-delete-btn"
      style={{ cursor: "pointer", transition: "color 0.2s" }}
      type="button"
    >
      <Trash3 className="text-secondary hover-danger" size={15} />
    </button>
  );
}
