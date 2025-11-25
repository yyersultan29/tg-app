import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types/types';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartPage = ({ items, onUpdateQuantity, onRemove }: CartPageProps) => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-32"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 px-4 py-4 pb-3"
        style={{ backgroundColor: theme.bgColor }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: theme.textColor }}
          >
            ←
          </motion.button>
          <h1 className="text-2xl font-bold" style={{ color: theme.textColor }}>
            Your Cart
          </h1>
        </div>
      </motion.div>

      {/* Cart Items */}
      <div className="px-4">
        {items.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20"
          >
            <motion.div 
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="text-8xl mb-6"
            >
              🛒
            </motion.div>
            <p className="text-2xl font-medium mb-2" style={{ color: theme.hintColor }}>
              Your cart is empty
            </p>
            <p className="text-lg" style={{ color: theme.hintColor, opacity: 0.7 }}>
              Add some delicious items!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="mt-8 px-8 py-4 rounded-2xl font-bold text-lg"
              style={{ 
                backgroundColor: theme.buttonColor,
                color: theme.buttonTextColor 
              }}
            >
              Browse Menu
            </motion.button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, height: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-3 rounded-xl p-3 shadow-md"
                  style={{ backgroundColor: theme.secondaryBgColor }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-4xl"
                      >
                        {item.emoji}
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-bold text-base" style={{ color: theme.textColor }}>
                          {item.name}
                        </div>
                        <div className="text-base font-semibold" style={{ color: theme.linkColor }}>
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 rounded-lg font-bold text-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: theme.bgColor,
                          color: theme.textColor 
                        }}
                      >
                        −
                      </motion.button>
                      <motion.span 
                        key={item.quantity}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        className="font-bold text-lg w-8 text-center"
                        style={{ color: theme.textColor }}
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg font-bold text-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: theme.buttonColor,
                          color: theme.buttonTextColor 
                        }}
                      >
                        +
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onRemove(item.id)}
                        className="ml-1 text-xl"
                      >
                        🗑️
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Total Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="fixed bottom-4 left-4 right-4 p-4 rounded-2xl shadow-2xl"
              style={{ backgroundColor: theme.secondaryBgColor }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold" style={{ color: theme.textColor }}>
                  Total:
                </span>
                <motion.span 
                  key={total}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold"
                  style={{ color: theme.linkColor }}
                >
                  ${total.toFixed(2)}
                </motion.span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-xl font-bold text-base shadow-lg"
                style={{ 
                  backgroundColor: theme.buttonColor,
                  color: theme.buttonTextColor 
                }}
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

