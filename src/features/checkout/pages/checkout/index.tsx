import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme, useCart } from "@core/providers";
import { PageLayout } from "@core/layouts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
} from "@core/ui";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cart: items, clearCart } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = total * 0.1;
  const delivery = 2.99;
  const finalTotal = total + tax + delivery;

  const handleConfirm = () => {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
    clearCart();
    navigate("/success");
  };

  return (
    <PageLayout
      title="Checkout"
      subtitle="Review your order"
      showBackButton
      backPath="/cart"
    >
      <div className="px-5 py-5 space-y-4 pb-24">
        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card gradient="orange" padding="lg">
            <CardHeader className="mt-1 mb-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-[var(--text-color)]">
                  📦 Your Order
                </CardTitle>
                <Badge variant="accent">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className="flex items-center justify-between py-3 px-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-3xl"
                    >
                      {item.emoji}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate text-[var(--text-color)]">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-medium text-[var(--link-color)]">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[var(--hint-color)]">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-sm ml-2 text-[var(--text-color)]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card gradient="green" padding="lg">
            <CardHeader className="mt-1 mb-5">
              <CardTitle className="text-base font-bold text-[var(--text-color)]">
                💰 Payment Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex justify-between items-center text-sm py-2.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-[var(--hint-color)]">Subtotal</span>
                <span className="font-semibold text-[var(--text-color)]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm py-2.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--hint-color)]">Tax</span>
                  <Badge variant="default" className="text-xs">
                    10%
                  </Badge>
                </div>
                <span className="font-semibold text-[var(--text-color)]">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm py-2.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--hint-color)]">Delivery Fee</span>
                  <Badge variant="accent" icon="🚚">
                    Fast
                  </Badge>
                </div>
                <span className="font-semibold text-[var(--text-color)]">
                  ${delivery.toFixed(2)}
                </span>
              </div>

              <div
                className="border-t pt-4 mt-3"
                style={{ borderColor: theme.hintColor + "20" }}
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="flex justify-between items-center py-3 px-3 rounded-xl"
                  style={{ backgroundColor: theme.linkColor + "10" }}
                >
                  <span className="font-bold text-base text-[var(--text-color)]">
                    Total Amount
                  </span>
                  <span className="font-bold text-2xl text-[var(--link-color)]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card gradient="blue" padding="lg">
            <CardHeader className="mt-1 mb-5">
              <CardTitle className="text-base font-bold text-[var(--text-color)]">
                💳 Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="p-4 rounded-xl border-2 cursor-pointer relative overflow-hidden"
                style={{
                  backgroundColor: theme.bgColor,
                  borderColor: theme.buttonColor,
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: theme.buttonColor + "20" }}
                  >
                    💎
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[var(--text-color)]">
                      Telegram Payment
                    </p>
                    <p className="text-xs mt-0.5 text-[var(--hint-color)]">
                      Fast & secure payment
                    </p>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: theme.buttonColor }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.buttonColor }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              <div
                className="p-4 rounded-xl opacity-50 relative"
                style={{ backgroundColor: theme.bgColor }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: theme.hintColor + "15" }}
                  >
                    💵
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[var(--text-color)]">
                      Cash on Delivery
                    </p>
                    <p className="text-xs mt-0.5 text-[var(--hint-color)]">
                      Available soon
                    </p>
                  </div>
                  <Badge variant="default" className="opacity-70">
                    Soon
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card gradient="pink" padding="lg">
            <CardHeader className="mt-1 mb-5">
              <CardTitle className="text-base font-bold text-[var(--text-color)]">
                🚚 Delivery Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: theme.bgColor }}
                >
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium mb-1 text-[var(--hint-color)]">
                    Delivery Address
                  </p>
                  <p className="font-semibold text-sm text-[var(--text-color)]">
                    Your Telegram Location
                  </p>
                  <p className="text-xs mt-1 text-[var(--hint-color)]">
                    We'll contact you for exact address
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: theme.bgColor }}
                >
                  ⏱️
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium mb-1 text-[var(--hint-color)]">
                    Estimated Time
                  </p>
                  <p className="font-semibold text-sm text-[var(--text-color)]">
                    30-40 minutes
                  </p>
                  <p className="text-xs mt-1 text-[var(--hint-color)]">
                    After order confirmation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: theme.bgColor }}
                >
                  🔔
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium mb-1 text-[var(--hint-color)]">
                    Notifications
                  </p>
                  <p className="font-semibold text-sm text-[var(--text-color)]">
                    Order status updates
                  </p>
                  <p className="text-xs mt-1 text-[var(--hint-color)]">
                    You'll receive updates in Telegram
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ backgroundColor: theme.linkColor + "10" }}
        >
          <span className="text-lg flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-xs leading-relaxed text-[var(--text-color)]">
            By placing this order, you agree to our terms of service and privacy
            policy. You can cancel within 5 minutes after confirmation.
          </p>
        </motion.div>
      </div>

      {/* Confirm Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 px-5 py-4 backdrop-blur-xl border-t"
        style={{
          backgroundColor: theme.bgColor + "f5",
          borderColor: theme.hintColor + "20",
        }}
      >
        <Button
          size="lg"
          className="w-full relative overflow-hidden"
          onClick={handleConfirm}
          icon="✓"
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ backgroundSize: "200% 100%" }}
          />
          <span className="relative z-10">
            Confirm & Pay ${finalTotal.toFixed(2)}
          </span>
        </Button>
      </motion.div>
    </PageLayout>
  );
};
