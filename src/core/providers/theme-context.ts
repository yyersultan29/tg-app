import { createContext } from "react";

import type { TelegramTheme } from "@core/hooks/use-theme";

interface ThemeContextValue {
  theme: TelegramTheme;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
