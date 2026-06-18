"use client";
import React from "react";
import Image from "next/image";
import { PlusCircleFill, Trash3 } from "react-bootstrap-icons";
import { Order } from "@/types";
import { useTranslation } from "@/context/LanguageContext";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}
export default function OrderDetalis({
  order,
  onClose,
}: OrderDetailsProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded shadow-sm border p-4 position-relative">
      {/* Кнопка Закрыть (Крестик) */}
      <button
        className="btn btn-light rounded-circle p-0 position-absolute d-flex align-items-center justify-content-center shadow-sm order-btn-close"
        onClick={onClose}
      >
        ×
      </button>

      {/* Name Order */}
      <h4 className="fw-bold text-dark mb-4 pe-4">{order.title}</h4>

      {/* Btn add Product */}
      <div
        className="d-flex align-items-center gap-2 mb-4"
        style={{ cursor: "pointer" }}
      >
        <PlusCircleFill className="text-success" size={20} />
        <span className="text-success fw-bold small text-uppercase">
          {t.action.addProduct}
        </span>
      </div>

      {/* Products List*/}
      <ul className="d-flex flex-column gap-2 list-unstyled m-0 p-0">
        {order.products && order.products.length > 0 ? (
          order.products.map((product) => {
            return (
              <li
                key={product.id}
                className="d-flex align-items-center justify-content-between p-2 border rounded bg-white gap-3"
                style={{ fontSize: "13px" }}
              >
                {/* New / Old Product */}
                <div
                  className={`rounded-circle flex-shrink-0 ${product.isNew === 1 ? "bg-success" : "bg-secondary"}`}
                  style={{ width: "8px", height: "8px" }}
                ></div>

                {/* Placeholder Img*/}
                <div
                  className="flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "30px",
                    position: "relative",
                  }}
                >
                  <Image
                    src="https://placehold.co/40x30?text=Img"
                    alt={product.title}
                    width={40}
                    height={30}
                    className="w-100 h-100 object-fit-contain rounded"
                    unoptimized
                  />
                </div>

                {/* Title and serial number */}
                <div
                  className="d-flex flex-column flex-grow-1 px-2"
                  style={{ minWidth: "150px" }}
                >
                  <span className="text-dark fw-semibold mb-1">
                    {product.title}
                  </span>
                  <span
                    className="text-muted font-monospace"
                    style={{ fontSize: "11px" }}
                  >
                    SN: {product.serialNumber || "N/A"}
                  </span>
                </div>
                {/* Status Products */}
                <div
                  className="px-3 flex-shrink-0"
                  style={{ minWidth: "100px" }}
                >
                  <span
                    className="text-warning fw-semibold"
                    style={{ fontSize: "13px" }}
                  >
                    Свободен
                  </span>
                </div>
                <div className="ps-2 flex-shrink-0">
                  <button className="btn btn-link text-muted p-0 border-0">
                    <Trash3 className="text-secondary" size={15} />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li className="text-muted small m-0">
            В этом приходе пока нет товаров
          </li>
        )}
      </ul>
    </div>
  );
}
