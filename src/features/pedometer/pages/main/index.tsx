"use client";

import { PageLayout } from "@/core/layouts";
import { useTg } from "@/core/providers";
import { useEffect, useState } from "react";

export function PedometerPage() {
  const { tg } = useTg();

  const [acc, setAcc] = useState({ x: 0, y: 0, z: 0 });
  const [ori, setOri] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [gyro, setGyro] = useState({ x: 0, y: 0, z: 0 });
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (!tg) return;

    tg?.startAccelerometer();
    tg.startDeviceOrientation();
    tg.startGyroscope();

    let lastAccel = 0;

    tg.onEvent("accelerometerChanged", () => {
      const { x, y, z } = tg.Accelerometer;
      setAcc({ x, y, z });

      // simple step detection
      const accel = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(accel - lastAccel);

      if (delta > 1.5) {
        setSteps((s) => s + 1);
      }

      lastAccel = accel;
    });

    tg.onEvent("deviceOrientationChanged", () => {
      setOri({ ...tg.DeviceOrientation });
    });

    tg.onEvent("gyroscopeChanged", () => {
      setGyro({ ...tg.Gyroscope });
    });
  }, []);

  return (
    <PageLayout title="Шагомер">
      <div className="p-4 space-y-4">
        {/* Steps Card */}
        <div className="bg-[var(--tg-theme-bg-color)] shadow rounded-2xl p-4 border border-[var(--tg-theme-section-separator-color)]">
          <h2 className="text-lg font-semibold text-[var(--tg-theme-text-color)]">
            Шаги
          </h2>
          <p className="text-4xl font-bold mt-2 text-[var(--tg-theme-button-color)]">
            {steps}
          </p>
        </div>

        {/* Accelerometer */}
        <div className="bg-[var(--tg-theme-bg-color)] shadow rounded-2xl p-4 border border-[var(--tg-theme-section-separator-color)]">
          <h3 className="text-md font-semibold text-[var(--tg-theme-hint-color)]">
            Accelerometer
          </h3>
          <div className="grid grid-cols-3 text-center text-[var(--tg-theme-text-color)] mt-2">
            <div>X: {acc.x.toFixed(2)}</div>
            <div>Y: {acc.y.toFixed(2)}</div>
            <div>Z: {acc.z.toFixed(2)}</div>
          </div>
        </div>

        {/* Device Orientation */}
        <div className="bg-[var(--tg-theme-bg-color)] shadow rounded-2xl p-4 border border-[var(--tg-theme-section-separator-color)]">
          <h3 className="text-md font-semibold text-[var(--tg-theme-hint-color)]">
            Device Orientation
          </h3>
          <div className="grid grid-cols-3 text-center text-[var(--tg-theme-text-color)] mt-2">
            <div>α: {ori.alpha.toFixed(1)}</div>
            <div>β: {ori.beta.toFixed(1)}</div>
            <div>γ: {ori.gamma.toFixed(1)}</div>
          </div>
        </div>

        {/* Gyroscope */}
        <div className="bg-[var(--tg-theme-bg-color)] shadow rounded-2xl p-4 border border-[var(--tg-theme-section-separator-color)]">
          <h3 className="text-md font-semibold text-[var(--tg-theme-hint-color)]">
            Gyroscope
          </h3>
          <div className="grid grid-cols-3 text-center text-[var(--tg-theme-text-color)] mt-2">
            <div>X: {gyro.x.toFixed(2)}</div>
            <div>Y: {gyro.y.toFixed(2)}</div>
            <div>Z: {gyro.z.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
