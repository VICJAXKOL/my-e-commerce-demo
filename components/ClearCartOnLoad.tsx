"use client";

import React from "react";
import { useCart } from "../context/CartContext";

type Props = {
  enabled: boolean;
};

export default function ClearCartOnLoad({ enabled }: Props) {
  const { clearCart } = useCart();

  React.useLayoutEffect(() => {
    if (!enabled) return;
    try {
      localStorage.removeItem("myshop_cart_v1");
    } catch {}
    clearCart();
    void fetch("/api/cart", { method: "DELETE" });
  }, [enabled, clearCart]);

  return null;
}
