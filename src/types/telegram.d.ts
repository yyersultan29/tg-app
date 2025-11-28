declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        showPopup(
          options: {
            title?: string;
            message: string;
            buttons: {
              text: string;
              type: "default" | "ok" | "close" | "cancel" | "destructive";
            }[];
          },
          callback: (buttonId: string | null) => void
        ): void;
        ready(): void;
        close(): void;
        expand(): void;
        colorScheme?: "light" | "dark";
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            photo_url?: string;
          };
        };
        MainButton?: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText(text: string): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          showProgress(leaveActive: boolean): void;
          hideProgress(): void;
        };
        BackButton?: {
          isVisible: boolean;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
        };
        HapticFeedback?: {
          impactOccurred(
            style: "light" | "medium" | "heavy" | "rigid" | "soft"
          ): void;
          notificationOccurred(type: "error" | "success" | "warning"): void;
          selectionChanged(): void;
        };
        showScanQrPopup(
          params: {
            text?: string; // текст в окне
          },
          callback?: (data: string | null) => void
        ): void;

        closeScanQrPopup(): void;
        showAlert(message: string, callback?: () => void): void;
        showConfirm(
          message: string,
          callback?: (confirmed: boolean) => void
        ): void;
        openInvoice(
          invoiceLink: string,
          callback: (result: "paid" | "failed") => void
        ): void;

        Accelerometer: AccelerometerData;
        DeviceOrientation: DeviceOrientationData;
        Gyroscope: GyroscopeData;

        // Flags
        isOrientationLocked: boolean;

        // Motion methods
        startAccelerometer(): void;
        stopAccelerometer(): void;

        startDeviceOrientation(): void;
        stopDeviceOrientation(): void;

        startGyroscope(): void;
        stopGyroscope(): void;

        lockOrientation(type: OrientationLockType): void;
        unlockOrientation(): void;

        // Events
        onEvent(event: MotionEventName, handler: () => void): void;
      };
    };
  }
}

interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

interface DeviceOrientationData {
  alpha: number;
  beta: number;
  gamma: number;
}

interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

type MotionEventName =
  | "accelerometerStarted"
  | "accelerometerStopped"
  | "accelerometerChanged"
  | "accelerometerFailed"
  | "deviceOrientationStarted"
  | "deviceOrientationStopped"
  | "deviceOrientationChanged"
  | "deviceOrientationFailed"
  | "gyroscopeStarted"
  | "gyroscopeStopped"
  | "gyroscopeChanged"
  | "gyroscopeFailed";

type OrientationLockType = "portrait" | "landscape";

export {};
