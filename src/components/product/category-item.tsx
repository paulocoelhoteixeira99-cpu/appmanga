import { cn } from "@/lib/utils/cn";

interface CategoryItemProps {
  className?: string;
  icon?: React.ReactNode;
  name: string;
  subtitle?: string;
  value?: string;
  color?: string;
  budget?: number;
  spent?: number;
  onClick?: () => void;
  selected?: boolean;
}

function getBudgetBarColor(percentage: number): string {
  if (percentage >= 100) return "bg-error-500";
  if (percentage >= 80) return "bg-warning-500";
  return "bg-primary-500";
}

function CategoryItem({
  className,
  icon,
  name,
  subtitle,
  value,
  budget,
  spent,
  onClick,
  selected = false,
}: CategoryItemProps) {
  const hasBudget = budget != null && spent != null;
  const budgetPercentage = hasBudget ? Math.round((spent / budget) * 100) : 0;
  const clampedWidth = hasBudget ? Math.min(budgetPercentage, 100) : 0;

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
        "flex items-center gap-3 min-h-[64px] px-4 py-3 rounded-lg",
        onClick &&
          "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset",
        selected && "bg-primary-50",
        className
      )}
    >
      {icon && <div className="shrink-0 size-6 text-neutral-500">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold leading-[1.5] text-neutral-900 truncate">
          {name}
        </p>
        {subtitle && (
          <p className="text-sm leading-[1.5] text-neutral-500 truncate">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end shrink-0">
        {value && (
          <span className="text-base font-semibold leading-[1.5] text-neutral-900 whitespace-nowrap">
            {value}
          </span>
        )}
        {hasBudget && (
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-16 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300 ease-out",
                  getBudgetBarColor(budgetPercentage)
                )}
                style={{ width: `${clampedWidth}%` }}
              />
            </div>
            <span className="text-xs text-neutral-500 whitespace-nowrap">
              {budgetPercentage}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { CategoryItem, type CategoryItemProps };
