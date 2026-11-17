import { cn } from "@/lib/utils/cn";

type BalanceCardStyle = "default" | "subtle" | "brand";
type BalanceCardSize = "default" | "compact" | "featured";

interface BalanceCardProps {
  className?: string;
  style?: BalanceCardStyle;
  size?: BalanceCardSize;
  icon?: React.ReactNode;
  title: string;
  value: string;
  supportingText?: string;
}

const styleMap: Record<BalanceCardStyle, string> = {
  default: "bg-[var(--color-surface-default)] border border-neutral-200",
  subtle: "bg-neutral-50 border border-neutral-200",
  brand: "bg-primary-500 border-0 text-white",
};

const sizeClasses: Record<
  BalanceCardSize,
  { container: string; iconContainer: string; iconInner: string; title: string; value: string }
> = {
  compact: {
    container: "p-3",
    iconContainer: "size-8",
    iconInner: "size-6",
    title: "text-sm",
    value: "text-lg",
  },
  default: {
    container: "p-5",
    iconContainer: "size-8",
    iconInner: "size-6",
    title: "text-base",
    value: "text-2xl",
  },
  featured: {
    container: "p-6",
    iconContainer: "size-12",
    iconInner: "size-8",
    title: "text-base",
    value: "text-3xl",
  },
};

function BalanceCard({
  className,
  style = "default",
  size = "default",
  icon,
  title,
  value,
  supportingText,
}: BalanceCardProps) {
  const isBrand = style === "brand";
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-xl",
        sizes.container,
        styleMap[style],
        className
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center rounded-lg overflow-hidden",
              sizes.iconContainer,
              isBrand ? "bg-white/20" : "bg-neutral-100"
            )}
          >
            <div className={cn(sizes.iconInner, isBrand ? "text-white" : "text-neutral-600")}>
              {icon}
            </div>
          </div>
        )}
        <p
          className={cn(
            "font-semibold leading-[1.5] truncate",
            sizes.title,
            isBrand ? "text-white" : "text-neutral-900"
          )}
        >
          {title}
        </p>
      </div>
      <p
        className={cn(
          "font-semibold leading-[1.2] tracking-tight",
          sizes.value,
          isBrand ? "text-white" : "text-neutral-900"
        )}
      >
        {value}
      </p>
      {supportingText && (
        <p
          className={cn(
            "text-sm leading-[1.5]",
            isBrand ? "text-white/70" : "text-neutral-500"
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
}

export { BalanceCard, type BalanceCardProps, type BalanceCardSize, type BalanceCardStyle };
