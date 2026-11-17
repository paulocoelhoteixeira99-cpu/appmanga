import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";

type AccountCardSize = "default" | "compact";

interface AccountCardProps {
  className?: string;
  variant?: "default" | "elevated";
  size?: AccountCardSize;
  initials?: string;
  title: string;
  accountType?: string;
  value: string;
  supportingText?: string;
  onClick?: () => void;
}

function AccountCard({
  className,
  variant = "default",
  size = "default",
  initials,
  title,
  accountType,
  value,
  supportingText,
  onClick,
}: AccountCardProps) {
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
        "relative flex flex-col gap-3 rounded-xl bg-[var(--color-surface-default)] border border-neutral-200",
        isCompact ? "p-3" : "p-6",
        variant === "elevated" && "shadow-sm border-0",
        onClick &&
          "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar size="sm" shape="rounded" initials={initials} />
        <div className="flex-1 min-w-0 overflow-hidden">
          <p
            className={cn(
              "font-semibold leading-[1.5] text-neutral-900 truncate",
              isCompact ? "text-sm" : "text-base"
            )}
          >
            {title}
          </p>
          {accountType && (
            <p
              className={cn(
                "leading-[1.5] text-neutral-500 truncate",
                isCompact ? "text-xs" : "text-sm"
              )}
            >
              {accountType}
            </p>
          )}
        </div>
      </div>
      <p
        className={cn(
          "font-semibold leading-[1.2] tracking-tight text-neutral-900",
          isCompact ? "text-lg" : "text-2xl"
        )}
      >
        {value}
      </p>
      {supportingText && (
        <p className="text-sm leading-[1.5] text-neutral-500">{supportingText}</p>
      )}
    </div>
  );
}

export { AccountCard, type AccountCardProps, type AccountCardSize };
