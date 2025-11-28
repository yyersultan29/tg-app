declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        showPopup(
          options: {
            title?: string;
            message: string;
            buttons: {
              id?: string; // 👈 Добавь id для кнопок
              text: string;
              type?: "default" | "ok" | "close" | "cancel" | "destructive";
            }[];
          },
          callback?: (buttonId: string) => void // 👈 Убрал null, всегда string
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
          showProgress(leaveActive?: boolean): void; // 👈 Сделал опциональным
          hideProgress(): void;
          setParams(params: {
            // 👈 Добавил setParams
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }): void;
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
            text?: string;
          },
          callback?: (data: string) => boolean // 👈 Возвращает boolean (true = закрыть)
        ): void;
        closeScanQrPopup(): void;
        showAlert(message: string, callback?: () => void): void;
        showConfirm(
          message: string,
          callback?: (confirmed: boolean) => void
        ): void;
        openInvoice(
          invoiceLink: string,
          callback?: (
            result: "paid" | "failed" | "cancelled" | "pending"
          ) => void // 👈 Добавил cancelled и pending
        ): void;

        platform: string;
        version: string; // 👈 Добавил version
        isVersionAtLeast(version: string): boolean; // 👈 Добавил проверку версии

        /** Акселерометр */
        Accelerometer?: {
          // 👈 Сделал опциональным
          x: number; // 👈 Текущие значения
          y: number;
          z: number;
          start(
            params?: AccelerometerStartParams,
            callback?: (success: boolean) => void
          ): void; // 👈 Убрал возвращаемый тип
          stop(): void;
          isStarted: boolean; // 👈 Убрал isSupported
        };

        /** Гироскоп */
        DeviceOrientation?: {
          // 👈 Добавил гироскоп
          alpha: number;
          beta: number;
          gamma: number;
          start(
            params?: DeviceOrientationStartParams,
            callback?: (success: boolean) => void
          ): void;
          stop(): void;
          isStarted: boolean;
        };

        /** Гироскоп (альтернативное название) */
        Gyroscope?: {
          x: number;
          y: number;
          z: number;
          start(
            params?: GyroscopeStartParams,
            callback?: (success: boolean) => void
          ): void;
          stop(): void;
          isStarted: boolean;
        };

        // Events
        onEvent(
          eventType: TelegramEventName,
          callback: (...args: unknown[]) => void
        ): void;
        offEvent(
          eventType: TelegramEventName,
          callback: (...args: unknown[]) => void
        ): void;

        // CloudStorage
        CloudStorage?: {
          setItem(
            key: string,
            value: string,
            callback?: (error: string | null, success: boolean) => void
          ): void;
          getItem(
            key: string,
            callback?: (error: string | null, value: string) => void
          ): void;
          getItems(
            keys: string[],
            callback?: (
              error: string | null,
              values: Record<string, string>
            ) => void
          ): void;
          removeItem(
            key: string,
            callback?: (error: string | null, success: boolean) => void
          ): void;
          removeItems(
            keys: string[],
            callback?: (error: string | null, success: boolean) => void
          ): void;
          getKeys(
            callback?: (error: string | null, keys: string[]) => void
          ): void;
        };

        // Biometric
        BiometricManager?: {
          isInited: boolean;
          isBiometricAvailable: boolean;
          biometricType: "finger" | "face" | "unknown";
          isAccessRequested: boolean;
          isAccessGranted: boolean;
          isBiometricTokenSaved: boolean;
          deviceId: string;
          init(callback?: () => void): void;
          requestAccess(
            params: { reason?: string },
            callback?: (success: boolean) => void
          ): void;
          authenticate(
            params: { reason?: string },
            callback?: (success: boolean, biometricToken?: string) => void
          ): void;
          updateBiometricToken(
            token: string,
            callback?: (success: boolean) => void
          ): void;
          openSettings(): void;
        };

        // Дополнительные методы
        requestWriteAccess(callback?: (granted: boolean) => void): void;
        requestContact(
          callback?: (granted: boolean, contact?: Contact) => void
        ): void;
        openLink(url: string, options?: { try_instant_view?: boolean }): void;
        openTelegramLink(url: string): void;
        shareToStory(mediaUrl: string, params?: ShareToStoryParams): void;
        switchInlineQuery(query: string, chooseChatTypes?: string[]): void;

        // Viewport
        viewportHeight: number;
        viewportStableHeight: number;
        isExpanded: boolean;

        // Safe Area
        safeAreaInset?: {
          top: number;
          bottom: number;
          left: number;
          right: number;
        };
        contentSafeAreaInset?: {
          top: number;
          bottom: number;
          left: number;
          right: number;
        };

        // Closing confirmation
        enableClosingConfirmation(): void;
        disableClosingConfirmation(): void;

        // Header & Background colors
        setHeaderColor(color: string): void;
        setBackgroundColor(color: string): void;

        // Secondary Button
        SecondaryButton?: {
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
          showProgress(leaveActive?: boolean): void;
          hideProgress(): void;
          setParams(params: {
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }): void;
        };

        // Settings Button
        SettingsButton?: {
          isVisible: boolean;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
        };
      };
    };
  }
}

interface AccelerometerStartParams {
  /** Интервал обновления в миллисекундах (20–1000). По умолчанию 1000 */
  refresh_rate?: number;
}

interface DeviceOrientationStartParams {
  refresh_rate?: number;
  need_absolute?: boolean;
}

interface GyroscopeStartParams {
  refresh_rate?: number;
}

type TelegramEventName =
  // Accelerometer
  | "accelerometerStarted"
  | "accelerometerStopped"
  | "accelerometerChanged"
  | "accelerometerFailed"
  // Device Orientation
  | "deviceOrientationStarted"
  | "deviceOrientationStopped"
  | "deviceOrientationChanged"
  | "deviceOrientationFailed"
  // Gyroscope
  | "gyroscopeStarted"
  | "gyroscopeStopped"
  | "gyroscopeChanged"
  | "gyroscopeFailed"
  // UI Events
  | "themeChanged"
  | "viewportChanged"
  | "mainButtonClicked"
  | "backButtonClicked"
  | "settingsButtonClicked"
  | "invoiceClosed"
  | "popupClosed"
  | "qrTextReceived"
  | "clipboardTextReceived"
  | "writeAccessRequested"
  | "contactRequested"
  // Biometric
  | "biometricManagerUpdated"
  | "biometricAuthRequested"
  | "biometricTokenUpdated";

export {};
