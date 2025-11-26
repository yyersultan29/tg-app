import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-2xl relative overflow-hidden shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-[var(--secondary-bg)]",
        bordered: "bg-[var(--secondary-bg)] border border-[var(--hint-color)]/20",
        elevated: "bg-[var(--secondary-bg)] shadow-xl",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

const gradients = {
  orange: "from-orange-500 via-red-500 to-pink-500",
  green: "from-emerald-500 via-green-500 to-teal-500",
  blue: "from-blue-500 via-indigo-500 to-purple-500",
  pink: "from-pink-500 via-rose-500 to-red-500",
  purple: "from-purple-500 via-violet-500 to-indigo-500",
};

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  gradient?: keyof typeof gradients;
  hover?: boolean;
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, gradient, hover, children, ...props }, ref) => {
    const Component = hover ? motion.div : "div";
    
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...(hover ? {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        } : {})}
        {...props}
      >
        {gradient && (
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[gradient]} rounded-t-2xl`} />
        )}
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm opacity-70", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

