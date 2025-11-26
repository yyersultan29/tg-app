import { motion } from "framer-motion";
import type { MenuEntity } from "@/features/menu/entities";
import { Card, Button, Badge } from "@core/ui";
import { useCart } from "@core/providers";

interface MenuItemCardProps {
  item: MenuEntity;
  onClick: () => void;
}

export const MenuItemCard = ({ item, onClick }: MenuItemCardProps) => {
  const { cart } = useCart();

  // Проверяем есть ли товар в корзине
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleClick = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    onClick();
  };

  return (
    <Card
      gradient="orange"
      padding="sm"
      className="flex flex-col items-center cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-6xl mb-2 mt-1"
      >
        {item.emoji}
      </motion.div>

      <div className="text-center mb-3 w-full">
        <div className="font-bold text-base mb-1 text-[var(--text-color)]">
          {item.name}
        </div>
        <div className="text-xl font-extrabold text-[var(--link-color)]">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {quantity > 0 && (
        <Badge variant="accent" className="mb-2 bg-purple-600 text-white">
          {quantity} in cart
        </Badge>
      )}

      <Button
        size="sm"
        className="w-full uppercase"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {quantity === 0 ? "ADD" : "VIEW"}
      </Button>
    </Card>
  );
};
