import { useCart, useTg } from "@/core/providers";
import { Button } from "@/core/ui";
import type { MenuEntity } from "@/features/menu/entities";

import { motion } from "framer-motion";

export const CartButton = ({ item }: { item: MenuEntity }) => {
  const { tg } = useTg();
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(item);
    tg?.HapticFeedback?.notificationOccurred("success");
  };

  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity - 1);
    tg?.HapticFeedback?.notificationOccurred("success");
  };

  const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity + 1);
    tg?.HapticFeedback?.notificationOccurred("success");
  };

  if (quantity === 0) {
    return (
      <Button size="lg" className="w-full" onClick={handleAdd} icon="🛒">
        Add to Cart
      </Button>
    );
  }
  return (
    <div className="space-y-3">
      {/* Quantity Counter */}
      <div className="w-full flex items-center justify-between  rounded-xl ">
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

          <Button size="sm" className="w-9 h-9" onClick={handleIncrease}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
