import { useTg } from "@/core/providers";
import { useCallback, useEffect, useRef, useState } from "react";
import { StatusBadge } from "./components";

const STEP_THRESHOLD = 2.5; // Новый, более низкий порог для ЛИНЕЙНОГО ускорения (без гравитации)
const PEAK_DETECTION_STATE = {
  WAITING_FOR_PEAK: 0,
  PEAK_DETECTED: 1,
  WAITING_FOR_DIP: 2, // Ожидание спада, чтобы избежать двойного счета
};

export const PedometerPage = () => {
  const { tg } = useTg();
  const [stepCount, setStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  // Ref'ы для сохранения состояния между рендерами
  const stepDetectionState = useRef(PEAK_DETECTION_STATE.WAITING_FOR_PEAK);
  const lastTotalAcceleration = useRef(0);

  // Проверяем доступность Telegram WebApp API
  // Теперь TypeScript знает, что window.Telegram может существовать
  const isTelegramApiAvailable = tg?.Accelerometer.isSupported;

  // --- Логика запроса разрешения (Теперь Telegram API сам управляет разрешениями) ---
  const startTracking = () => {
    // Telegram API не требует явного запроса разрешения, он запрашивается при start()
    try {
      // TypeScript знает, что window.Telegram.WebApp.Accelerometer существует
      tg?.Accelerometer.start();
      setIsTracking(true);
      console.log("Telegram Accelerometer Started.");
    } catch (e) {
      console.error(
        "Ошибка при запуске акселерометра Telegram: " + (e as Error).message
      );
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    if (isTelegramApiAvailable) {
      // TypeScript знает, что window.Telegram.WebApp.Accelerometer существует
      tg?.Accelerometer.stop();
    }
    setIsTracking(false);
    console.log("Telegram Accelerometer Stopped.");
  };

  // --- Обработчик движения устройства (использует данные Telegram API) ---
  // data теперь имеет тип { x: number; y: number; z: number }
  const handleAccelerometerChange = useCallback(
    (data: { x: number; y: number; z: number }) => {
      // Получаем линейное ускорение (без гравитации)
      const { x, y, z } = data;

      // В этом контексте x, y, z всегда должны быть определены
      // (но проверка на всякий случай может остаться, хотя TS уменьшит потребность в ней)
      if (x === undefined || y === undefined || z === undefined) {
        return;
      }

      // 1. Расчет общей силы (magnitude)
      // Используем общую величину линейного ускорения
      const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
      const deltaAcceleration =
        totalAcceleration - lastTotalAcceleration.current;
      lastTotalAcceleration.current = totalAcceleration;

      // 2. Логика обнаружения пиков (простая реализация шагомера)
      switch (stepDetectionState.current) {
        case PEAK_DETECTION_STATE.WAITING_FOR_PEAK:
          // Ждем, пока ускорение превысит пороговое значение (шаг)
          if (totalAcceleration > STEP_THRESHOLD && deltaAcceleration > 0.1) {
            stepDetectionState.current = PEAK_DETECTION_STATE.PEAK_DETECTED;
          }
          break;

        case PEAK_DETECTION_STATE.PEAK_DETECTED:
          // Пик обнаружен, считаем шаг и переходим к ожиданию спада
          setStepCount((c) => c + 1);
          stepDetectionState.current = PEAK_DETECTION_STATE.WAITING_FOR_DIP;
          break;

        case PEAK_DETECTION_STATE.WAITING_FOR_DIP:
          // Ждем, пока ускорение упадет ниже порога (завершение шага)
          // Порог спада должен быть близок к 0, так как ускорение линейное
          if (totalAcceleration < 0.8) {
            stepDetectionState.current = PEAK_DETECTION_STATE.WAITING_FOR_PEAK;
          }
          break;
        default:
          break;
      }
    },
    []
  );

  // --- Эффект для подключения/отключения слушателя событий ---
  useEffect(() => {
    if (!isTelegramApiAvailable) return;

    // Регистрируем слушатель события изменения акселерометра
    tg?.onEvent("accelerometerChanged", handleAccelerometerChange);

    // Очистка: удаляем слушатель и останавливаем акселерометр, если он был запущен
    return () => {
      tg?.offEvent("accelerometerChanged", handleAccelerometerChange);
      // Если isTracking было true, то при размонтировании он остановится через cleanup
      if (isTracking) {
        tg?.Accelerometer.stop();
      }
    };
  }, [isTelegramApiAvailable, handleAccelerometerChange]); // isTracking убран, т.к. stop() вызывается в cleanup

  // --- Функции управления ---
  const handleStartStop = () => {
    if (!isTelegramApiAvailable) {
      console.error("Telegram WebApp API для акселерометра недоступно.");
      return;
    }

    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  const handleReset = () => {
    setStepCount(0);
    stepDetectionState.current = PEAK_DETECTION_STATE.WAITING_FOR_PEAK;
  };

  // Определяем текст кнопки и цвета
  const buttonText = isTracking
    ? "Остановить Отслеживание"
    : "Начать Отслеживание";
  const buttonColor = isTracking
    ? "bg-red-500 hover:bg-red-600"
    : "bg-indigo-600 hover:bg-indigo-700";

  // UI для отображения статуса разрешения

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 font-sans">
      <header className="w-full max-w-lg text-center py-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🚶 Шагомер (Telegram API)
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Использует нативный Telegram.WebApp.Accelerometer
        </p>
      </header>

      <StatusBadge />

      <main className="flex-grow flex flex-col justify-center items-center w-full max-w-lg mt-8">
        {/* Дисплей счетчика шагов */}
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl text-center border-4 border-indigo-500/50">
          <p className="text-gray-500 text-xl font-semibold uppercase tracking-wider">
            Всего Шагов
          </p>
          <div className="text-8xl font-black text-indigo-700 mt-2 flex items-center justify-center">
            <span className="animate-pulse mr-4 text-6xl text-indigo-400">
              {isTracking ? "🏃" : "⏸️"}
            </span>
            {/* Форматируем число с разделителями */}
            {stepCount.toLocaleString("ru-RU")}
          </div>
          <p className="mt-4 text-sm text-gray-400">
            {isTracking
              ? "Двигайтесь, чтобы счетчик обновлялся..."
              : 'Нажмите "Начать", чтобы активировать сенсоры.'}
          </p>
        </div>

        {/* Блок с кнопками управления */}
        <div className="w-full flex space-x-4 mt-8">
          <button
            onClick={handleStartStop}
            disabled={!isTelegramApiAvailable}
            className={`flex-1 transition duration-200 ease-in-out transform shadow-lg text-white font-bold py-3 px-6 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-offset-2 ${buttonColor} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {buttonText}
          </button>
          <button
            onClick={handleReset}
            disabled={stepCount === 0}
            className="transition duration-200 ease-in-out transform flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Сброс
          </button>
        </div>
      </main>

      <footer className="w-full max-w-lg text-center py-4 mt-8 text-xs text-gray-400">
        <p>
          Обратите внимание: Этот метод использует Telegram API, что
          обеспечивает высокую совместимость и энергоэффективность.
        </p>
      </footer>
    </div>
  );
};
