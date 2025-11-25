import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();

  useEffect(() => {
    // Haptic feedback
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: theme.bgColor }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200,
            damping: 15 
          }}
          className="relative"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ 
              duration: 0.5,
              delay: 0.3 
            }}
            className="text-9xl mb-6"
          >
            ✅
          </motion.div>
          
          {/* Confetti effect */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
              }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.05,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2 text-3xl"
              style={{
                transform: 'translate(-50%, -50%)'
              }}
            >
              {['🎉', '🎊', '✨', '⭐'][i % 4]}
            </motion.div>
          ))}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold mb-4"
          style={{ color: theme.textColor }}
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl mb-8"
          style={{ color: theme.hintColor }}
        >
          Thank you for your order
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
          style={{ 
            backgroundColor: theme.secondaryBgColor,
            color: theme.hintColor 
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            ⏱️
          </motion.div>
          <span className="font-medium">Preparing your order...</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm"
          style={{ color: theme.hintColor }}
        >
          Redirecting to menu...
        </motion.div>
      </div>
    </motion.div>
  );
};

