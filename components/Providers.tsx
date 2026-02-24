"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavBar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-5xl p-6">{children}</div>
        </main>
        <Footer />
      </CartProvider>
    </WishlistProvider>
  );
}
