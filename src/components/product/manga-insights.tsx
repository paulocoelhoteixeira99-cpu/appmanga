import { cn } from "@/lib/utils/cn";

type MangaInsightsSize = "default" | "compact";
type MangaInsightsState = "default" | "loading" | "error";

interface MangaInsightAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface MangaInsightsProps {
  size?: MangaInsightsSize;
  state?: MangaInsightsState;
  icon?: React.ReactNode;
  title: string;
  description: string;
  indicator?: {
    label: string;
    value: string;
    tone?: "positive" | "negative" | "neutral";
  };
  actions?: MangaInsightAction[];
  className?: string;
}

const indicatorTones: Record<string, string> = {
  positive: "bg-success-50 text-success-700",
  negative: "bg-error-50 text-error-700",
  neutral: "bg-neutral-100 text-neutral-700",
};

function MangaInsights({
  size = "default",
  state = "default",
  icon,
  title,
  description,
  indicator,
  actions,
  className,
}: MangaInsightsProps) {
  const isCompact = size === "compact";
  const padding = isCompact ? "p-3" : "p-4";

  if (state === "loading") {
    return (
      <div className={cn("bg-white border border-neutral-200 rounded-xl", padding, className)}>
        <div className="animate-pulse space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-neutral-200" />
            <div className="h-4 w-32 bg-neutral-200 rounded" />
          </div>
          <div className="h-3 w-full bg-neutral-200 rounded" />
          <div className="h-3 w-2/3 bg-neutral-200 rounded" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={cn("bg-white border border-neutral-200 rounded-xl", padding, className)}>
        <div className="flex items-center gap-3 text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-error-500 shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span className="text-sm">Nao foi possivel carregar o insight.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border border-neutral-200 rounded-xl", padding, className)}>
      {/* Header */}
      <div className="flex items-start gap-3">
        {icon && (
          <div className={cn(
            "shrink-0 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center",
            isCompact ? "size-8" : "size-10"
          )}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn("font-semibold text-neutral-900", isCompact ? "text-sm" : "text-base")}>
              {title}
            </h3>
            {indicator && (
              <span className={cn(
                "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                indicatorTones[indicator.tone || "neutral"]
              )}>
                {indicator.value}
              </span>
            )}
          </div>
          <p className={cn("text-neutral-600 mt-1", isCompact ? "text-xs" : "text-sm")}>
            {description}
          </p>
          {indicator?.label && (
            <p className="text-xs text-neutral-500 mt-0.5">{indicator.label}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className={cn("flex items-center gap-2 mt-3", icon ? "pl-[52px]" : "")}>
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                "text-sm font-semibold transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                i === 0
                  ? "text-primary-500 hover:text-primary-600"
                  : "text-neutral-600 hover:text-neutral-900"
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { MangaInsights, type MangaInsightsProps, type MangaInsightAction };
