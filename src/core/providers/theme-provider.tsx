import type { ReactNode } from "react";

import { useTelegramTheme } from "@core/hooks/use-theme";

import { CssVarsProvider } from "./css-vars-provider";
import { ThemeContext } from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useTelegramTheme();

  return (
    <ThemeContext.Provider value={{ theme }}>
      <CssVarsProvider>{children}</CssVarsProvider>
    </ThemeContext.Provider>
  );
};
