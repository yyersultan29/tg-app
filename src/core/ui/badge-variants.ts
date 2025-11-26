import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--secondary-bg)] text-[var(--text-color)]",
        accent: "bg-[var(--link-color)]/20 text-[var(--link-color)]",
        success: "bg-green-500/20 text-green-500",
        warning: "bg-amber-500/20 text-amber-500",
        error: "bg-red-500/20 text-red-500",
        outline: "border border-[var(--hint-color)]/40 text-[var(--text-color)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

