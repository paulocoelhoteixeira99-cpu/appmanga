import { cn } from "@/lib/utils/cn";

type BalanceCardStyle = "default" | "subtle" | "brand";

interface BalanceCardProps {
  className?: string;
  style?: BalanceCardStyle;
  icon?: React.ReactNode;
  title: string;
  value: string;
  supportingText?: string;
}

const styleMap: Record<BalanceCardStyle, string> = {
  default: "bg-white border border-neutral-200",
  subtle: "bg-neutral-50 border border-neutral-200",
  brand: "bg-primary-500 border-0 text-white",
};

function BalanceCard({
  className,
  style = "default",
  icon,
  title,
  value,
  supportingText,
}: BalanceCardProps) {
  const isBrand = style === "brand";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 p-5 rounded-xl",
        styleMap[style],
        className
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {icon && (
          <div
            className={cn(
              "flex items-center justify-center size-8 rounded-lg overflow-hidden",
              isBrand ? "bg-white/20" : "bg-neutral-100"
            )}
          >
            <div className={cn("size-6", isBrand ? "text-white" : "text-neutral-600")}>
              {icon}
            </div>
          </div>
        )}
        <p
          className={cn(
            "text-base font-semibold leading-[1.5] truncate",
            isBrand ? "text-white" : "text-neutral-900"
          )}
        >
          {title}
        </p>
      </div>
      <p
        className={cn(
          "text-2xl font-semibold leading-[1.2] tracking-tight",
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

export { BalanceCard, type BalanceCardProps };
