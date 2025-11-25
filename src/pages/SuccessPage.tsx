import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegramTheme } from '../hooks/useTelegramTheme';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const theme = useTelegramTheme();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ backgroundColor: theme.buttonColor }}
        ></motion.div>
      </div>

      <div className="text-center relative z-10 max-w-md w-full">
        {/* Success Icon with Confetti */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200,
            damping: 15 
          }}
          className="relative mb-6"
        >
          {/* Main Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{ 
              duration: 0.6,
              delay: 0.3 
            }}
            className="text-8xl mb-4 inline-block"
          >
            ✅
          </motion.div>
          
          {/* Confetti effect */}
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.2, 0],
                x: [0, (Math.random() - 0.5) * 300],
                y: [0, (Math.random() - 0.5) * 300],
                opacity: [1, 1, 0],
                rotate: [0, Math.random() * 360]
              }}
              transition={{
                duration: 1.2,
                delay: 0.2 + i * 0.04,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2 text-2xl pointer-events-none"
              style={{
                transform: 'translate(-50%, -50%)'
              }}
            >
              {['🎉', '🎊', '✨', '⭐', '🌟', '💫'][i % 6]}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.textColor }}>
            Order Confirmed!
          </h1>
          <p className="text-base" style={{ color: theme.hintColor }}>
            Thank you for your order
          </p>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 mb-6"
        >
          <div 
            className="p-4 rounded-2xl relative overflow-hidden"
            style={{ backgroundColor: theme.secondaryBgColor }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-teal-500/50"></div>
            
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: theme.bgColor }}
              >
                ⏱️
              </motion.div>
              <div className="flex-1 text-left">
                <p className="font-bold text-sm" style={{ color: theme.textColor }}>
                  Preparing your order
                </p>
                <p className="text-xs" style={{ color: theme.hintColor }}>
                  Estimated time: 30-40 minutes
                </p>
              </div>
            </div>
          </div>

          <div 
            className="p-4 rounded-2xl relative overflow-hidden"
            style={{ backgroundColor: theme.secondaryBgColor }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50"></div>
            
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: theme.bgColor }}
              >
                📍
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-sm" style={{ color: theme.textColor }}>
                  Delivery to your location
                </p>
                <p className="text-xs" style={{ color: theme.hintColor }}>
                  We'll notify you when it's on the way
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          style={{ 
            backgroundColor: theme.bgColor,
            color: theme.hintColor 
          }}
        >
          <span>Returning to menu in</span>
          <motion.span 
            key={countdown}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="font-bold"
            style={{ color: theme.linkColor }}
          >
            {countdown}s
          </motion.span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 3, ease: "linear" }}
          className="mt-6 h-1 rounded-full mx-auto"
          style={{ 
            width: '80%',
            backgroundColor: theme.buttonColor + '30',
            transformOrigin: 'left'
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-full rounded-full"
            style={{ 
              backgroundColor: theme.buttonColor,
              transformOrigin: 'left'
            }}
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
