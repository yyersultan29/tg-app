import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types/types';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

interface CheckoutPageProps {
  items: CartItem[];
  onConfirm: () => void;
}

export const CheckoutPage = ({ items, onConfirm }: CheckoutPageProps) => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1;
  const delivery = 2.99;
  const finalTotal = total + tax + delivery;

  const handleConfirm = () => {
    // Haptic feedback if available
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    onConfirm();
    navigate('/success');
  };

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
            onClick={() => navigate('/cart')}
            className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: theme.textColor }}
          >
            ←
          </motion.button>
          <h1 className="text-2xl font-bold" style={{ color: theme.textColor }}>
            Checkout
          </h1>
        </div>
      </motion.div>

      <div className="px-4 space-y-4">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl p-4 shadow-lg"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: theme.textColor }}>
            Order Summary
          </h2>
          <div className="space-y-2 mb-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <span className="font-medium text-sm" style={{ color: theme.textColor }}>
                      {item.name}
                    </span>
                    <span className="ml-1 text-sm" style={{ color: theme.hintColor }}>
                      × {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-base" style={{ color: theme.textColor }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="border-t pt-3 space-y-1.5 text-sm" style={{ borderColor: theme.hintColor + '40' }}>
            <div className="flex justify-between" style={{ color: theme.textColor }}>
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ color: theme.textColor }}>
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ color: theme.textColor }}>
              <span>Delivery:</span>
              <span>${delivery.toFixed(2)}</span>
            </div>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex justify-between text-xl font-bold pt-1.5"
              style={{ color: theme.linkColor }}
            >
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl p-4 shadow-lg"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: theme.textColor }}>
            Payment Method
          </h2>
          <div className="space-y-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 rounded-lg border-2 cursor-pointer"
              style={{ 
                backgroundColor: theme.bgColor,
                borderColor: theme.buttonColor 
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div className="flex-1">
                  <div className="font-bold text-base" style={{ color: theme.textColor }}>
                    Telegram Payment
                  </div>
                  <div className="text-xs" style={{ color: theme.hintColor }}>
                    Pay securely with Telegram
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" 
                     style={{ borderColor: theme.buttonColor }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.buttonColor }}></div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-3 rounded-lg opacity-50"
              style={{ backgroundColor: theme.bgColor }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💵</span>
                <div>
                  <div className="font-bold text-base" style={{ color: theme.textColor }}>
                    Cash on Delivery
                  </div>
                  <div className="text-xs" style={{ color: theme.hintColor }}>
                    Coming soon
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-4 shadow-lg"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: theme.textColor }}>
            Delivery Info
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-xl">📍</span>
              <div className="flex-1">
                <div className="font-medium text-xs mb-0.5" style={{ color: theme.hintColor }}>
                  Address
                </div>
                <div className="font-bold text-sm" style={{ color: theme.textColor }}>
                  Your Telegram Location
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">⏱️</span>
              <div className="flex-1">
                <div className="font-medium text-xs mb-0.5" style={{ color: theme.hintColor }}>
                  Delivery Time
                </div>
                <div className="font-bold text-sm" style={{ color: theme.textColor }}>
                  30-40 minutes
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirm Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 left-4 right-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl font-bold text-base shadow-2xl relative overflow-hidden"
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
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ backgroundSize: '200% 100%' }}
          />
          <span className="relative z-10">
            Confirm & Pay ${finalTotal.toFixed(2)}
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

