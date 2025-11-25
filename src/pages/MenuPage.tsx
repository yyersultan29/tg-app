import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { MenuItem, CartItem } from '../types/types';
import { MenuItemCard } from '../components/MenuItemCard';
import { menuItems } from '../data/menuData';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

interface MenuPageProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
}

export const MenuPage = ({ cart, onAddToCart }: MenuPageProps) => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div 
      className="min-h-screen pb-20"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Header with animation */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 px-4 py-6 pb-8 rounded-b-3xl shadow-2xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200,
              delay: 0.2 
            }}
            className="text-7xl mb-3 drop-shadow-2xl"
          >
            🍔
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold text-white mb-1 tracking-tight"
          >
            Burger King
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-lg opacity-95 font-medium"
          >
            Delicious food delivered fast
          </motion.p>
        </div>
      </motion.div>

      {/* Menu Grid with stagger animation */}
      <div className="px-4 py-5">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold mb-4"
          style={{ color: theme.textColor }}
        >
          Menu
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants as Variants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MenuItemCard item={item} onAdd={onAddToCart} theme={theme} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Cart Button with animation */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/cart')}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-5 rounded-2xl shadow-2xl transition-all duration-200 flex items-center justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
            <div className="flex items-center gap-3 relative z-10">
              <span className="text-2xl">🛒</span>
              <span className="text-lg">View Cart</span>
            </div>
            <div className="relative z-10 flex items-center gap-2">
              <motion.span 
                key={cartItemCount}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="bg-white text-purple-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm"
              >
                {cartItemCount}
              </motion.span>
            </div>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

