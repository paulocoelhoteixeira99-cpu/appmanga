import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type GoalCardSize = "default" | "compact" | "featured";

interface GoalCardProps {
  className?: string;
  variant?: "default" | "elevated";
  size?: GoalCardSize;
  initials?: string;
  title: string;
  value: string;
  target: string;
  percentage: number;
  status?: string;
  supportingText?: string;
  onClick?: () => void;
}

const goalSizeClasses: Record<
  GoalCardSize,
  { container: string; avatarSize: "sm" | "md"; value: string; target: string; bar: string; percentage: string }
> = {
  compact: {
    container: "p-3",
    avatarSize: "sm",
    value: "text-base",
    target: "text-xs",
    bar: "h-1.5",
    percentage: "text-xs",
  },
  default: {
    container: "p-5",
    avatarSize: "sm",
    value: "text-2xl",
    target: "text-sm",
    bar: "h-2",
    percentage: "text-sm",
  },
  featured: {
    container: "p-6",
    avatarSize: "md",
    value: "text-3xl",
    target: "text-sm",
    bar: "h-3",
    percentage: "text-sm",
  },
};

function GoalCard({
  className,
  variant = "default",
  size = "default",
  initials,
  title,
  value,
  target,
  percentage,
  status,
  supportingText,
  onClick,
}: GoalCardProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const sizes = goalSizeClasses[size];

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "relative flex flex-col gap-3 rounded-xl bg-[var(--color-surface-default)] border border-neutral-200",
        sizes.container,
        variant === "elevated" && "shadow-sm border-0",
        onClick &&
          "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
        className
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar size={sizes.avatarSize} shape="rounded" initials={initials} />
        <p className="flex-1 text-base font-semibold leading-[1.5] text-neutral-900 truncate">
          {title}
        </p>
      </div>

      <p
        className={cn(
          "font-semibold leading-[1.2] tracking-tight text-neutral-900",
          sizes.value
        )}
      >
        {value}
      </p>

      <p className={cn("leading-[1.5] text-neutral-500", sizes.target)}>{target}</p>

      {/* Progress bar */}
      <div className={cn("w-full rounded-full bg-neutral-200 overflow-hidden", sizes.bar)}>
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-300 ease-out"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      <p className={cn("font-semibold leading-[1.5] text-neutral-900", sizes.percentage)}>
        {percentage}%
      </p>

      {status && <Badge tone="neutral">{status}</Badge>}

      {supportingText && (
        <p className="text-sm leading-[1.5] text-neutral-500">{supportingText}</p>
      )}
    </div>
  );
}

export { GoalCard, type GoalCardProps, type GoalCardSize };
