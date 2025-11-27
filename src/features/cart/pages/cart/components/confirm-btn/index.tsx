import { useEffect } from "react";

export const ConfirmBtn = () => {
  useEffect(() => {
    const tg = (window as Window)?.Telegram?.WebApp;
    if (!tg) return;
    tg.MainButton?.setText("🛒 Оформить заказ");
    tg.MainButton?.show();

    tg.MainButton?.onClick(() => {
      console.log("Клик по большой кнопке");
    });
  }, []);

  return null;
};
