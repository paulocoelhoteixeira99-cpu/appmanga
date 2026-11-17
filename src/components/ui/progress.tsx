"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"

type ProgressVariant = "primary" | "neutral" | "success";
type ProgressHeight = 4 | 8 | 12;

interface ProgressProps extends ProgressPrimitive.Root.Props {
  variant?: ProgressVariant;
  height?: ProgressHeight;
}

const heightStyles: Record<ProgressHeight, string> = {
  4: "h-1",
  8: "h-2",
  12: "h-3",
};

const indicatorStyles: Record<ProgressVariant, string> = {
  primary: "bg-primary-500",
  neutral: "bg-neutral-400",
  success: "bg-success-500",
};

function Progress({
  className,
  children,
  value,
  variant = "primary",
  height = 8,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack height={height}>
        <ProgressIndicator variant={variant} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

interface ProgressTrackProps extends ProgressPrimitive.Track.Props {
  height?: ProgressHeight;
}

function ProgressTrack({ className, height = 8, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex w-full items-center overflow-x-hidden rounded-full bg-muted",
        heightStyles[height],
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

interface ProgressIndicatorProps extends ProgressPrimitive.Indicator.Props {
  variant?: ProgressVariant;
}

function ProgressIndicator({
  className,
  variant = "primary",
  ...props
}: ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full transition-all", indicatorStyles[variant], className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  type ProgressVariant,
  type ProgressHeight,
  type ProgressProps,
}
