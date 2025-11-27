import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme, useCart } from "@core/providers";
import { PageLayout } from "@core/layouts";
import { Card, Button } from "@core/ui";
import { ConfirmBtn } from "./components";

export const CartPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cart: items, updateQuantity } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const subtitle =
    items.length > 0
      ? `${items.length} ${items.length === 1 ? "item" : "items"}`
      : undefined;

  return (
    <PageLayout title="Cart" subtitle={subtitle} showBackButton backPath="/">
      <div className="px-5 py-5 pb-28">
        {items.length === 0 ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="text-7xl mb-4"
            >
              🛒
            </motion.div>
            <p
              className="text-xl font-bold mb-1"
              style={{ color: theme.textColor }}
            >
              Your cart is empty
            </p>
            <p className="text-sm mb-6" style={{ color: theme.hintColor }}>
              Add some delicious items!
            </p>
            <Button onClick={() => navigate("/")} size="md">
              Browse Menu
            </Button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-3"
                >
                  <Card gradient="purple" padding="md">
                    <div className="flex items-start gap-4 mt-1">
                      {/* Emoji */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-5xl flex-shrink-0"
                      >
                        {item.emoji}
                      </motion.div>

                      {/* Item details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base mb-1 text-[var(--text-color)]">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-semibold text-[var(--link-color)]">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-[var(--hint-color)]">
                            × {item.quantity}
                          </span>
                          <span className="text-xs ml-auto font-bold text-[var(--text-color)]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-7 h-7 p-0"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(0, item.quantity - 1)
                              )
                            }
                          >
                            −
                          </Button>

                          <div
                            className="px-3 py-1 rounded-lg min-w-[2.5rem] text-center"
                            style={{
                              backgroundColor: theme.bgColor,
                              color: theme.textColor,
                            }}
                          >
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="font-bold text-sm"
                            >
                              {item.quantity}
                            </motion.span>
                          </div>

                          <Button
                            size="sm"
                            className="w-7 h-7 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Spacer for bottom section */}
            <div className="h-6"></div>
          </>
        )}
      </div>

      {/* Bottom Total Section */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t"
          style={{
            backgroundColor: theme.secondaryBgColor + "f5",
            borderColor: theme.hintColor + "20",
          }}
        >
          <div className="px-5 py-4">
            <ConfirmBtn />
            {/* Total row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-[var(--hint-color)]">
                  Total Amount
                </p>
                <motion.p
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-[var(--link-color)]"
                >
                  ${total.toFixed(2)}
                </motion.p>
              </div>

              <Button
                size="md"
                onClick={() => navigate("/checkout")}
                className="relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Checkout
                  <span>→</span>
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </PageLayout>
  );
};
