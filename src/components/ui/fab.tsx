import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type FABSize = "sm" | "default" | "lg";

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FABSize;
  icon: React.ReactNode;
  label?: string;
}

const sizeStyles: Record<FABSize, string> = {
  sm: "size-10",
  default: "size-14",
  lg: "size-16",
};

const FAB = forwardRef<HTMLButtonElement, FABProps>(function FAB(
  { className, size = "default", icon, label, disabled, ...props },
  ref
) {
  const isExtended = !!label;

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center bg-primary-500 text-white rounded-2xl shadow-[0px_4px_16px_rgba(26,16,48,0.1)] transition-all",
        "hover:bg-primary-600 hover:shadow-[0px_8px_32px_rgba(26,16,48,0.14)]",
        "active:bg-primary-700",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isExtended ? "h-14 px-6 gap-2" : sizeStyles[size],
        className
      )}
      {...props}
    >
      <span className="shrink-0 size-6 flex items-center justify-center">{icon}</span>
      {label && <span className="text-sm font-semibold leading-[1.5]">{label}</span>}
    </button>
  );
});

export { FAB, type FABProps };
