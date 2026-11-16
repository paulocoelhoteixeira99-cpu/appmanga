import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type AlertType = "success" | "warning" | "danger" | "info";
type AlertVariant = "soft" | "outline";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

const typeStyles: Record<AlertType, { soft: string; text: string; icon: React.ReactNode }> = {
  success: {
    soft: "bg-success-50 border-success-500",
    text: "text-success-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  warning: {
    soft: "bg-warning-50 border-warning-500",
    text: "text-warning-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
    ),
  },
  danger: {
    soft: "bg-error-50 border-error-500",
    text: "text-error-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  info: {
    soft: "bg-blue-50 border-blue-500",
    text: "text-blue-800",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
};

const outlineAlertStyles: Record<AlertType, string> = {
  success: "bg-transparent border-success-500",
  warning: "bg-transparent border-warning-500",
  danger: "bg-transparent border-error-500",
  info: "bg-transparent border-blue-500",
};

function Alert({
  className,
  type = "info",
  variant = "soft",
  title,
  onClose,
  children,
  ...props
}: AlertProps) {
  const styles = typeStyles[type];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 items-start p-4 rounded-lg border",
        variant === "soft" ? styles.soft : outlineAlertStyles[type],
        styles.text,
        className
      )}
      {...props}
    >
      {styles.icon}
      <div className="flex-1 min-w-0 flex flex-col gap-1 text-sm leading-[1.5]">
        {title && (
          <p className="font-semibold">{title}</p>
        )}
        <div className="font-normal">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 size-5 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Alert, type AlertProps };
