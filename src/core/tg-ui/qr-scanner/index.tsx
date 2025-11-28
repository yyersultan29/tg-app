"use client";
import { useEffect } from "react";
import { useTg } from "@/core/providers";
import type { TgQrScannerProps } from "./types";

export function TgQrScanner(props: TgQrScannerProps) {
  const { text = "Scan QR code", onScan, onClose } = props;

  const { tg } = useTg();

  useEffect(() => {
    if (!tg) return;

    tg?.showScanQrPopup(
      {
        text,
      },
      (data: string | null) => {
        if (data) onScan(data);
        else onClose?.();
      }
    );

    return () => {
      tg.closeScanQrPopup();
    };
  }, [tg]);

  return null;
}
