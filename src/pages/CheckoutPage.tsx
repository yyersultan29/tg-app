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
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    onConfirm();
    navigate('/success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-24"
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
            onClick={() => navigate('/cart')}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            style={{ color: theme.textColor }}
          >
            <span className="text-xl">←</span>
          </motion.button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: theme.textColor }}>
              Checkout
            </h1>
            <p className="text-xs" style={{ color: theme.hintColor }}>
              Review your order
            </p>
          </div>
        </div>
      </motion.div>

      <div className="px-5 py-5 space-y-4">
        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-t-2xl"></div>
          
          <div className="flex items-center justify-between mb-5 mt-1">
            <h2 className="text-base font-bold flex items-center gap-2" style={{ color: theme.textColor }}>
              <span>📦</span>
              <span>Your Order</span>
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ 
                backgroundColor: theme.linkColor + '20',
                color: theme.linkColor 
              }}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="flex items-center justify-between py-3 px-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.span 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-3xl"
                  >
                    {item.emoji}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: theme.textColor }}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium" style={{ color: theme.linkColor }}>
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs" style={{ color: theme.hintColor }}>
                        × {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-sm ml-2" style={{ color: theme.textColor }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-t-2xl"></div>
          
          <h2 className="text-base font-bold mb-5 mt-1 flex items-center gap-2" style={{ color: theme.textColor }}>
            <span>💰</span>
            <span>Payment Summary</span>
          </h2>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm py-2.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors">
              <span style={{ color: theme.hintColor }}>Subtotal</span>
              <span className="font-semibold" style={{ color: theme.textColor }}>
                ${total.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm py-2.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-1.5">
                <span style={{ color: theme.hintColor }}>Tax</span>
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ 
                  backgroundColor: theme.bgColor,
                  color: theme.hintColor 
                }}>
                  10%
                </span>
              </div>
              <span className="font-semibold" style={{ color: theme.textColor }}>
                ${tax.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm py-2.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-1.5">
                <span style={{ color: theme.hintColor }}>Delivery Fee</span>
                <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ 
                  backgroundColor: theme.linkColor + '20',
                  color: theme.linkColor 
                }}>
                  🚚 Fast
                </span>
              </div>
              <span className="font-semibold" style={{ color: theme.textColor }}>
                ${delivery.toFixed(2)}
              </span>
            </div>
            
            <div className="border-t pt-4 mt-3" style={{ borderColor: theme.hintColor + '20' }}>
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="flex justify-between items-center py-3 px-3 rounded-xl"
                style={{ backgroundColor: theme.linkColor + '10' }}
              >
                <span className="font-bold text-base" style={{ color: theme.textColor }}>
                  Total Amount
                </span>
                <span className="font-bold text-2xl" style={{ color: theme.linkColor }}>
                  ${finalTotal.toFixed(2)}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-2xl"></div>
          
          <h2 className="text-base font-bold mb-5 mt-1 flex items-center gap-2" style={{ color: theme.textColor }}>
            <span>💳</span>
            <span>Payment Method</span>
          </h2>
          
          <div className="space-y-3">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="p-4 rounded-xl border-2 cursor-pointer relative overflow-hidden"
              style={{ 
                backgroundColor: theme.bgColor,
                borderColor: theme.buttonColor 
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                     style={{ backgroundColor: theme.buttonColor + '20' }}>
                  💎
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: theme.textColor }}>
                    Telegram Payment
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: theme.hintColor }}>
                    Fast & secure payment
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" 
                     style={{ borderColor: theme.buttonColor }}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: theme.buttonColor }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
            
            <div 
              className="p-4 rounded-xl opacity-50 relative"
              style={{ backgroundColor: theme.bgColor }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                     style={{ backgroundColor: theme.hintColor + '15' }}>
                  💵
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: theme.textColor }}>
                    Cash on Delivery
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: theme.hintColor }}>
                    Available soon
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{ 
                  backgroundColor: theme.hintColor + '20',
                  color: theme.hintColor 
                }}>
                  Soon
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: theme.secondaryBgColor }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-t-2xl"></div>
          
          <h2 className="text-base font-bold mb-5 mt-1 flex items-center gap-2" style={{ color: theme.textColor }}>
            <span>🚚</span>
            <span>Delivery Details</span>
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                   style={{ backgroundColor: theme.bgColor }}>
                📍
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-1" style={{ color: theme.hintColor }}>
                  Delivery Address
                </p>
                <p className="font-semibold text-sm" style={{ color: theme.textColor }}>
                  Your Telegram Location
                </p>
                <p className="text-xs mt-1" style={{ color: theme.hintColor }}>
                  We'll contact you for exact address
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                   style={{ backgroundColor: theme.bgColor }}>
                ⏱️
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-1" style={{ color: theme.hintColor }}>
                  Estimated Time
                </p>
                <p className="font-semibold text-sm" style={{ color: theme.textColor }}>
                  30-40 minutes
                </p>
                <p className="text-xs mt-1" style={{ color: theme.hintColor }}>
                  After order confirmation
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                   style={{ backgroundColor: theme.bgColor }}>
                🔔
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-1" style={{ color: theme.hintColor }}>
                  Notifications
                </p>
                <p className="font-semibold text-sm" style={{ color: theme.textColor }}>
                  Order status updates
                </p>
                <p className="text-xs mt-1" style={{ color: theme.hintColor }}>
                  You'll receive updates in Telegram
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ backgroundColor: theme.linkColor + '10' }}
        >
          <span className="text-lg flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-xs leading-relaxed" style={{ color: theme.textColor }}>
            By placing this order, you agree to our terms of service and privacy policy. 
            You can cancel within 5 minutes after confirmation.
          </p>
        </motion.div>
      </div>

      {/* Confirm Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 px-5 py-4 backdrop-blur-xl border-t"
        style={{ 
          backgroundColor: theme.bgColor + 'f5',
          borderColor: theme.hintColor + '20'
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl font-bold text-base shadow-xl relative overflow-hidden"
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
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ backgroundSize: '200% 100%' }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>✓</span>
            <span>Confirm & Pay ${finalTotal.toFixed(2)}</span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
