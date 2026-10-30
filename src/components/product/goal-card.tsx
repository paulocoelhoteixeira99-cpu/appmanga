import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface GoalCardProps {
  className?: string;
  variant?: "default" | "elevated";
  initials?: string;
  title: string;
  value: string;
  target: string;
  percentage: number;
  status?: string;
  supportingText?: string;
  onClick?: () => void;
}

function GoalCard({
  className,
  variant = "default",
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
        "relative flex flex-col gap-3 p-5 rounded-xl bg-white border border-neutral-200",
        variant === "elevated" && "shadow-sm border-0",
        onClick &&
          "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
        className
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar size="sm" shape="rounded" initials={initials} />
        <p className="flex-1 text-base font-semibold leading-[1.5] text-neutral-900 truncate">
          {title}
        </p>
      </div>

      <p className="text-2xl font-semibold leading-[1.2] tracking-tight text-neutral-900">
        {value}
      </p>

      <p className="text-sm leading-[1.5] text-neutral-500">{target}</p>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-300 ease-out"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      <p className="text-sm font-semibold leading-[1.5] text-neutral-900">
        {percentage}%
      </p>

      {status && <Badge tone="neutral">{status}</Badge>}

      {supportingText && (
        <p className="text-sm leading-[1.5] text-neutral-500">{supportingText}</p>
      )}
    </div>
  );
}

export { GoalCard, type GoalCardProps };
