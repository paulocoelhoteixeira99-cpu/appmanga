import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md";
type BadgeVariant = "soft" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
  variant?: BadgeVariant;
}

const softStyles: Record<BadgeTone, string> = {
  neutral: "bg-neutral-200 text-neutral-700",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-error-50 text-error-700",
  info: "bg-blue-50 text-blue-800",
};

const outlineStyles: Record<BadgeTone, string> = {
  neutral: "border border-neutral-300 text-neutral-700 bg-transparent",
  success: "border border-success-500 text-success-700 bg-transparent",
  warning: "border border-warning-500 text-warning-700 bg-transparent",
  danger: "border border-error-500 text-error-700 bg-transparent",
  info: "border border-blue-500 text-blue-800 bg-transparent",
};

function Badge({
  className,
  tone = "neutral",
  size = "sm",
  variant = "soft",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold leading-[1.5] text-xs whitespace-nowrap",
        size === "sm" && "h-6 px-2",
        size === "md" && "h-7 px-3",
        variant === "soft" ? softStyles[tone] : outlineStyles[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps };
