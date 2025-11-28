import { useTg } from "@/core/providers";

export const StatusBadge = () => {
  const { tg } = useTg();
  const isTelegramApiAvailable = tg?.Accelerometer.isSupported;
  const isTracking = tg?.Accelerometer.isStarted;
  let text, color;

  if (!isTelegramApiAvailable) {
    text = "Ошибка: Telegram Accelerometer API недоступен.";
    color = "bg-red-100 text-red-700";
  } else if (isTracking) {
    text = "Отслеживание активно. Двигайтесь!";
    color = "bg-green-100 text-green-700";
  } else {
    text = 'Акселерометр Telegram остановлен. Нажмите "Начать".';
    color = "bg-blue-100 text-blue-700";
  }

  return (
    <div
      className={`p-3 mt-4 w-full max-w-lg rounded-lg shadow-inner text-sm font-medium ${color}`}
    >
      {text}
    </div>
  );
};
