import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, helperText, error, required, disabled, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <div className="flex items-start gap-1">
            <label
              htmlFor={inputId}
              className="text-sm font-semibold leading-[1.5] text-neutral-900"
            >
              {label}
            </label>
            {required && (
              <span className="text-sm font-semibold leading-[1.5] text-error-700">
                *
              </span>
            )}
          </div>
        )}
        <div className="flex flex-col gap-1 w-full">
          <textarea
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            className={cn(
              "w-full min-h-[96px] p-3 rounded-lg border text-base leading-[1.5] text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors resize-y",
              !hasError &&
                !disabled &&
                "border-neutral-400 bg-[var(--color-surface-default)] focus:border-primary-500 focus:ring-2 focus:ring-primary-500",
              hasError &&
                !disabled &&
                "border-error-500 bg-[var(--color-surface-default)] focus:ring-2 focus:ring-error-500",
              disabled &&
                "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed resize-none",
              className
            )}
            {...props}
          />
          {(error || helperText) && (
            <p
              className={cn(
                "text-sm leading-[1.5]",
                hasError ? "text-error-700" : "text-neutral-500"
              )}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea, type TextAreaProps };
