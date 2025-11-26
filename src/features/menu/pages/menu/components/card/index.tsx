import { motion } from "framer-motion";
import type { MenuEntity } from "@/features/menu/entities";
import { Card } from "@core/ui";
import { Button } from "@core/ui";

interface MenuItemCardProps {
  item: MenuEntity;
  onAdd: (item: MenuEntity) => void;
}

export const MenuItemCard = ({ item, onAdd }: MenuItemCardProps) => {
  const handleAdd = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
    onAdd(item);
  };

  return (
    <Card gradient="orange" padding="sm" className="flex flex-col items-center">
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

      <Button size="sm" className="w-full uppercase" onClick={handleAdd}>
        ADD
      </Button>
    </Card>
  );
};
