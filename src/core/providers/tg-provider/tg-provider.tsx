import { useEffect, useMemo } from "react";

import { TgContext } from "./tg-context";

import type { TelegramWebApp } from "./tg-context";

export function TgProvider({ children }: { children: React.ReactNode }) {
  const tg = useMemo<TelegramWebApp | null>(() => {
    if (typeof window === "undefined") return null;

    const webapp = window?.Telegram?.WebApp;
    return webapp ? (webapp as unknown as TelegramWebApp) : null;
  }, []);

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window?.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return <TgContext.Provider value={{ tg }}>{children}</TgContext.Provider>;
}
