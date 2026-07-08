import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * @component Timeline
 * @category ui/feedback
 * @since 0.2.0
 * @description Vertical timeline container for displaying chronological events / 垂直时间线容器，用于显示按时间顺序排列的事件
 * @keywords timeline, chronology, events, history, 时间线
 * @example
 * <Timeline>
 *   <TimelineItem title="Step 1" time="10:00" />
 *   <TimelineItem title="Step 2" time="10:30" />
 * </Timeline>
 */
function Timeline({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

const timelineDotVariants = cva(
  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      variant: {
        default: "border-muted-foreground",
        success: "border-success text-success",
        warning: "border-warning text-warning",
        destructive: "border-destructive text-destructive",
        info: "border-info text-info",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/**
 * @component TimelineItem
 * @category ui/feedback
 * @since 0.2.0
 * @description Single event item in a timeline with dot, connector, title, description, and time / 时间线中的单个事件项，包含圆点、连接线、标题、描述和时间
 * @keywords timeline, item, event, status, 时间线项
 * @example
 * <TimelineItem
 *   title="Order placed"
 *   description="Your order has been confirmed"
 *   time="12:30 PM"
 *   status="completed"
 * />
 */
function TimelineItem({
  className,
  icon: Icon,
  title,
  description,
  time,
  status,
  variant,
  children,
  ...props
}: {
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  status?: "completed" | "current" | "pending" | "default";
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">) {
  const resolvedVariant =
    variant ??
    (status === "completed"
      ? "success"
      : status === "current"
        ? "info"
        : status === "pending"
          ? "default"
          : "default");

  return (
    <div className={cn("relative flex gap-4", className)} {...props}>
      <div className="flex flex-col items-center self-stretch">
        <TimelineDot variant={resolvedVariant}>
          {Icon ? <Icon className="size-4" /> : null}
        </TimelineDot>
        <TimelineConnector />
      </div>
      <TimelineContent className="pb-8 last:pb-0">
        {title !== undefined ? <TimelineTitle>{title}</TimelineTitle> : null}
        {description !== undefined ? (
          <TimelineDescription>{description}</TimelineDescription>
        ) : null}
        {time !== undefined ? <TimelineTime>{time}</TimelineTime> : null}
        {children}
      </TimelineContent>
    </div>
  );
}

/**
 * @component TimelineDot
 * @category ui/feedback
 * @since 0.2.0
 * @description The circular dot marker on the timeline, color-coded by variant / 时间线上的圆形标记点，根据变体颜色编码
 * @keywords timeline, dot, marker, indicator, 时间线标记点
 * @example
 * <TimelineDot variant="success">
 *   <CheckIcon className="size-4" />
 * </TimelineDot>
 */
function TimelineDot({
  className,
  variant,
  children,
  ...props
}: {
  className?: string;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(timelineDotVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

/**
 * @component TimelineConnector
 * @category ui/feedback
 * @since 0.2.0
 * @description Vertical connecting line between timeline dots / 时间线圆点之间的垂直连接线
 * @keywords timeline, connector, line, 时间线连接线
 * @example
 * <TimelineConnector />
 */
function TimelineConnector({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-border mx-auto w-px flex-1", className)}
      {...props}
    />
  );
}

/**
 * @component TimelineContent
 * @category ui/feedback
 * @since 0.2.0
 * @description Container for the text content of a timeline item / 时间线项文本内容的容器
 * @keywords timeline, content, 时间线内容
 * @example
 * <TimelineContent>
 *   <TimelineTitle>Event</TimelineTitle>
 *   <TimelineDescription>Details</TimelineDescription>
 * </TimelineContent>
 */
function TimelineContent({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 pt-1", className)} {...props} />;
}

/**
 * @component TimelineTitle
 * @category ui/feedback
 * @since 0.2.0
 * @description Bold title heading for a timeline item / 时间线项的粗体标题
 * @keywords timeline, title, heading, 时间线标题
 * @example
 * <TimelineTitle>Order Confirmed</TimelineTitle>
 */
function TimelineTitle({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-sm leading-none font-semibold", className)}
      {...props}
    />
  );
}

/**
 * @component TimelineDescription
 * @category ui/feedback
 * @since 0.2.0
 * @description Muted description text for a timeline item / 时间线项的柔和描述文本
 * @keywords timeline, description, text, 时间线描述
 * @example
 * <TimelineDescription>Your package is on the way.</TimelineDescription>
 */
function TimelineDescription({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-muted-foreground mt-1 text-sm", className)}
      {...props}
    />
  );
}

/**
 * @component TimelineTime
 * @category ui/feedback
 * @since 0.2.0
 * @description Timestamp label for a timeline item, rendered as a <time> element / 时间线项的时间戳标签，渲染为 <time> 元素
 * @keywords timeline, time, timestamp, 时间线时间
 * @example
 * <TimelineTime>12:30 PM</TimelineTime>
 */
function TimelineTime({
  className,
  ...props
}: { className?: string } & React.HTMLAttributes<HTMLTimeElement>) {
  return (
    <time
      className={cn("text-muted-foreground mt-1 text-xs", className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineDotVariants,
};
