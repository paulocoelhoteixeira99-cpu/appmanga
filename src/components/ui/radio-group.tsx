"use client";

import { type InputHTMLAttributes, createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils/cn";

interface RadioGroupProps {
  className?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

interface RadioItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  label: React.ReactNode;
  description?: string;
}

const RadioGroupContext = createContext<{
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}>({ name: "" });

function RadioGroup({ className, name, value, onChange, children }: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? autoId;

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange }}>
      <div role="radiogroup" className={cn("flex flex-col gap-3", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

function RadioItem({ value, label, description, className, disabled, id, ...props }: RadioItemProps) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? autoId;
  const checked = group.value === value;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex items-start gap-3 cursor-pointer",
        disabled && "text-neutral-400 cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center justify-center pt-0.5">
        <input
          type="radio"
          id={inputId}
          name={group.name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => group.onChange?.(value)}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            "relative size-5 rounded-full border-2 transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2",
            checked
              ? "border-primary-500 bg-primary-500"
              : "border-neutral-400 bg-[var(--color-surface-default)]",
            disabled && "cursor-not-allowed"
          )}
        >
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-2 rounded-full bg-white" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold leading-[1.5] text-neutral-900">{label}</span>
        {description && (
          <span className="text-sm leading-[1.5] text-neutral-500">{description}</span>
        )}
      </div>
    </label>
  );
}

export { RadioGroup, RadioItem, type RadioGroupProps, type RadioItemProps };
