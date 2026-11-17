"use client";

import { createContext, useContext, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface SegmentedControlContextValue {
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

function SegmentedControl({ value, onChange, className, children, ...props }: SegmentedControlProps) {
  return (
    <SegmentedControlContext.Provider value={{ value, onChange }}>
      <div
        role="tablist"
        className={cn("inline-flex bg-neutral-100 rounded-lg p-1 gap-1", className)}
        {...props}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
}

interface SegmentItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

function SegmentItem({ value, disabled, className, children, ...props }: SegmentItemProps) {
  const ctx = useContext(SegmentedControlContext);
  if (!ctx) throw new Error("SegmentItem must be used within SegmentedControl");

  const selected = ctx.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={() => ctx.onChange(value)}
      className={cn(
        "px-4 py-1.5 rounded-md text-sm font-semibold leading-[1.5] transition-all select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        selected
          ? "bg-white text-neutral-900 shadow-sm"
          : "bg-transparent text-neutral-600 hover:text-neutral-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { SegmentedControl, SegmentItem };
