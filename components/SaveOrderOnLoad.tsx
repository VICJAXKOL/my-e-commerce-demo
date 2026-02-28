"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { saveOrder, type StoredOrderItem } from "../lib/orders";

type Props = {
  enabled: boolean;
  orderNumber: string;
  total: number;
  etaDays: string;
  items: StoredOrderItem[];
};

export default function SaveOrderOnLoad({ enabled, orderNumber, total, etaDays, items }: Props) {
  const { items: cartItems } = useCart();
  const hasSavedRef = React.useRef(false);

  React.useEffect(() => {
    if (!enabled || hasSavedRef.current) return;
    const orderItems =
      items.length > 0
        ? items
        : cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          }));
    if (orderItems.length === 0) return;

    hasSavedRef.current = true;
    saveOrder({
      orderNumber,
      createdAt: new Date().toISOString(),
      total,
      etaDays,
      status: "confirmed",
      items: orderItems,
    });
  }, [enabled, orderNumber, total, etaDays, items, cartItems]);

  return null;
}
