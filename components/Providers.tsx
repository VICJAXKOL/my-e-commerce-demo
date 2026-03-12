"use client";

import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import RoutePrefetcher from "./RoutePrefetcher";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RoutePrefetcher />
          <NavBar />
          <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl p-6">{children}</div>
          </main>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
