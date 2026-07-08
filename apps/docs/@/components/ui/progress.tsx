"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

/**
 * @component Progress
 * @category ui/feedback
 * @since 0.2.0
 * @description Progress bar indicating task completion percentage with label and value display / 进度条组件，显示任务完成百分比，支持标签和数值展示
 * @keywords progress, bar, loading, percentage, indicator, completion
 * @example
 * <Progress value={60}>
 *   <ProgressLabel>Uploading...</ProgressLabel>
 *   <ProgressValue />
 * </Progress>
 */
function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

/**
 * @component ProgressTrack
 * @category ui/feedback
 * @since 0.2.0
 * @description The background track of the progress bar / 进度条背景轨道
 * @keywords progress, track, background, bar
 * @example
 * <ProgressTrack />
 */
function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

/**
 * @component ProgressIndicator
 * @category ui/feedback
 * @since 0.2.0
 * @description The filled portion of the progress bar representing completion / 进度条已填充部分，表示完成进度
 * @keywords progress, indicator, fill, bar, completion
 * @example
 * <ProgressIndicator />
 */
function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("bg-primary h-full transition-all", className)}
      {...props}
    />
  );
}

/**
 * @component ProgressLabel
 * @category ui/feedback
 * @since 0.2.0
 * @description Label text describing the progress task / 描述进度任务的标签文本
 * @keywords progress, label, text, description
 * @example
 * <ProgressLabel>Downloading file...</ProgressLabel>
 */
function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

/**
 * @component ProgressValue
 * @category ui/feedback
 * @since 0.2.0
 * @description Numeric display of the current progress percentage / 当前进度百分比的数值显示
 * @keywords progress, value, percentage, number, display
 * @example
 * <ProgressValue />
 */
function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "text-muted-foreground ml-auto text-sm tabular-nums",
        className,
      )}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};
