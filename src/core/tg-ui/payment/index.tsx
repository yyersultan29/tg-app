import { useEffect } from "react";

import type { TgPaymentProps } from "./types";

import { useTg } from "@/core/providers";

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
