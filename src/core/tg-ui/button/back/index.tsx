import { useEffect } from "react";

import { useTelegram } from "@/core/hooks";
import type { TgButtonBackProps } from "./types";

export function TgButtonBack({ onClick }: TgButtonBackProps) {
  const { tg } = useTelegram();

  useEffect(() => {
    if (!tg) return;

    tg.BackButton?.show();
    tg.BackButton?.onClick(onClick);

    return () => {
      tg.BackButton?.hide();
      tg.BackButton?.offClick(onClick);
    };
  }, [tg, onClick]);

  return null;
}
