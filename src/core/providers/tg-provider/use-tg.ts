import { useContext } from "react";
import { TgContext } from "./tg-context";

export function useTg() {
  return useContext(TgContext);
}
