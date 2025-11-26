import { useState } from "react";

export interface TelegramTheme {
  bgColor: string;
  textColor: string;
  hintColor: string;
  linkColor: string;
  buttonColor: string;
  buttonTextColor: string;
  secondaryBgColor: string;
}

const defaultTheme: TelegramTheme = {
  bgColor: "#1a1a1a",
  textColor: "#ffffff",
  hintColor: "#aaaaaa",
  linkColor: "#f5a623",
  buttonColor: "#f5a623",
  buttonTextColor: "#ffffff",
  secondaryBgColor: "#2a2a2a",
};

export const useTelegramTheme = () => {
  const [theme] = useState<TelegramTheme>(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.themeParams) {
      const tgTheme = tg.themeParams;
      return {
        bgColor: tgTheme.bg_color || defaultTheme.bgColor,
        textColor: tgTheme.text_color || defaultTheme.textColor,
        hintColor: tgTheme.hint_color || defaultTheme.hintColor,
        linkColor: tgTheme.link_color || defaultTheme.linkColor,
        buttonColor: tgTheme.button_color || defaultTheme.buttonColor,
        buttonTextColor:
          tgTheme.button_text_color || defaultTheme.buttonTextColor,
        secondaryBgColor:
          tgTheme.secondary_bg_color || defaultTheme.secondaryBgColor,
      };
    }

    return defaultTheme;
  });

  return theme;
};
