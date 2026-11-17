import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type FABSize = "sm" | "default" | "lg";

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FABSize;
  icon: React.ReactNode;
}

const sizeStyles: Record<FABSize, string> = {
  sm: "size-12",
  default: "size-14",
  lg: "size-16",
};

const FAB = forwardRef<HTMLButtonElement, FABProps>(function FAB(
  { className, size = "default", icon, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary-500 text-white transition-all",
        "shadow-[0_4px_16px_rgba(240,112,32,0.3)]",
        "hover:bg-primary-600 hover:shadow-[0_8px_24px_rgba(240,112,32,0.4)]",
        "active:bg-primary-700 active:shadow-[0_2px_8px_rgba(240,112,32,0.2)]",
        "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none",
        "disabled:bg-neutral-200 disabled:text-neutral-400 disabled:shadow-none disabled:cursor-not-allowed",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span className="shrink-0 size-6 flex items-center justify-center">{icon}</span>
    </button>
  );
});

export { FAB, type FABProps };
