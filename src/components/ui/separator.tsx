"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

type SeparatorVariant = "default" | "subtle";

const variantStyles: Record<SeparatorVariant, string> = {
  default: "bg-border",
  subtle: "bg-neutral-100",
};

interface SeparatorProps extends SeparatorPrimitive.Props {
  variant?: SeparatorVariant;
}

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}

export { Separator, type SeparatorProps }
