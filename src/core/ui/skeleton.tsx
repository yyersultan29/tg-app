import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: "text" | "rect" | "circle";
}

function Skeleton({ className, variant = "rect", ...props }: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    rect: "rounded-xl",
    circle: "rounded-full",
  };

  return (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "bg-[var(--hint-color)]/20",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

