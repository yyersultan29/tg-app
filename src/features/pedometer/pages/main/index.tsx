"use client";
import { useTg } from "@/core/providers";
import { useEffect, useState } from "react";

export function StepCounter() {
  const { tg } = useTg();

  const [steps, setSteps] = useState(0);
  const [acc, setAcc] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!tg?.Accelerometer?.isStarted) return;

    let lastAccel = 0;
    let lastStepTime = 0;
    const BASE_THRESHOLD = 1.3;

    // обработчик данных акселерометра
    const onData = (data: { x: number; y: number; z: number }) => {
      setAcc(data);

      const now = Date.now();
      const { x, y, z } = data;

      const accel = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(accel - lastAccel);

      if (delta > BASE_THRESHOLD && now - lastStepTime > 250) {
        setSteps((s) => s + 1);
        lastStepTime = now;
      }

      lastAccel = accel;
    };

    tg.onEvent("accelerometerChanged", onData);

    return () => {
      tg.Accelerometer.stop();
      tg.offEvent("accelerometerChanged", onData);
    };
  }, []);

  // Функция запуска акселерометра — её нужно вызвать на первый тап
  const handleStart = () => {
    if (!tg?.Accelerometer) return;

    tg.Accelerometer.start({ refresh_rate: 50 }, (success: boolean) => {
      if (!success) console.warn("Accelerometer failed to start");
    });
  };

  return (
    <div className="p-4 space-y-6 bg-[var(--tg-theme-bg-color)] min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-[var(--tg-theme-button-color)] text-white font-bold rounded-xl shadow mb-6"
      >
        Начать шагомер
      </button>

      <div className="bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-section-separator-color)] rounded-2xl p-6 shadow text-center w-72">
        <h1 className="text-lg font-semibold text-[var(--tg-theme-text-color)]">
          Шаги
        </h1>
        <p className="text-5xl font-bold text-[var(--tg-theme-button-color)] mt-4">
          {steps}
        </p>
      </div>

      <div className="bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-section-separator-color)] rounded-2xl p-4 shadow mt-4 w-72">
        <h2 className="text-md font-semibold text-[var(--tg-theme-hint-color)]">
          Accelerometer
        </h2>
        <div className="grid grid-cols-3 text-center text-[var(--tg-theme-text-color)] mt-2">
          <div>X: {acc.x.toFixed(2)}</div>
          <div>Y: {acc.y.toFixed(2)}</div>
          <div>Z: {acc.z.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
