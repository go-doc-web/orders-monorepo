"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteProductFromOrder, deleteOrder } from "@/store/orderSlice";
import { useTranslation } from "@/context/LanguageContext";
import { fetchOrders } from "@/store/orderSlice";
import Loader from "@/components/loader/Loader";
import DeleteModal from "@/components/delete-modal/DeleteModal";
import ErrorAlert from "@/components/error-alert/ErrorAlert";
import { formatShortDate, formatLongDate } from "@/helpers/formatedDate";
import { ListTask, ChevronRight } from "react-bootstrap-icons";
import { useEscape } from "@/hooks/useEscape";
import { Order } from "@/types";
import OrderDetalis from "./OrderDetails";
import DeleteButton from "@/components/delete-btn/DeleteButton";

export default function OrdersPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { t, locale } = useTranslation();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  // Close Products List via ESC
  useEscape(() => {
    if (selectedOrder) {
      setSelectedOrder(null);
    }
  });

  const {
    items: orders,
    loading,
    error,
  } = useAppSelector((state) => state.orders);

  const handleButtonClose = () => {
    setSelectedOrder(null);
  };
  /* Delete products */
  const handleDeleteProduct = (productId: number) => {
    if (selectedOrder) {
      dispatch(
        deleteProductFromOrder({ orderId: selectedOrder.id, productId }),
      );
    }
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorAlert />;
  }
  const currentActiveOrder =
    orders.find((o) => o.id === selectedOrder?.id) || null;
  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center mb-4 gap-3">
        <h3 className="fw-bold text-secondary m-0 fs-5">
          <ListTask className="mx-2 text-success" />
          {t.orders.title} / {orders.length}
        </h3>
      </div>
      <div className="row g-4">
        {/* Left Block */}
        <div className={currentActiveOrder ? "col-md-5 col-12" : "col-12"}>
          {/* Список карточек */}
          <div className="d-flex flex-column gap-2">
            {orders.map((order) => {
              const totalUsd =
                order.products?.reduce(
                  (sum, p) => sum + (p.priceUsd || 0),
                  0,
                ) || 0;
              const totalUah =
                order.products?.reduce(
                  (sum, p) => sum + (p.priceUah || 0),
                  0,
                ) || 0;
              const dateShort = formatShortDate(order.date, locale);
              const dateLong = formatLongDate(order.date, locale);
              return (
                <div
                  key={order.id}
                  onClick={() =>
                    setSelectedOrder(
                      currentActiveOrder?.id === order.id ? null : order,
                    )
                  }
                  className={`rounded shadow-sm border p-3 d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap mb-2 ${
                    currentActiveOrder?.id === order.id
                      ? "bg-light border-success "
                      : "bg-white"
                  }`}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                >
                  {/* Name Order */}
                  {!currentActiveOrder && (
                    <div
                      className="flex-grow-1"
                      style={{ minWidth: "200px", maxWidth: "400px" }}
                    >
                      <span
                        onClick={() => setSelectedOrder(order)}
                        className="text-dark fw-bold text-decoration-underline"
                        style={{ cursor: "pointer" }}
                      >
                        {order.title}
                      </span>
                    </div>
                  )}

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
                  {!currentActiveOrder && (
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
                  )}

                  {/* 5. Button Delete Order */}
                  <div className="ps-2">
                    {currentActiveOrder?.id === order.id ? (
                      <ChevronRight className="text-muted" size={18} />
                    ) : (
                      !currentActiveOrder && (
                        <DeleteButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setOrderToDelete(order);
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Right block */}
        {currentActiveOrder && (
          <div className="col-md-7 col-12">
            <OrderDetalis
              order={currentActiveOrder}
              onClose={handleButtonClose}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={!!orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={() => {
          if (orderToDelete) {
            //  dispatch Thunk'а
            dispatch(deleteOrder(orderToDelete.id));
            setOrderToDelete(null);
          }
        }}
        title={
          t.deleteModal.deleteOrderModal ||
          "Вы действительно хотите удалить этот приход?"
        }
        itemName={orderToDelete?.title || ""}
        btnCancel={t.deleteModal?.btnCancel || "Отмена"}
        btnDelete={t.deleteModal?.btnDelete || "Удалить"}
      />
    </div>
  );
}
