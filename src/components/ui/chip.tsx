import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type ChipVariant = "filter" | "input";
type ChipSize = "sm" | "md";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  onRemove?: () => void;
}

const sizeStyles: Record<ChipSize, string> = {
  sm: "h-7 px-2.5 text-xs gap-1.5",
  md: "h-8 px-3 text-sm gap-2",
};

const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { className, variant = "filter", size = "md", selected = false, onRemove, disabled, children, onClick, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center rounded-full font-medium leading-[1.5] border transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles[size],
        selected
          ? "bg-primary-50 border-primary-500 text-primary-700 hover:bg-primary-100"
          : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {variant === "filter" && selected && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )}
      <span className="truncate">{children}</span>
      {variant === "input" && onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="shrink-0 size-4 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors"
          aria-label="Remover"
          disabled={disabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </button>
  );
});

export { Chip, type ChipProps };
