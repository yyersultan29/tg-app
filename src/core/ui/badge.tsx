import * as React from "react";

import { type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { badgeVariants } from "./badge-variants";

import { cn } from "@/lib/utils";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof badgeVariants> {
  icon?: string;
  onClose?: () => void;
}

function Badge({ className, variant, icon, onClose, children, ...props }: BadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="ml-1 hover:opacity-70"
          type="button"
        >
          ×
        </motion.button>
      )}
    </motion.div>
  );
}

export { Badge };

