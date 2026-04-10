import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variant?: "sm" | "md" | "lg";
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  reserveErrorSpace?: boolean;
}

const variantClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

const variantSkeleton = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      startIcon,
      endIcon,
      variant = "md",
      isLoading = false,
      reserveErrorSpace = true,
      type,
      ...props
    },
    ref,
  ) => {
    if (isLoading) {
      return (
        <div className={cn("w-full space-y-1.5", className)}>
          <div
            className={cn(
              "w-full rounded-lg bg-muted animate-pulse border border-border/50",
              variantSkeleton[variant],
            )}
          />
        </div>
      );
    }

    return (
      <div className={cn("w-full space-y-1.5", className)}>
        <div
          className={cn(
            "group flex items-center gap-2 rounded-lg border bg-background transition-all duration-200",
            "focus-within:ring-2 focus-within:ring-ring/20 focus-within:ring-offset-0",
            error
              ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
              : "border-input focus-within:border-primary",
            "has-disabled:opacity-50 has-disabled:cursor-not-allowed has-disabled:bg-muted/50",
          )}
        >
          {startIcon && (
            <span className="pl-3 text-muted-foreground flex items-center justify-center">
              {startIcon}
            </span>
          )}

          <input
            type={type}
            ref={ref}
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
              variantClasses[variant],
            )}
            {...props}
          />

          {endIcon && (
            <span className="pr-3 text-muted-foreground flex items-center justify-center">
              {endIcon}
            </span>
          )}
        </div>

        {(reserveErrorSpace || error) && (
          <p
            className={cn(
              "text-[0.8rem] font-medium transition-all duration-200",
              error
                ? "text-destructive opacity-100"
                : "text-transparent opacity-0 select-none",
              !reserveErrorSpace && !error && "hidden",
            )}
          >
            {error || "placeholder"}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };