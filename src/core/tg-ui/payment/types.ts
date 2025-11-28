export interface TgPaymentProps {
  invoiceLink: string;
  onSuccess?: () => void;
  onFail?: () => void;
}
