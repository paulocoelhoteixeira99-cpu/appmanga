"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { Calendar } from "@/components/ui/calendar";

type DatePickerSize = "sm" | "md" | "lg";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  size?: DatePickerSize;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
}

const sizeStyles: Record<DatePickerSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function DatePicker({
  value,
  onChange,
  size = "md",
  placeholder = "dd/mm/aaaa",
  error,
  disabled,
  label,
  helperText,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  function handleSelect(date: Date) {
    onChange?.(date);
    setOpen(false);
  }

  const hasError = !!error;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full inline-flex items-center gap-2 rounded-lg border bg-[var(--color-surface-default)] transition-colors text-left",
          "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none",
          "disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed",
          sizeStyles[size],
          hasError
            ? "border-error-500"
            : open
              ? "border-primary-500 ring-2 ring-primary-500/20"
              : "border-neutral-300 hover:border-neutral-400"
        )}
      >
        <span className={cn("flex-1 truncate", !value && "text-neutral-400")}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-neutral-400">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
        </svg>
      </button>

      {(error || helperText) && (
        <p className={cn("mt-1 text-xs", hasError ? "text-error-500" : "text-neutral-500")}>
          {error || helperText}
        </p>
      )}

      {open && (
        <div className="absolute z-50 mt-1 p-3 bg-[var(--color-surface-default)] rounded-xl border border-neutral-200 shadow-md">
          <Calendar value={value} onChange={handleSelect} />
        </div>
      )}
    </div>
  );
}

export { DatePicker, type DatePickerProps };
