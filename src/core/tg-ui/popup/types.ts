export type PopupButton = {
  id: string;
  type?: "default" | "ok" | "close" | "cancel" | "destructive";
  text: string;
};

export interface TgPopupProps {
  title?: string;
  message: string;
  buttons: PopupButton[];
  onResult: (id: string | null) => void;
}
