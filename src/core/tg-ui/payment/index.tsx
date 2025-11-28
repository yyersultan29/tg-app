import { useEffect } from "react";
import { useTg } from "@/core/providers";
import type { TgPaymentProps } from "./types";

export function TgPayment(props: TgPaymentProps) {
  const { invoiceLink, onSuccess, onFail } = props;

  const { tg } = useTg();

  useEffect(() => {
    if (!tg) return;

    tg?.openInvoice(invoiceLink, (result: string) => {
      if (result === "paid") onSuccess?.();
      else onFail?.();
    });
  }, [tg]);

  return null;
}
