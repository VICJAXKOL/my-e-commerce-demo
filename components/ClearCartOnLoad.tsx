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
  }, [enabled, clearCart]);

  return null;
}
