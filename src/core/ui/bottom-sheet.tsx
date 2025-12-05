import * as React from "react";

import { useTheme } from "@core/providers";
import { motion, AnimatePresence } from "framer-motion";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const theme = useTheme();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: theme.bgColor }}
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3">
              <div
                className="w-12 h-1.5 rounded-full"
                style={{ backgroundColor: theme.hintColor + "40" }}
              />
            </div>

            {/* Content */}
            <div className="pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

