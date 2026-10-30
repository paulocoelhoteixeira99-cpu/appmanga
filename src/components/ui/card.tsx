import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardVariant = "default" | "elevated" | "outline";
type CardPadding = "sm" | "md";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

function Card({
  className,
  variant = "default",
  padding = "sm",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl",
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        variant === "default" && "bg-white",
        variant === "elevated" &&
          "bg-white shadow-[0px_2px_8px_rgba(26,16,48,0.06)]",
        variant === "outline" && "bg-white border border-neutral-200",
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
