import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ListItemSize = "md" | "lg";
type ListItemStyle = "default" | "surface";

interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  interactive?: boolean;
  size?: ListItemSize;
  itemStyle?: ListItemStyle;
}

function ListItem({
  className,
  leading,
  trailing,
  title,
  subtitle,
  interactive = true,
  size = "md",
  itemStyle = "default",
  onClick,
  ...props
}: ListItemProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e as never); } } : undefined}
      className={cn(
        "flex items-center gap-3 px-4",
        size === "md" && "py-3",
        size === "lg" && "py-4",
        itemStyle === "default" && "bg-transparent",
        itemStyle === "surface" && "bg-neutral-50",
        interactive && "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors",
        onClick && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-lg",
        className
      )}
      {...props}
    >
      {leading && (
        <div className="shrink-0">{leading}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-[1.5] text-neutral-900 truncate">
          {title}
        </p>
        {subtitle && (
          <p className="text-sm leading-[1.5] text-neutral-500 truncate">
            {subtitle}
          </p>
        )}
      </div>
      {trailing && (
        <div className="shrink-0">{trailing}</div>
      )}
    </div>
  );
}

function ListDivider({ className }: { className?: string }) {
  return (
    <div className={cn("h-px bg-neutral-200 mx-4", className)} />
  );
}

export { ListItem, ListDivider, type ListItemProps, type ListItemSize, type ListItemStyle };
