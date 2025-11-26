import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--button-color)] text-[var(--button-text-color)] shadow hover:opacity-90",
        secondary: "bg-[var(--secondary-bg)] text-[var(--text-color)] shadow-sm hover:opacity-80",
        ghost: "hover:bg-white/10",
        outline: "border border-[var(--hint-color)]/40 hover:bg-white/5",
        link: "text-[var(--link-color)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

