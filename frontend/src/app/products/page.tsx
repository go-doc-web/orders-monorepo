"use client";
import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { formatShortDate, formatLongDate } from "@/helpers/formatedDate";

const products = [
  {
    id: 1,
    title: "Lenovo ThinkPad T14",
    type: "Laptops",
    guaranteeStart: "2026-04-01T00:00:00.000Z",
    guaranteeEnd: "2028-04-01T00:00:00.000Z",
    priceUsd: 1200,
    priceUah: 48000,
    order: {
      title: "Приход №1 от Главного склада",
    },
  },
  {
    id: 2,
    title: "Dell UltraSharp U2723QE",
    type: "Monitors",
    guaranteeStart: "2026-05-15T00:00:00.000Z",
    guaranteeEnd: "2029-05-15T00:00:00.000Z",
    priceUsd: 600,
    priceUah: 24000,
    order: {
      title: "Поставка серверов (Киев)",
    },
  },
];

export default function ProductsPage(): React.JSX.Element {
  const { t, locale } = useTranslation();
  return (
    <div className="container-fluid p-0">
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-between mb-4 gap-2">
        <h3 className="fw-bold text-secondary m-0">Продукты</h3>

        <div style={{ maxWidth: "200px" }} className="w-100">
          <select className="form-select form-select-sm bg-white shadow-sm text-secondary fw-bold">
            <option value="ALL">{t.products.allTypes}</option>
            <option value="Laptops">{t.products.laptops}</option>
            <option value="Monitors">{t.products.monitors}</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm border p-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            {/* Шапка таблицы */}
            <thead>
              <tr className="table-light small text-uppercase text-muted">
                <th>{t.products.title}</th>
                <th>{t.products.type}</th>
                <th>{t.products.guaranteeStart}</th>
                <th>{t.products.guaranteeEnd}</th>
                <th>{t.products.priceUsd}</th>
                <th>{t.products.priceUah}</th>
                <th>{t.products.orderTitle}</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    {/* 1. Название продукта */}
                    <td className="fw-bold text-dark">{product.title}</td>
                    {/* 2. Тип продукта (пока выводим сырой, динамический перевод прикрутим в доработках) */}
                    <td className="text-secondary">{product.type}</td>
                    {/* 3. Дата начала гарантии (Формат 1) */}
                    <td className="text-muted font-monospace small">
                      {formatShortDate(product.guaranteeStart, locale)}
                    </td>
                    {/* 4. Дата конца гарантии (Формат 2) */}
                    <td className="text-muted small">
                      {formatLongDate(product.guaranteeEnd, locale)}
                    </td>
                    {/* 5. Цена USD */}
                    <td className="font-monospace fw-bold text-dark">
                      {product.priceUsd} $
                    </td>
                    {/* 6. Цена UAH */}
                    <td className="font-monospace text-secondary">
                      {product.priceUah} UAH
                    </td>
                    {/* 7. Название прихода */}
                    <td className="text-muted small">{product.order.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
