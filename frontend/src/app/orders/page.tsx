"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "@/context/LanguageContext";
import { fetchOrders } from "@/store/orderSlice";
import Loader from "@/components/loader/Loader";
import ErrorAlert from "@/components/error-alert/ErrorAlert";
import { formatShortDate, formatLongDate } from "@/helpers/formatedDate";
import { ListTask, Trash3 } from "react-bootstrap-icons";

export default function OrdersPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { t, locale } = useTranslation();

  const {
    items: orders,
    loading,
    error,
  } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorAlert />;
  }

  console.log("orders", orders);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center mb-4 gap-3">
        <h3 className="fw-bold text-secondary m-0 fs-5">
          Приходы / {orders.length}
        </h3>
      </div>

      {/* Список карточек */}
      <div className="d-flex flex-column gap-2">
        {orders.map((order) => {
          const totalUsd =
            order.products?.reduce((sum, p) => sum + (p.priceUsd || 0), 0) || 0;
          const totalUah =
            order.products?.reduce((sum, p) => sum + (p.priceUah || 0), 0) || 0;
          const dateShort = formatShortDate(order.date, locale);
          const dateLong = formatLongDate(order.date, locale);
          return (
            <div
              key={order.id}
              className="bg-white rounded shadow-sm border p-3 d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap"
              style={{ fontSize: "14px" }}
            >
              {/* 1. Name Order */}
              <div
                className="flex-grow-1"
                style={{ minWidth: "200px", maxWidth: "400px" }}
              >
                <span
                  className="text-dark fw-bold text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  {order.title}
                </span>
              </div>

              {/* 2. Sum of Orders*/}
              <div className="d-flex align-items-center gap-2 px-3 border-start border-end">
                <div
                  className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
                  style={{ width: "35px", height: "35px" }}
                >
                  <ListTask className="text-secondary" size={18} />
                </div>
                <div>
                  <span
                    className="fw-bold text-dark d-block lead m-0"
                    style={{ fontSize: "16px", lineHeight: "1" }}
                  >
                    {order.products?.length || 0}
                  </span>
                  <span className="text-muted small">
                    {t.orders.productsCount}
                  </span>
                </div>
              </div>

              {/* 3. Date order */}
              <div className="text-center px-2">
                <span className="text-muted font-monospace small d-block mb-1">
                  {dateShort}
                </span>
                <span className="text-dark small d-block fw-semibold">
                  {dateLong}
                </span>
              </div>

              {/* 4. Sum Order Uah Usd */}
              <div className="text-end px-3">
                <span className="text-muted small d-block font-monospace">
                  {totalUsd.toLocaleString(locale)} $
                </span>
                <span
                  className="text-dark fw-bold d-block font-monospace"
                  style={{ fontSize: "15px" }}
                >
                  {totalUah.toLocaleString(locale)} UAH
                </span>
              </div>

              {/* 5. Button Delete Order */}
              <div className="ps-2">
                <button className="btn btn-link text-muted p-0 border-0 action-delete-btn">
                  <Trash3 className="text-secondary" size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
