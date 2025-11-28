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
      (data: string): boolean => {
        if (data) {
          onScan(data);
          return true;
        } else {
          onClose?.();
          return false;
        }
      }
    );

    return () => {
      tg.closeScanQrPopup();
    };
  }, [tg]);

  return null;
}
