"use client";

import { useEffect } from "react";
import { useTelegram } from "@core/hooks";
import type { TgButtonMainProps } from "./types";

export function TgButtonMain({ text, onClick }: TgButtonMainProps) {
  const { tg } = useTelegram();

  useEffect(() => {
    if (!tg) return;

    tg.MainButton?.setText(text);
    tg.MainButton?.show();
    tg.MainButton?.onClick(onClick);

    return () => {
      tg.MainButton?.offClick(onClick);
      tg.MainButton?.hide();
    };
  }, [tg, text, onClick]);

  return null;
}
