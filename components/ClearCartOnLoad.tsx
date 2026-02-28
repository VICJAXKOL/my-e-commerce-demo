"use client";

import React from "react";
import { useCart } from "../context/CartContext";

type Props = {
  enabled: boolean;
};

export default function ClearCartOnLoad({ enabled }: Props) {
  const { clearCart } = useCart();

  React.useEffect(() => {
    if (!enabled) return;
    clearCart();
  }, [enabled, clearCart]);

  return null;
}
