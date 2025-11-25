import { motion } from 'framer-motion';
import type { MenuItem } from '../types/types';
import type { TelegramTheme } from '../hooks/useTelegramTheme';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  theme: TelegramTheme;
}

export const MenuItemCard = ({ item, onAdd, theme }: MenuItemCardProps) => {
  const handleAdd = () => {
    // Haptic feedback
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    onAdd(item);
  };

  return (
    <div 
      className="flex flex-col items-center rounded-2xl p-3 shadow-lg relative overflow-hidden"
      style={{ backgroundColor: theme.secondaryBgColor }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500"></div>
      
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-6xl mb-2"
      >
        {item.emoji}
      </motion.div>
      
      <div className="text-center mb-3 w-full">
        <div className="font-bold text-base mb-1" style={{ color: theme.textColor }}>
          {item.name}
        </div>
        <div className="text-xl font-extrabold" style={{ color: theme.linkColor }}>
          ${item.price.toFixed(2)}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAdd}
        className="w-full font-bold py-2.5 px-4 rounded-xl transition-all duration-200 uppercase shadow-md text-sm"
        style={{ 
          backgroundColor: theme.buttonColor,
          color: theme.buttonTextColor 
        }}
      >
        ADD
      </motion.button>
    </div>
  );
};

