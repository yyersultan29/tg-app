import { createContext } from "react";

export type TelegramWebApp = NonNullable<
  NonNullable<Window["Telegram"]>["WebApp"]
>;

export interface TgContextValue {
  tg: TelegramWebApp | null;
}

export const TgContext = createContext<TgContextValue>({ tg: null });
