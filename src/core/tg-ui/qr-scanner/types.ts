export interface TgQrScannerProps {
  text?: string;
  onScan: (data: string) => void;
  onClose?: () => void;
}
