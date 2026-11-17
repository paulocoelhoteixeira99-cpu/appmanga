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
  const padding = isCompact ? "p-4" : "p-5";

  if (state === "loading") {
    return (
      <div className={cn("bg-primary-50 rounded-2xl", padding, className)}>
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-primary-100" />
            <div className="h-4 w-24 bg-primary-100 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-primary-100 rounded" />
            <div className="h-4 w-full bg-primary-100 rounded" />
            <div className="h-4 w-2/3 bg-primary-100 rounded" />
          </div>
          <div className="h-10 w-full bg-primary-100 rounded-lg" />
          <div className="h-11 w-32 bg-primary-100 rounded-lg" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={cn("bg-primary-50 rounded-2xl", padding, className)}>
        <div className="space-y-4">
          {icon && (
            <div className="flex items-center gap-3">
              <div className="shrink-0 size-9 rounded-full bg-white/60 flex items-center justify-center text-primary-700">
                {icon}
              </div>
              <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Manga Insights</span>
            </div>
          )}
          <h3 className={cn("font-semibold text-neutral-900", isCompact ? "text-base" : "text-xl")}>{title}</h3>
          <p className="text-sm text-neutral-600">{description || "Nao foi possivel carregar. Tente novamente."}</p>
          {actions && actions.length > 0 && (
            <div className="flex items-center gap-2">
              {actions.map((action, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={cn(
                    "h-11 px-4 rounded-lg text-sm font-semibold transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    i === 0
                      ? "text-primary-700 hover:bg-primary-100"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-primary-50 rounded-2xl", padding, className)}>
      <div className="space-y-4">
        {/* Signature */}
        {icon && (
          <div className="flex items-center gap-3">
            <div className="shrink-0 size-9 rounded-full bg-white/60 flex items-center justify-center text-primary-700">
              {icon}
            </div>
            <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Manga Insights</span>
          </div>
        )}

        {/* Title */}
        <h3 className={cn("font-semibold text-neutral-900", isCompact ? "text-base" : "text-xl")}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600">
          {description}
        </p>

        {/* Indicator */}
        {indicator && (
          <div className="space-y-1">
            <span className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
              indicatorTones[indicator.tone || "neutral"]
            )}>
              {indicator.value}
            </span>
            {indicator.label && (
              <p className="text-xs text-neutral-500">{indicator.label}</p>
            )}
          </div>
        )}

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  "h-11 px-4 rounded-lg text-sm font-semibold transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  i === 0
                    ? "text-primary-700 hover:bg-primary-100"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { MangaInsights, type MangaInsightsProps, type MangaInsightAction };
