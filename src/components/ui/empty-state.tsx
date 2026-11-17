import { cn } from "@/lib/utils/cn";

type EmptyStateSize = "default" | "compact";
type EmptyStateStyle = "neutral" | "surface";

interface EmptyStateProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: EmptyStateSize;
  emptyStateStyle?: EmptyStateStyle;
}

function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  size = "default",
  emptyStateStyle = "neutral",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "default" && "py-12 px-6",
        size === "compact" && "py-6 px-4",
        emptyStateStyle === "neutral" && "bg-transparent",
        emptyStateStyle === "surface" && "bg-neutral-50 rounded-xl",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-neutral-400">{icon}</div>
      )}
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-neutral-500 max-w-xs">{description}</p>
      )}
      {action && (
        <div className="mt-4">{action}</div>
      )}
    </div>
  );
}

export { EmptyState, type EmptyStateProps, type EmptyStateSize, type EmptyStateStyle };
