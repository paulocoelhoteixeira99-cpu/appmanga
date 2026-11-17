import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardVariant = "default" | "elevated" | "outline";
type CardPadding = "sm" | "md";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
}

function Card({
  className,
  variant = "default",
  padding = "sm",
  interactive = false,
  children,
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as never);
              }
            }
          : undefined
      }
      className={cn(
        "flex flex-col gap-4 rounded-xl",
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        variant === "default" && "bg-[var(--color-surface-default)]",
        variant === "elevated" &&
          "bg-[var(--color-surface-default)] shadow-sm",
        variant === "outline" && "bg-[var(--color-surface-default)] border border-neutral-200",
        interactive &&
          "cursor-pointer hover:shadow-md active:bg-neutral-50 transition-all focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start gap-3", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <p className="flex-1 min-w-0 text-base font-semibold leading-[1.5] text-neutral-900">
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
}

function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <p className="text-base leading-[1.5] text-neutral-500">
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
}

function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start gap-3", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <p className="flex-1 min-w-0 text-sm leading-[1.5] text-neutral-500">
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
}

export { Card, CardHeader, CardContent, CardFooter, type CardProps };
