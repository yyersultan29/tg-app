"use client";
import { PageLayout } from "@/core/layouts";
import { useTg } from "@/core/providers";
import { useEffect, useState } from "react";

export function StepCounter() {
  const { tg } = useTg();

  const [steps, setSteps] = useState(0);
  const [acc, setAcc] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!tg?.Accelerometer?.isSupported) return;

    let lastAccel = 0;
    let lastStepTime = 0;
    const BASE_THRESHOLD = 1.3;

    const handler = (data: { x: number; y: number; z: number }) => {
      const now = Date.now();
      const { x, y, z } = data;

      setAcc({ x, y, z });

      const accel = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(accel - lastAccel);

      if (delta > BASE_THRESHOLD && now - lastStepTime > 250) {
        setSteps((s) => s + 1);
        lastStepTime = now;
      }

      lastAccel = accel;
    };

    tg.Accelerometer.start();
    tg.onEvent("accelerometerChanged", handler);

    return () => {
      tg.Accelerometer.stop();
      tg.offEvent("accelerometerChanged", handler);
    };
  }, []);

  return (
    <PageLayout title="Шагомер">
      <div className="p-4 space-y-6 bg-[var(--tg-theme-bg-color)] min-h-screen">
        {/* Шаги */}
        <div className="bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-section-separator-color)] rounded-2xl p-6 shadow text-center">
          <h1 className="text-lg font-semibold text-[var(--tg-theme-text-color)]">
            Шаги
          </h1>
          <p className="text-5xl font-bold text-[var(--tg-theme-button-color)] mt-4">
            {steps}
          </p>
        </div>

        {/* Текущие ускорения */}
        <div className="bg-[var(--tg-theme-bg-color)] border border-[var(--tg-theme-section-separator-color)] rounded-2xl p-4 shadow">
          <h2 className="text-md font-semibold text-[var(--tg-theme-hint-color)]">
            Accelerometer
          </h2>
          <div className="grid grid-cols-3 text-center text-[var(--tg-theme-text-color)] mt-2">
            <div>X: {acc.x.toFixed(2)}</div>
            <div>Y: {acc.y.toFixed(2)}</div>
            <div>Z: {acc.z.toFixed(2)}</div>
          </div>
        </div>

        {/* Круговой прогресс (пример) */}
        <div className="flex justify-center items-center mt-6">
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36">
              <circle
                className="text-[var(--tg-theme-section-separator-color)]"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="60"
                cx="72"
                cy="72"
              />
              <circle
                className="text-[var(--tg-theme-button-color)]"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="60"
                cx="72"
                cy="72"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={
                  2 * Math.PI * 60 * (1 - Math.min(steps / 10000, 1))
                }
                strokeLinecap="round"
                transform="rotate(-90 72 72)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[var(--tg-theme-text-color)]">
              {steps}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
