import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";

interface AccountCardProps {
  className?: string;
  variant?: "default" | "elevated";
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
  initials,
  title,
  accountType,
  value,
  supportingText,
  onClick,
}: AccountCardProps) {
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
        "relative flex flex-col gap-3 p-6 rounded-xl bg-white border border-neutral-200",
        variant === "elevated" && "shadow-sm border-0",
        onClick &&
          "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
        className
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar size="sm" shape="rounded" initials={initials} />
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-base font-semibold leading-[1.5] text-neutral-900 truncate">
            {title}
          </p>
          {accountType && (
            <p className="text-sm leading-[1.5] text-neutral-500 truncate">
              {accountType}
            </p>
          )}
        </div>
      </div>
      <p className="text-2xl font-semibold leading-[1.2] tracking-tight text-neutral-900">
        {value}
      </p>
      {supportingText && (
        <p className="text-sm leading-[1.5] text-neutral-500">{supportingText}</p>
      )}
    </div>
  );
}

export { AccountCard, type AccountCardProps };
