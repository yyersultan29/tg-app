import type { ReactNode } from "react";
import { useTelegramTheme } from "@core/hooks/use-theme";
import { ThemeContext } from "./theme-context";
import { CssVarsProvider } from "./css-vars-provider";

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
