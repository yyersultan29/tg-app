import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
              {icon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border border-[var(--hint-color)]/20 bg-[var(--secondary-bg)] px-3 py-2 text-sm text-[var(--text-color)] placeholder:text-[var(--hint-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
              icon && "pl-10",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-[var(--hint-color)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
