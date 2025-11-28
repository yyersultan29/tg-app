"use client";

import { useTg } from "@/core/providers";
import { Button } from "@/core/ui";
import { InfoRow } from "../../components";

export function ProfilePage() {
  const { tg } = useTg();

  return (
    <div className="min-h-screen bg-[var(--tg-theme-bg-color)] text-[var(--tg-theme-text-color)] p-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={tg?.initDataUnsafe?.user?.photo_url}
          alt="avatar"
          className="w-24 h-24 rounded-full shadow-lg"
        />
        <h1 className="text-xl font-semibold mt-3">
          {tg?.initDataUnsafe?.user?.first_name}
        </h1>
        <p className="opacity-70 text-sm">
          {tg?.initDataUnsafe?.user?.last_name}
        </p>
      </div>

      {/* Card */}
      <div className="bg-[var(--tg-theme-secondary-bg-color)] rounded-xl p-4 shadow-md space-y-3">
        <InfoRow
          label="Username"
          value={tg?.initDataUnsafe?.user?.username || ""}
        />
        <InfoRow label="Статус" value="Постоянный клиент" />
        <InfoRow label="Баланс" value="4 500 ₸" />
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <Button className="w-full">Пополнить баланс</Button>
        <Button variant="secondary" className="w-full">
          Выйти
        </Button>
      </div>
    </div>
  );
}
