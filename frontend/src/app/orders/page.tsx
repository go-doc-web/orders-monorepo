"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "@/context/LanguageContext";
import { fetchOrders } from "@/store/orderSlice";
import Loader from "@/components/loader/Loader";
import ErrorAlert from "@/components/error-alert/ErrorAlert";

export default function OrdersPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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

  return <div>Orders Page</div>;
}
