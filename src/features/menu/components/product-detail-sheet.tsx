import { motion } from "framer-motion";
import type { MenuEntity } from "@/features/menu/entities";
import { BottomSheet, Button, Badge } from "@core/ui";
import { useCart, useTheme } from "@core/providers";

interface ProductDetailSheetProps {
  product: MenuEntity | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailSheet = ({
  product,
  isOpen,
  onClose,
}: ProductDetailSheetProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const theme = useTheme();

  if (!product) return null;

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("medium");
    addToCart(product);
  };

  const handleIncrease = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    updateQuantity(product.id, Math.max(0, quantity - 1));
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-5">
        {/* Product Image/Emoji */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-40 h-40 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center shadow-2xl"
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="text-8xl"
            >
              {product.emoji}
            </motion.span>
          </motion.div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-[var(--text-color)]">
                {product.name}
              </h2>
              <p className="text-3xl font-extrabold text-[var(--link-color)]">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <Badge variant="accent" icon="🔥" className="mt-1">
              Popular
            </Badge>
          </div>

          <p className="text-sm leading-relaxed text-[var(--hint-color)] mb-4">
            {product.description}
          </p>

          {/* Category Badge */}
          <div className="flex gap-2">
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
            {product.price < 3 && (
              <Badge variant="success" icon="💰">
                Great Value
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Add to Cart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t pt-5"
          style={{ borderColor: `${theme.hintColor}20` }}
        >
          {quantity === 0 ? (
            <Button size="lg" className="w-full" onClick={handleAdd} icon="🛒">
              Add to Cart
            </Button>
          ) : (
            <div className="space-y-3">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary-bg)]">
                <span className="text-sm font-medium text-[var(--text-color)]">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-9 h-9"
                    onClick={handleDecrease}
                  >
                    −
                  </Button>

                  <div className="px-4 py-2 rounded-lg min-w-[3rem] text-center bg-[var(--bg-color)]">
                    <motion.span
                      key={quantity}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="font-bold text-lg text-[var(--text-color)]"
                    >
                      {quantity}
                    </motion.span>
                  </div>

                  <Button
                    size="sm"
                    className="w-9 h-9"
                    onClick={handleIncrease}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Total & Add More */}
              <div className="flex items-center gap-3">
                <div className="flex-1 p-4 rounded-xl bg-[var(--secondary-bg)]">
                  <p className="text-xs text-[var(--hint-color)] mb-1">
                    Subtotal
                  </p>
                  <p className="text-xl font-bold text-[var(--link-color)]">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-full px-6"
                  onClick={onClose}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </BottomSheet>
  );
};
