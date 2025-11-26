import { useEffect, type ReactNode } from "react";
import { useTelegramTheme } from "@core/hooks/use-theme";

interface CssVarsProviderProps {
  children: ReactNode;
}

export const CssVarsProvider = ({ children }: CssVarsProviderProps) => {
  const theme = useTelegramTheme();

  useEffect(() => {
    // Set CSS variables from Telegram theme
    document.documentElement.style.setProperty("--bg-color", theme.bgColor);
    document.documentElement.style.setProperty("--text-color", theme.textColor);
    document.documentElement.style.setProperty("--hint-color", theme.hintColor);
    document.documentElement.style.setProperty("--link-color", theme.linkColor);
    document.documentElement.style.setProperty("--button-color", theme.buttonColor);
    document.documentElement.style.setProperty("--button-text-color", theme.buttonTextColor);
    document.documentElement.style.setProperty("--secondary-bg", theme.secondaryBgColor);
  }, [theme]);

  return <>{children}</>;
};

