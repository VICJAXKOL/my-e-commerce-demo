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
      sessionStorage.setItem("myshop_cart_clearing", String(Date.now()));
    } catch {}
    clearCart();
    void fetch("/api/cart", { method: "DELETE" });
  }, [enabled, clearCart]);

  return null;
}
