import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
  secondary:
    "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
  tertiary:
    "bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
  destructive:
    "bg-error-500 text-white hover:bg-error-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: "size-8 p-0",
  md: "size-10 p-0",
  lg: "size-12 p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    loading = false,
    iconOnly = false,
    disabled,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold leading-[1.5] transition-colors outline-none select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        iconOnly ? iconOnlySizes[size] : sizeStyles[size],
        loading && "relative",
        className
      )}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
      <span className={cn(loading && "invisible")}>{children}</span>
    </button>
  );
});

export { Button, type ButtonProps };
