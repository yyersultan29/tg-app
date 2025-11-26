import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@core/providers";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backPath?: string;
}

export const PageLayout = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backPath,
}: PageLayoutProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 px-5 py-3 backdrop-blur-lg"
        style={{
          margin: "0 10px",
          backgroundColor: theme.bgColor + "f0",
          borderBottom: `1px solid ${theme.hintColor}20`,
        }}
      >
        <div className="flex items-center gap-3">
          {showBackButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
              style={{ color: theme.textColor }}
            >
              <span className="text-xl">←</span>
            </motion.button>
          )}
          <div className="flex-1">
            <h1
              className="text-lg font-bold"
              style={{ color: theme.textColor }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs" style={{ color: theme.hintColor }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      {children}
    </motion.div>
  );
};
