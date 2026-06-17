"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "@/context/LanguageContext";
import { formatShortDate, formatLongDate } from "@/helpers/formatedDate";
import { fetchProducts } from "@/store/productsSlice";
import { RootState } from "@/store/store";

export default function ProductsPage(): React.JSX.Element {
  const { t, locale } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
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
          <table
            className="table table-hover align-middle m-0"
            style={{ minWidth: "1000px", fontSize: "13px" }}
          >
            {/* Шапка таблицы */}
            <thead>
              <tr
                className="table-light small text-uppercase text-muted"
                style={{ fontSize: "11px" }}
              >
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
                    {/* 1. Title Product */}
                    <td className="fw-bold text-dark">{product?.title}</td>
                    {/* 2. Type  of Products*/}
                    <td className="text-secondary">{product?.type}</td>
                    {/* 3. Date Start Gar  Format one*/}
                    <td className="text-muted font-monospace small">
                      {formatShortDate(product?.guaranteeStart, locale)}
                    </td>
                    {/* 4. Date End Gar format two*/}
                    <td className="text-muted small">
                      {formatLongDate(product?.guaranteeEnd, locale)}
                    </td>
                    {/* 5. Price USD */}
                    <td className="font-monospace fw-bold text-dark">
                      {product?.priceUsd}
                    </td>
                    {/* 6. Price UAH */}
                    <td className="font-monospace text-secondary">
                      {product?.priceUah}
                    </td>
                    {/* 7. Title Order */}
                    <td className="text-muted small">{product.order?.title}</td>
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
