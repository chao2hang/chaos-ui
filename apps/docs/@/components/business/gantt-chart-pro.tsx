"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

/**
 * @component GanttChartPro
 * @category business/charts
 * @since 1.0.0
 * @description Advanced Gantt chart with dependency arrows, milestones,
 * critical path highlighting, task grouping, and zoomable timeline.
 * Supports finish-to-start, start-to-start, finish-to-finish, and
 * start-to-finish dependency types.
 * @keywords gantt, chart, schedule, dependency, critical-path, milestone, project
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Dependency type between two tasks. */
type DependencyType = "FS" | "SS" | "FF" | "SF";

/** A dependency link between tasks. */
interface GanttDependency {
  /** Source task id (predecessor) */
  from: string;
  /** Target task id (successor) */
  to: string;
  /** Dependency type: FS=finish-to-start, SS=start-to-start, FF=finish-to-finish, SF=start-to-finish */
  type?: DependencyType;
  /** Lag days (positive = delay, negative = overlap) */
  lag?: number;
}

/** A task in the Gantt chart. */
interface GanttTask {
  /** Unique task id */
  id: string;
  /** Task name */
  name: string;
  /** Start date (ISO date string) */
  start: string;
  /** End date (ISO date string) */
  end: string;
  /** Completion percentage (0-100) */
  progress?: number;
  /** Is this a milestone (zero-duration task)? */
  isMilestone?: boolean;
  /** Parent task id for grouping */
  parent?: string;
  /** Task color override */
  color?: string;
  /** Assigned resource */
  assignee?: string;
  /** Is this task on the critical path? */
  critical?: boolean;
}

/** Zoom level for the timeline. */
type ZoomLevel = "day" | "week" | "month";

/** Props for GanttChartPro. */
interface GanttChartProProps {
  /** Task list */
  tasks: GanttTask[];
  /** Dependency links between tasks */
  dependencies?: GanttDependency[];
  /** Timeline zoom level (default: "day") */
  zoom?: ZoomLevel;
  /** Show today marker (default: true) */
  showToday?: boolean;
  /** Show week column separators (default: true) */
  showWeekSeparators?: boolean;
  /** Show task list sidebar (default: true) */
  showTaskList?: boolean;
  /** Row height in px (default: 36) */
  rowHeight?: number;
  /** Allow task bar click */
  onTaskClick?: (task: GanttTask) => void;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Check if a date is a weekend (Sat/Sun). */
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/** Get ISO week number. */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/* -------------------------------------------------------------------------- */
/*  Dependency path computation                                               */
/* -------------------------------------------------------------------------- */

interface Point {
  x: number;
  y: number;
}

/**
 * Compute SVG path for a dependency arrow between two task bars.
 * Draws an L-shaped or stepped path from the source edge to the target edge.
 */
function computeDependencyPath(
  fromPoint: Point,
  toPoint: Point,
  type: DependencyType,
): string {
  const { x: x1, y: y1 } = fromPoint;
  const { x: x2, y: y2 } = toPoint;
  const arrowOffset = 6;

  if (type === "FS") {
    // finish-to-start: from right edge of source to left edge of target
    if (x2 >= x1 + arrowOffset) {
      // Simple L-shape going right then up/down
      const midX = x2 - arrowOffset;
      return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - 4} ${y2}`;
    }
    // U-shape going left then right
    const midX = Math.max(x1, x2) + arrowOffset;
    return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - 4} ${y2}`;
  }

  if (type === "SS") {
    // start-to-start: from left edge to left edge
    if (x2 >= x1) {
      const midX = x1 - arrowOffset;
      return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - 4} ${y2}`;
    }
    const midX = Math.min(x1, x2) - arrowOffset;
    return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - 4} ${y2}`;
  }

  if (type === "FF") {
    // finish-to-finish: from right edge to right edge
    if (x2 <= x1) {
      const midX = x1 + arrowOffset;
      return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 + 4} ${y2}`;
    }
    const midX = Math.max(x1, x2) + arrowOffset;
    return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 + 4} ${y2}`;
  }

  // SF: start-to-finish
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 + 4} ${y2}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function GanttChartPro({
  tasks = [],
  dependencies = [],
  zoom = "day",
  showToday = true,
  showWeekSeparators = true,
  showTaskList = true,
  rowHeight = 36,
  onTaskClick,
  className,
}: GanttChartProProps) {
  /* ---- compute date range ---- */
  const dateRange = React.useMemo(() => {
    if (tasks.length === 0) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return { start: now, span: 7 };
    }
    const starts = tasks.map((t) => new Date(t.start));
    const ends = tasks.map((t) => new Date(t.end));
    const min = Math.min(...starts.map((d) => d.getTime()));
    const max = Math.max(...ends.map((d) => d.getTime()));
    const start = new Date(min);
    start.setHours(0, 0, 0, 0);
    const end = new Date(max);
    end.setHours(0, 0, 0, 0);
    const span = Math.max(1, daysBetween(start, end) + 1);
    return { start, span };
  }, [tasks]);

  /* ---- column width based on zoom ---- */
  const colWidth = zoom === "day" ? 32 : zoom === "week" ? 14 : 6;
  const taskListWidth = showTaskList ? 200 : 0;

  /* ---- build flat task list (respecting parent-child) ---- */
  const flatTasks = React.useMemo(() => {
    const roots = tasks.filter((t) => !t.parent);
    const result: { task: GanttTask; depth: number }[] = [];
    const addChild = (parentId: string, depth: number) => {
      const children = tasks.filter((t) => t.parent === parentId);
      for (const child of children) {
        result.push({ task: child, depth });
        addChild(child.id, depth + 1);
      }
    };
    for (const root of roots) {
      result.push({ task: root, depth: 0 });
      addChild(root.id, 1);
    }
    // Add orphan tasks (have parent id but parent not in list)
    const knownIds = new Set(tasks.map((t) => t.id));
    for (const t of tasks) {
      if (t.parent && !knownIds.has(t.parent) && !roots.includes(t)) {
        result.push({ task: t, depth: 0 });
      }
    }
    return result;
  }, [tasks]);

  /* ---- task position map for dependency lines ---- */
  const taskPositions = React.useMemo(() => {
    const map = new Map<
      string,
      { startX: number; endX: number; y: number; row: number }
    >();
    flatTasks.forEach(({ task }, index) => {
      const s = new Date(task.start);
      s.setHours(0, 0, 0, 0);
      const offset = Math.max(0, daysBetween(dateRange.start, s));
      const dur = task.isMilestone
        ? 0
        : Math.max(1, daysBetween(new Date(task.start), new Date(task.end)) + 1);
      map.set(task.id, {
        startX: taskListWidth + offset * colWidth,
        endX: taskListWidth + (offset + dur) * colWidth,
        y: index * rowHeight + rowHeight / 2,
        row: index,
      });
    });
    return map;
  }, [flatTasks, dateRange, colWidth, taskListWidth, rowHeight]);

  /* ---- today position ---- */
  const todayOffset = React.useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return daysBetween(dateRange.start, now);
  }, [dateRange]);

  /* ---- header days ---- */
  const headerCells = React.useMemo(() => {
    const cells: {
      day: number;
      label: string;
      monthLabel?: string;
      weekLabel?: string;
      isWeekendDay: boolean;
    }[] = [];
    for (let i = 0; i < dateRange.span; i++) {
      const d = addDays(dateRange.start, i);
      const isStartOfMonth = d.getDate() === 1;
      const isStartOfWeek = d.getDay() === 1;
      cells.push({
        day: i,
        label: zoom === "month" ? "" : String(d.getDate()),
        ...(isStartOfMonth ? { monthLabel: `${d.getMonth() + 1}月` } : {}),
        ...(isStartOfWeek ? { weekLabel: `W${getWeekNumber(d)}` } : {}),
        isWeekendDay: isWeekend(d),
      });
    }
    return cells;
  }, [dateRange, zoom]);

  /* ---- total dimensions ---- */
  const timelineWidth = dateRange.span * colWidth;
  const totalWidth = taskListWidth + timelineWidth;
  const totalHeight = flatTasks.length * rowHeight + 48; // 48 = header

  /* ---- arrow marker id ---- */
  const arrowId = React.useId();

  return (
    <div
      data-slot="gantt-chart-pro"
      className={cn(
        "w-full overflow-auto rounded-lg border border-border bg-card",
        className,
      )}
      role="figure"
      aria-label={`Gantt chart with ${tasks.length} tasks and ${dependencies.length} dependencies`}
    >
      <div style={{ minWidth: totalWidth, position: "relative" }}>
        {/* ---------- Header ---------- */}
        <div
          className="sticky top-0 z-10 flex border-b border-border bg-muted/50 backdrop-blur"
          style={{ height: 48 }}
        >
          {/* Task list header */}
          {showTaskList && (
            <div
              className="shrink-0 border-r border-border px-3 py-2"
              style={{ width: taskListWidth }}
            >
              <span className="text-xs font-medium text-foreground">Task</span>
            </div>
          )}
          {/* Timeline header */}
          <div className="flex" style={{ width: timelineWidth }}>
            {headerCells.map((cell) => (
              <div
                key={cell.day}
                className={cn(
                  "shrink-0 border-r border-border/50 text-center",
                  cell.isWeekendDay && "bg-muted/30",
                )}
                style={{ width: colWidth }}
              >
                <div className="h-6 border-b border-border/30">
                  {cell.monthLabel && (
                    <span className="text-[10px] font-semibold text-primary">
                      {cell.monthLabel}
                    </span>
                  )}
                  {cell.weekLabel && !cell.monthLabel && zoom !== "day" && (
                    <span className="text-[8px] text-muted-foreground">
                      {cell.weekLabel}
                    </span>
                  )}
                </div>
                <div className="h-6 flex items-center justify-center">
                  {cell.label && (
                    <span
                      className={cn(
                        "text-[10px]",
                        cell.isWeekendDay
                          ? "text-muted-foreground"
                          : "text-foreground",
                      )}
                    >
                      {cell.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div style={{ position: "relative" }}>
          {/* Week separators */}
          {showWeekSeparators &&
            headerCells.map((cell) => {
              if (!cell.weekLabel) return null;
              return (
                <div
                  key={`sep-${cell.day}`}
                  className="absolute top-0 bottom-0 border-l border-border/20"
                  style={{ left: taskListWidth + cell.day * colWidth }}
                />
              );
            })}

          {/* Today marker */}
          {showToday && todayOffset >= 0 && todayOffset < dateRange.span && (
            <div
              data-slot="gantt-today-marker"
              className="absolute top-0 bottom-0 border-l-2 border-red-500/50"
              style={{ left: taskListWidth + todayOffset * colWidth }}
            >
              <span className="absolute -top-0 -translate-y-full rounded bg-red-500 px-1 text-[9px] text-white">
                Today
              </span>
            </div>
          )}

          {/* Task rows */}
          {flatTasks.length === 0 ? (
            <div
              className="flex items-center justify-center text-sm text-muted-foreground"
              style={{ height: 80 }}
            >
              No tasks
            </div>
          ) : (
            flatTasks.map(({ task, depth }, index) => {
              const pos = taskPositions.get(task.id);
              if (!pos) return null;

              const progress = Math.min(100, Math.max(0, task.progress ?? 0));
              const barHeight = task.isMilestone ? 16 : 20;
              const barTop = index * rowHeight + (rowHeight - barHeight) / 2;

              return (
                <div
                  key={task.id}
                  role="row"
                  className={cn(
                    "flex items-center border-b border-border/30 hover:bg-muted/20",
                    index % 2 === 1 && "bg-muted/5",
                  )}
                  style={{ height: rowHeight }}
                >
                  {/* Task name cell */}
                  {showTaskList && (
                    <div
                      className="shrink-0 truncate border-r border-border px-2 py-1"
                      style={{
                        width: taskListWidth,
                        paddingLeft: 8 + depth * 16,
                      }}
                    >
                      <span
                        className={cn(
                          "text-xs",
                          task.isMilestone && "font-semibold",
                          task.critical && "text-destructive",
                        )}
                        title={task.name}
                      >
                        {task.isMilestone && "◆ "}
                        {task.name}
                      </span>
                      {task.assignee && (
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          ({task.assignee})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Timeline cell */}
                  <div
                    className="relative flex-1"
                    style={{ width: timelineWidth }}
                  >
                    {/* Task bar or milestone */}
                    {task.isMilestone ? (
                      <button
                        type="button"
                        data-slot="gantt-milestone"
                        onClick={() => onTaskClick?.(task)}
                        className={cn(
                          "absolute rotate-45 border-2",
                          task.critical
                            ? "border-destructive bg-destructive/20"
                            : "border-primary bg-primary/20",
                        )}
                        style={{
                          left: pos.startX - barHeight / 2,
                          top: barTop,
                          width: barHeight,
                          height: barHeight,
                        }}
                        aria-label={`Milestone: ${task.name}`}
                        title={`${task.name} (${formatDate(task.start)})`}
                      />
                    ) : (
                      <button
                        type="button"
                        data-slot="gantt-task-bar"
                        onClick={() => onTaskClick?.(task)}
                        className={cn(
                          "absolute overflow-hidden rounded-md ring-1 transition-opacity hover:opacity-80",
                          task.critical
                            ? "bg-destructive/20 ring-destructive/50"
                            : "bg-primary/15 ring-primary/40",
                        )}
                        style={{
                          left: pos.startX,
                          top: barTop,
                          width: Math.max(
                            colWidth,
                            pos.endX - pos.startX,
                          ),
                          height: barHeight,
                        }}
                        title={`${task.name}: ${formatDate(task.start)} → ${formatDate(task.end)} (${progress}%)`}
                      >
                        <div
                          className={cn(
                            "h-full rounded-l-md",
                            task.critical ? "bg-destructive" : "bg-primary",
                          )}
                          style={{ width: `${progress}%` }}
                        />
                        {(pos.endX - pos.startX) > 60 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-foreground/80">
                            {progress}%
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* ---------- Dependency arrows (SVG overlay) ---------- */}
          {dependencies.length > 0 && flatTasks.length > 0 && (
            <svg
              data-slot="gantt-dependencies"
              className="pointer-events-none absolute left-0 top-0"
              width={totalWidth}
              height={totalHeight}
              style={{ zIndex: 5 }}
            >
              <defs>
                <marker
                  id={arrowId}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
                </marker>
              </defs>
              {dependencies.map((dep, idx) => {
                const fromPos = taskPositions.get(dep.from);
                const toPos = taskPositions.get(dep.to);
                if (!fromPos || !toPos) return null;

                const type = dep.type ?? "FS";
                const lag = dep.lag ?? 0;

                // Determine source and target points based on dependency type
                let fromPoint: Point;
                let toPoint: Point;

                if (type === "FS") {
                  fromPoint = { x: fromPos.endX + lag * colWidth, y: fromPos.y };
                  toPoint = { x: toPos.startX, y: toPos.y };
                } else if (type === "SS") {
                  fromPoint = { x: fromPos.startX + lag * colWidth, y: fromPos.y };
                  toPoint = { x: toPos.startX, y: toPos.y };
                } else if (type === "FF") {
                  fromPoint = { x: fromPos.endX + lag * colWidth, y: fromPos.y };
                  toPoint = { x: toPos.endX, y: toPos.y };
                } else {
                  fromPoint = { x: fromPos.startX + lag * colWidth, y: fromPos.y };
                  toPoint = { x: toPos.endX, y: toPos.y };
                }

                const path = computeDependencyPath(fromPoint, toPoint, type);
                const fromTask = tasks.find((t) => t.id === dep.from);
                const isCritical = fromTask?.critical;

                return (
                  <path
                    key={`dep-${idx}`}
                    d={path}
                    fill="none"
                    stroke={isCritical ? "var(--destructive)" : "var(--muted-foreground)"}
                    strokeWidth={isCritical ? 1.5 : 1}
                    strokeDasharray={isCritical ? "0" : "3 2"}
                    markerEnd={`url(#${arrowId})`}
                    opacity={0.7}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export { GanttChartPro };
export type {
  GanttChartProProps,
  GanttTask,
  GanttDependency,
  DependencyType,
  ZoomLevel,
};
