import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types/types';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartPage = ({ items, onUpdateQuantity }: CartPageProps) => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-28"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 px-5 py-3 backdrop-blur-lg"
        style={{ 
          backgroundColor: theme.bgColor + 'f0',
          borderBottom: `1px solid ${theme.hintColor}20`
        }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: theme.textColor }}
          >
            <span className="text-xl">←</span>
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-bold" style={{ color: theme.textColor }}>
              Cart
            </h1>
            {items.length > 0 && (
              <p className="text-xs" style={{ color: theme.hintColor }}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Cart Items */}
      <div className="px-5 py-5">
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
                repeatDelay: 2
              }}
              className="text-7xl mb-4"
            >
              🛒
            </motion.div>
            <p className="text-xl font-bold mb-1" style={{ color: theme.textColor }}>
              Your cart is empty
            </p>
            <p className="text-sm mb-6" style={{ color: theme.hintColor }}>
              Add some delicious items!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl font-semibold"
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
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-3"
                >
                  <div 
                    className="rounded-2xl p-4 relative overflow-hidden"
                    style={{ backgroundColor: theme.secondaryBgColor }}
                  >
                    {/* Subtle gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-red-500/50 to-purple-500/50 rounded-t-2xl"></div>
                    
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
                        <h3 className="font-bold text-base mb-1" style={{ color: theme.textColor }}>
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-semibold" style={{ color: theme.linkColor }}>
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-xs" style={{ color: theme.hintColor }}>
                            × {item.quantity}
                          </span>
                          <span className="text-xs ml-auto font-bold" style={{ color: theme.textColor }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-7 h-7 rounded-lg font-bold text-base flex items-center justify-center"
                            style={{ 
                              backgroundColor: theme.bgColor,
                              color: theme.textColor 
                            }}
                          >
                            −
                          </motion.button>
                          
                          <div 
                            className="px-3 py-1 rounded-lg min-w-[2.5rem] text-center"
                            style={{ 
                              backgroundColor: theme.bgColor,
                              color: theme.textColor 
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
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg font-bold text-base flex items-center justify-center"
                            style={{ 
                              backgroundColor: theme.buttonColor,
                              color: theme.buttonTextColor 
                            }}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
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
            backgroundColor: theme.secondaryBgColor + 'f5',
            borderColor: theme.hintColor + '20'
          }}
        >
          <div className="px-5 py-4">
            {/* Total row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium" style={{ color: theme.hintColor }}>
                  Total Amount
                </p>
                <motion.p 
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold"
                  style={{ color: theme.linkColor }}
                >
                  ${total.toFixed(2)}
                </motion.p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/checkout')}
                className="px-6 py-3 rounded-xl font-bold text-sm shadow-lg relative overflow-hidden"
                style={{ 
                  backgroundColor: theme.buttonColor,
                  color: theme.buttonTextColor 
                }}
              >
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ backgroundSize: '200% 100%' }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Checkout
                  <span>→</span>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
