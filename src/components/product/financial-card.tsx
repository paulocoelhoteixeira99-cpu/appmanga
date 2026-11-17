import { cn } from "@/lib/utils/cn";

type FinancialCardLayout = "single" | "summary";
type FinancialCardSize = "default" | "compact";
type FinancialCardState = "default" | "loading" | "error";

interface FinancialCardItem {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "neutral";
}

interface FinancialCardProps {
  layout?: FinancialCardLayout;
  size?: FinancialCardSize;
  state?: FinancialCardState;
  icon?: React.ReactNode;
  title: string;
  value?: string;
  subtitle?: string;
  items?: FinancialCardItem[];
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
}

const toneColors: Record<string, string> = {
  positive: "text-success-500",
  negative: "text-error-500",
  neutral: "text-neutral-900",
};

function FinancialCard({
  layout = "single",
  size = "default",
  state = "default",
  icon,
  title,
  value,
  subtitle,
  items,
  errorMessage,
  onRetry,
  className,
}: FinancialCardProps) {
  const isCompact = size === "compact";
  const padding = isCompact ? "p-3" : "p-4";

  if (state === "loading") {
    return (
      <div className={cn("bg-white border border-neutral-200 rounded-xl", padding, className)}>
        <div className="animate-pulse space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-neutral-200" />
            <div className="h-4 w-24 bg-neutral-200 rounded" />
          </div>
          <div className="h-8 w-32 bg-neutral-200 rounded" />
          <div className="h-3 w-20 bg-neutral-200 rounded" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={cn("bg-white border border-neutral-200 rounded-xl", padding, className)}>
        <div className="flex flex-col items-center text-center py-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-error-500 mb-2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <p className="text-sm text-neutral-600 mb-3">{errorMessage || "Erro ao carregar dados"}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border border-neutral-200 rounded-xl", padding, className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className={cn(
            "shrink-0 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center",
            isCompact ? "size-8" : "size-10"
          )}>
            {icon}
          </div>
        )}
        <span className={cn("font-semibold text-neutral-900", isCompact ? "text-sm" : "text-base")}>
          {title}
        </span>
      </div>

      {/* Single layout */}
      {layout === "single" && (
        <>
          {value && (
            <p className={cn("font-semibold text-neutral-900 leading-[1.2]", isCompact ? "text-xl" : "text-2xl")}>
              {value}
            </p>
          )}
          {subtitle && (
            <p className={cn("text-neutral-500 mt-1", isCompact ? "text-xs" : "text-sm")}>{subtitle}</p>
          )}
        </>
      )}

      {/* Summary layout */}
      {layout === "summary" && items && (
        <div className="space-y-2 mt-1">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className={cn("text-neutral-600", isCompact ? "text-xs" : "text-sm")}>{item.label}</span>
              <span className={cn(
                "font-semibold",
                isCompact ? "text-sm" : "text-base",
                toneColors[item.tone || "neutral"]
              )}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { FinancialCard, type FinancialCardProps, type FinancialCardLayout, type FinancialCardSize, type FinancialCardState };
