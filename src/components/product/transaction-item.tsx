import { cn } from "@/lib/utils/cn";

type TransactionType = "income" | "expense" | "transfer";
type TransactionSize = "default" | "compact";
type TransactionStyle = "default" | "surface";

interface TransactionItemProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value: string;
  type?: TransactionType;
  size?: TransactionSize;
  itemStyle?: TransactionStyle;
  onClick?: () => void;
}

const valueColor: Record<TransactionType, string> = {
  income: "text-success-500",
  expense: "text-error-500",
  transfer: "text-neutral-900",
};

const valuePrefix: Record<TransactionType, string> = {
  income: "+ ",
  expense: "- ",
  transfer: "",
};

function TransactionItem({
  className,
  icon,
  title,
  subtitle,
  value,
  type = "expense",
  size = "default",
  itemStyle = "default",
  onClick,
}: TransactionItemProps) {
  const isCompact = size === "compact";

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
        "flex items-center gap-3 rounded-lg",
        isCompact ? "min-h-[48px] px-3 py-2" : "min-h-[64px] px-4 py-3",
        itemStyle === "surface" && "bg-neutral-50",
        onClick &&
          "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset",
        className
      )}
    >
      {icon && <div className="shrink-0 size-6 text-neutral-500">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold leading-[1.5] text-neutral-900 truncate">
          {title}
        </p>
        {subtitle && (
          <p
            className={cn(
              "leading-[1.5] text-neutral-500 truncate",
              isCompact ? "text-xs" : "text-sm"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      <span
        className={cn(
          "text-base font-semibold leading-[1.5] whitespace-nowrap",
          valueColor[type]
        )}
      >
        {valuePrefix[type]}
        {value}
      </span>
    </div>
  );
}

export {
  TransactionItem,
  type TransactionItemProps,
  type TransactionSize,
  type TransactionStyle,
};
