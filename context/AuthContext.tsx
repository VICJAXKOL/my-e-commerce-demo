"use client";

import React from "react";

type User = {
  id: number;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const loadMe = React.useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      const data = (await response.json()) as { user: User | null };
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadMe();
  }, [loadMe]);

  const login = React.useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { user?: User; error?: string };
      if (!response.ok) {
        return { ok: false, error: data.error ?? "Unable to sign in." };
      }
      setUser(data.user ?? null);
      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to sign in." };
    }
  }, []);

  const register = React.useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { user?: User; error?: string };
      if (!response.ok) {
        return { ok: false, error: data.error ?? "Unable to create account." };
      }
      setUser(data.user ?? null);
      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to create account." };
    }
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
