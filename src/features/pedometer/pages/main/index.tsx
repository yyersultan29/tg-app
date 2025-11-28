"use client";
import { useTg } from "@/core/providers";
import { useEffect, useState, useRef } from "react";

export function StepCounter() {
  const { tg } = useTg();

  const [steps, setSteps] = useState(0);
  const [acc, setAcc] = useState({ x: 0, y: 0, z: 0 });
  const [isActive, setIsActive] = useState(false);

  // Используем ref для хранения состояния между рендерами
  const lastAccelRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const BASE_THRESHOLD = 1.3;

  useEffect(() => {
    if (!tg?.Accelerometer || !isActive) return;

    // Обработчик данных акселерометра
    const onData = () => {
      const now = Date.now();
      const x = tg?.Accelerometer?.x || 0;
      const y = tg?.Accelerometer?.y || 0;
      const z = tg?.Accelerometer?.z || 0;

      setAcc({ x, y, z });

      const accel = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(accel - lastAccelRef.current);

      if (delta > BASE_THRESHOLD && now - lastStepTimeRef.current > 250) {
        setSteps((s) => s + 1);
        lastStepTimeRef.current = now;
      }

      lastAccelRef.current = accel;
    };

    // Подписываемся на события
    tg.onEvent("accelerometerChanged", onData);

    return () => {
      tg.offEvent("accelerometerChanged", onData);
    };
  }, [tg, isActive]);

  // Функция запуска акселерометра
  const handleStart = () => {
    if (!tg?.Accelerometer) {
      console.error("Accelerometer не поддерживается");
      return;
    }

    tg.Accelerometer.start({ refresh_rate: 50 }, (success: boolean) => {
      if (success) {
        setIsActive(true);
        setSteps(0);
        console.log("Accelerometer запущен!");
      } else {
        console.error("Не удалось запустить Accelerometer");
      }
    });
  };

  const handleStop = () => {
    if (!tg?.Accelerometer) return;

    tg.Accelerometer.stop();
    setIsActive(false);
  };

  const handleReset = () => {
    setSteps(0);
    lastAccelRef.current = 0;
    lastStepTimeRef.current = 0;
  };

  return (
    <div className="p-4 space-y-6 bg-[var(--tg-theme-bg-color)] min-h-screen flex flex-col items-center justify-center">
      {/* Кнопки управления */}
      <div className="flex gap-4">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] font-bold rounded-xl shadow"
          >
            🚶 Начать шагомер
          </button>
        ) : (
          <>
            <button
              onClick={handleStop}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow"
            >
              ⏹️ Остановить
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-500 text-white font-bold rounded-xl shadow"
            >
              🔄 Сброс
            </button>
          </>
        )}
      </div>

      {/* Статус */}
      {isActive && (
        <div className="text-[var(--tg-theme-hint-color)] text-sm">
          ✅ Акселерометр активен
        </div>
      )}

      {/* Счётчик шагов */}
      <div className="bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-section-separator-color)] rounded-2xl p-6 shadow text-center w-72">
        <h1 className="text-lg font-semibold text-[var(--tg-theme-text-color)]">
          Шаги
        </h1>
        <p className="text-5xl font-bold text-[var(--tg-theme-button-color)] mt-4">
          {steps}
        </p>
      </div>

      {/* Данные акселерометра */}
      <div className="bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-section-separator-color)] rounded-2xl p-4 shadow mt-4 w-72">
        <h2 className="text-md font-semibold text-[var(--tg-theme-hint-color)]">
          Accelerometer
        </h2>
        <div className="grid grid-cols-3 gap-2 text-center text-[var(--tg-theme-text-color)] mt-2">
          <div>
            <div className="text-xs opacity-60">X</div>
            <div className="font-mono">{acc.x.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs opacity-60">Y</div>
            <div className="font-mono">{acc.y.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs opacity-60">Z</div>
            <div className="font-mono">{acc.z.toFixed(2)}</div>
          </div>
        </div>

        {/* Величина ускорения */}
        <div className="mt-3 pt-3 border-t border-[var(--tg-theme-section-separator-color)]">
          <div className="text-xs opacity-60">Magnitude</div>
          <div className="font-mono font-bold">
            {Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z).toFixed(
              2
            )}{" "}
            m/s²
          </div>
        </div>
      </div>

      {/* Инструкция */}
      <p className="text-[var(--tg-theme-hint-color)] text-sm text-center max-w-md">
        💡 Нажмите "Начать шагомер", положите телефон в карман и начните ходить
      </p>
    </div>
  );
}
