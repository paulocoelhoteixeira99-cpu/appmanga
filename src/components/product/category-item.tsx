import { cn } from "@/lib/utils/cn";

interface CategoryItemProps {
  className?: string;
  icon?: React.ReactNode;
  name: string;
  subtitle?: string;
  value?: string;
  color?: string;
  onClick?: () => void;
  selected?: boolean;
}

function CategoryItem({
  className,
  icon,
  name,
  subtitle,
  value,
  onClick,
  selected = false,
}: CategoryItemProps) {
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
      {value && (
        <span className="text-base font-semibold leading-[1.5] text-neutral-900 whitespace-nowrap">
          {value}
        </span>
      )}
    </div>
  );
}

export { CategoryItem, type CategoryItemProps };
