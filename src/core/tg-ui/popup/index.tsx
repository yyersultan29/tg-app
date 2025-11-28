import { useTg } from "@/core/providers";
import { useEffect } from "react";
import type { TgPopupProps } from "./types";

export function TgPopup(props: TgPopupProps) {
  const { title, message, buttons, onResult } = props;

  const { tg } = useTg();

  useEffect(() => {
    if (!tg) return;

    tg?.showPopup(
      {
        title,
        message,
        buttons: buttons.map((button) => ({
          text: button.text,
          type: button.type || "default",
        })),
      },
      (buttonId: string | null) => {
        onResult(buttonId);
      }
    );
  }, [tg, title, message, buttons, onResult]);

  return null;
}
