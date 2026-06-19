"use client";
import { redirect } from "next/navigation";
import React from "react";

export default function Home(): React.JSX.Element {
  redirect("/orders");
  return <h4 className="text-muted">Перенаправление в систему...</h4>;
}
