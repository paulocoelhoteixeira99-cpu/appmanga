import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
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
          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3 rounded-lg border text-base leading-[1.5] text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors",
              !hasError &&
                !disabled &&
                "border-neutral-400 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600",
              hasError &&
                !disabled &&
                "border-error-500 bg-white focus:ring-2 focus:ring-error-500",
              disabled &&
                "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed",
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
TextField.displayName = "TextField";

export { TextField, type TextFieldProps };
