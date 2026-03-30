"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function NavBar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const primaryLinks = [
    { href: "/products", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];
  const utilityLinks = [
    { href: "/faq", label: "Help" },
    { href: "/contact", label: "Contact" },
    { href: "/orders", label: "Orders" },
  ];

  const closeMenu = () => setMenuOpen(false);
  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[color:color-mix(in_srgb,var(--surface-invert)_82%,transparent)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Go to home page">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-500),var(--brand-600))] text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)]">
              M
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold tracking-tight text-white">MyShop</span>
              <span className="block text-xs text-slate-300">Curated everyday essentials</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-sm font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {utilityLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link text-sm">
              {link.label}
            </Link>
          ))}
          <Link
            href="/wishlist"
            className="btn-ghost focus-ring inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            <span>Wishlist</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white">{wishlistCount}</span>
          </Link>
          {user ? (
            <>
              <Link href="/account" className="nav-link text-sm font-medium">
                Account
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-ghost focus-ring px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link text-sm font-medium">
                Sign In
              </Link>
              <Link
                href="/register"
                className="btn-outline focus-ring border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.08]"
              >
                Create Account
              </Link>
            </>
          )}
          <Link
            href="/cart"
            className="btn-primary focus-ring inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
          >
            <span>Cart</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">{cartCount}</span>
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 shadow-[var(--shadow-soft)] hover:bg-white/10 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="fade-in-up border-t border-white/10 bg-[color:color-mix(in_srgb,var(--surface-invert)_92%,transparent)] px-4 pb-5 pt-4 shadow-[var(--shadow-soft)] lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[var(--radius-lg)] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.86))] p-4 text-sm text-white shadow-[var(--shadow-card)] backdrop-blur-xl">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Browse</p>
                <p className="mt-1 text-sm text-slate-300">Find products, manage your cart, and keep shopping.</p>
              </div>
              <Link href="/cart" onClick={closeMenu} className="btn-primary focus-ring px-4 py-2 text-sm font-semibold">
                Cart ({cartCount})
              </Link>
            </div>

            {[...primaryLinks, ...utilityLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                <span>{link.label}</span>
                <span className="text-slate-300">→</span>
              </Link>
            ))}

            <Link
              href="/wishlist"
              onClick={closeMenu}
              className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              <span>Wishlist</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white">{wishlistCount}</span>
            </Link>
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  Account
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await handleLogout();
                    closeMenu();
                  }}
                  className="btn-outline focus-ring border-white/15 bg-white/[0.04] px-4 py-3 text-left text-sm font-medium text-white hover:bg-white/[0.08]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="btn-outline focus-ring border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white hover:bg-white/[0.08]"
                >
                  Sign In
                </Link>
                <Link href="/register" onClick={closeMenu} className="btn-primary focus-ring px-4 py-3 text-sm font-semibold">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
