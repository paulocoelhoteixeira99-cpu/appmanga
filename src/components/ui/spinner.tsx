import { cn } from "@/lib/utils/cn";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerStyle = "primary" | "neutral" | "inverse";

interface SpinnerProps {
  className?: string;
  size?: SpinnerSize;
  variant?: SpinnerStyle;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
};

const colorStyles: Record<SpinnerStyle, { track: string; arc: string }> = {
  primary: { track: "text-primary-100", arc: "text-primary-500" },
  neutral: { track: "text-neutral-200", arc: "text-neutral-500" },
  inverse: { track: "text-white/25", arc: "text-white" },
};

function Spinner({
  className,
  size = "md",
  variant = "primary",
  label = "Carregando",
}: SpinnerProps) {
  const colors = colorStyles[variant];

  return (
    <div
      role="status"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg
        className={cn("animate-spin", sizeStyles[size])}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={colors.track}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className={colors.arc}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner, type SpinnerProps };
