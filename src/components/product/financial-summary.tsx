import { cn } from "@/lib/utils/cn";

interface FinancialSummaryProps {
  className?: string;
  variant?: "default" | "embedded";
  icon?: React.ReactNode;
  title?: string;
  period?: string;
  primaryLabel?: string;
  primaryValue?: string;
  receitasLabel?: string;
  receitasValue: string;
  despesasLabel?: string;
  despesasValue: string;
  supportingText?: string;
}

function FinancialSummary({
  className,
  variant = "default",
  icon,
  title = "Resumo financeiro",
  period,
  primaryLabel = "Resultado do periodo",
  primaryValue,
  receitasLabel = "Receitas",
  receitasValue,
  despesasLabel = "Despesas",
  despesasValue,
  supportingText,
}: FinancialSummaryProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 p-6 rounded-2xl",
        variant === "default" && "bg-white border border-neutral-200",
        variant === "embedded" && "bg-transparent",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 overflow-hidden">
        {icon && (
          <div className="flex items-center justify-center size-8 rounded-lg bg-neutral-100 overflow-hidden">
            <div className="size-6 text-neutral-600">{icon}</div>
          </div>
        )}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-lg font-semibold leading-[1.2] tracking-tight text-neutral-900 truncate">
            {title}
          </p>
          {period && (
            <p className="text-sm leading-[1.5] text-neutral-500 truncate">
              {period}
            </p>
          )}
        </div>
      </div>

      {/* Primary metric */}
      {primaryValue && (
        <div className="flex flex-col gap-2 overflow-hidden">
          <p className="text-sm leading-[1.5] text-neutral-500">{primaryLabel}</p>
          <p className="text-[32px] font-semibold leading-[1.2] tracking-tight text-neutral-900">
            {primaryValue}
          </p>
        </div>
      )}

      {/* Receitas / Despesas */}
      <div className="flex gap-6 overflow-hidden">
        <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-hidden">
          <p className="text-sm leading-[1.5] text-neutral-500">{receitasLabel}</p>
          <p className="text-xl font-semibold leading-[1.2] tracking-tight text-neutral-900">
            {receitasValue}
          </p>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-hidden">
          <p className="text-sm leading-[1.5] text-neutral-500">{despesasLabel}</p>
          <p className="text-xl font-semibold leading-[1.2] tracking-tight text-neutral-900">
            {despesasValue}
          </p>
        </div>
      </div>

      {/* Supporting text */}
      {supportingText && (
        <p className="text-sm leading-[1.5] text-neutral-500">{supportingText}</p>
      )}
    </div>
  );
}

export { FinancialSummary, type FinancialSummaryProps };
