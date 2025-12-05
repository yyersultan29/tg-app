"use client";
import { useEffect, useState, useRef } from "react";

import { motion } from "framer-motion";

import { useTg } from "@/core/providers";
import { Button } from "@/core/ui";

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
    <div className="min-h-screen px-4 py-6 bg-[var(--tg-theme-bg-color)] flex flex-col items-center">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-[var(--tg-theme-text-color)] mb-6"
      >
        Шагомер
      </motion.h1>

      {/* Controls */}
      <motion.div
        className="flex gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {!isActive ? (
          <Button
            onClick={handleStart}
            className="px-6 py-3 text-lg rounded-xl shadow-lg bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
          >
            🚶 Начать
          </Button>
        ) : (
          <>
            <Button
              onClick={handleStop}
              className="px-5 py-3 rounded-xl bg-gray-200 text-black shadow"
            >
              ⏹️ Стоп
            </Button>
            <Button
              onClick={handleReset}
              className="px-5 py-3 rounded-xl bg-gray-200 text-black shadow"
            >
              🔄 Сброс
            </Button>
          </>
        )}
      </motion.div>

      {/* Active status */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-[var(--tg-theme-hint-color)] mb-4"
        >
          ✅ Акселерометр активен
        </motion.div>
      )}

      {/* Steps card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-72 p-6 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-[var(--tg-theme-text-color)] text-center">
          Пройдено шагов
        </h2>

        <motion.p
          key={steps}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl font-extrabold text-[var(--tg-theme-button-color)] text-center mt-4"
        >
          {steps}
        </motion.p>
      </motion.div>

      {/* Accelerometer card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-72 p-5 mt-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow"
      >
        <h3 className="text-md text-[var(--tg-theme-hint-color)] font-semibold">
          Accelerometer
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center mt-3">
          {["X", "Y", "Z"].map((axis, idx) => {
            const value = idx === 0 ? acc.x : idx === 1 ? acc.y : acc.z;
            return (
              <div key={axis}>
                <div className="text-xs opacity-50">{axis}</div>
                <div className="font-mono text-[var(--tg-theme-text-color)]">
                  {value.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 mt-4 pt-3">
          <div className="text-xs opacity-50">Magnitude</div>
          <div className="font-mono font-bold text-[var(--tg-theme-text-color)]">
            {Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2).toFixed(2)} m/s²
          </div>
        </div>
      </motion.div>

      <p className="text-[var(--tg-theme-hint-color)] text-center text-sm mt-6">
        💡 Положите телефон в карман и начинайте ходьбу
      </p>
    </div>
  );
}
