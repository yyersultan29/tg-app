export function useTelegram() {
  const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : null;

  return { tg };
}
