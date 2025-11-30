import { useState } from "react";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonAddress,
} from "@tonconnect/ui-react";

export function TonCheckoutPage() {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  //   const rawAddress = useTonAddress(false);

  const [amount, setAmount] = useState("1");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Функция для отправки TON
  const handlePayment = async () => {
    if (!userFriendlyAddress) {
      setPaymentStatus("❌ Сначала подключите кошелёк");
      return;
    }

    setIsPaying(true);
    setPaymentStatus("");

    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 секунд
        messages: [
          {
            address: "UQBm-YaVdYWK1JX6KxkfEiIZZ_N9VkJkQpX-gTD7N_4F2y1O", // Адрес получателя (замени на свой)
            amount: (parseFloat(amount) * 1_000_000_000).toString(), // Конвертируем TON в nanoTON
            payload: "", // Комментарий к платежу (опционально)
          },
        ],
      };

      const result = await tonConnectUI.sendTransaction(transaction);

      console.log("Транзакция отправлена:", result);
      setPaymentStatus(`✅ Платёж успешно отправлен!`);

      // Здесь можно отправить информацию о платеже на бэкенд
      // await fetch('/api/verify-payment', {
      //   method: 'POST',
      //   body: JSON.stringify({ boc: result.boc })
      // });
    } catch (error) {
      console.error("Ошибка платежа:", error);
      setPaymentStatus("❌ Ошибка: " + (error as Error).message);
    } finally {
      setIsPaying(false);
    }
  };

  // Отключение кошелька
  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-white mb-2">💎 TON Payment</h1>
          <p className="text-white/60 text-sm">Оплата через TON Blockchain</p>
        </div>

        {/* Wallet Connection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-white font-semibold mb-4">Кошелёк</h2>

          <div className="mb-4">
            <TonConnectButton />
          </div>

          {userFriendlyAddress && (
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Ваш адрес:</div>
                <div className="text-white font-mono text-sm break-all">
                  {userFriendlyAddress}
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
              >
                Отключить кошелёк
              </button>
            </div>
          )}
        </div>

        {/* Payment Form */}
        {userFriendlyAddress && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4">Отправить платёж</h2>

            <div className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  Сумма (TON)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.1"
                  min="0.1"
                  className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="1.0"
                />
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2">
                {["0.5", "1", "5", "10"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className="flex-1 px-3 py-2 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {preset} TON
                  </button>
                ))}
              </div>

              {/* Recipient Address */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  Получатель
                </label>
                <div className="px-4 py-3 bg-white/5 text-white/60 rounded-lg text-sm font-mono break-all">
                  UQBm-YaVdYWK1JX6KxkfEiIZZ_N9VkJkQpX-gTD7N_4F2y1O
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isPaying || !amount}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isPaying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  `💎 Оплатить ${amount} TON`
                )}
              </button>

              {/* Status Message */}
              {paymentStatus && (
                <div
                  className={`p-4 rounded-lg text-center font-semibold ${
                    paymentStatus.includes("✅")
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {paymentStatus}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-3">Преимущества TON</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <div className="flex items-start gap-2">
              <span>⚡</span>
              <span>Молниеносные транзакции (до 100,000 TPS)</span>
            </div>
            <div className="flex items-start gap-2">
              <span>💰</span>
              <span>Минимальные комиссии (~$0.01)</span>
            </div>
            <div className="flex items-start gap-2">
              <span>🔒</span>
              <span>Безопасность блокчейна</span>
            </div>
            <div className="flex items-start gap-2">
              <span>🌍</span>
              <span>900+ миллионов пользователей Telegram</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-white/40 text-xs">
          <p>Powered by TON Blockchain</p>
          <p className="mt-1">Безопасные и мгновенные платежи</p>
        </div>
      </div>
    </div>
  );
}

// Не забудь обернуть приложение в TonConnectUIProvider:
// import { TonConnectUIProvider } from '@tonconnect/ui-react';
//
// <TonConnectUIProvider manifestUrl="https://your-app.com/tonconnect-manifest.json">
//   <TonPaymentDemo />
// </TonConnectUIProvider>
