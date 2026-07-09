"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chaos_team/chaos-ui/ui";
import { ScrollArea } from "@chaos_team/chaos-ui/ui";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Definition of a shift type with its visual appearance. */
export interface ShiftType {
  id: string;
  label: string;
  /** CSS color class for the badge background, e.g. "bg-blue-500". */
  color: string;
  /** Text color class on the badge. */
  textColor?: string;
  /** Shift start time (HH:MM). */
  startTime?: string;
  /** Shift end time (HH:MM). */
  endTime?: string;
  /** Hours per shift, used for summary calculations. */
  hours?: number;
}

/** An employee who can be assigned shifts. */
export interface Employee {
  id: string;
  name: string;
  avatar?: string;
  department?: string;
}

/** A shift assignment linking an employee to a shift type on a date. */
export interface ShiftAssignment {
  id?: string;
  date: string;
  employeeId: string;
  shiftTypeId: string;
}

/** Props for the ShiftCalendar component. */
export interface ShiftCalendarProps {
  /** Shift type definitions. */
  shiftTypes: ShiftType[];
  /** Employee list. */
  employees: Employee[];
  /** Current shift assignments. */
  assignments: ShiftAssignment[];
  /** Called when user assigns a shift. */
  onAssign?: (date: string, employeeId: string, shiftTypeId: string) => void;
  /** Called when user removes a shift. */
  onRemove?: (date: string, employeeId: string) => void;
  /** Initial month to display (default: current month). */
  initialMonth?: Date;
  /** Controlled month override. */
  month?: Date;
  /** Month change handler. */
  onMonthChange?: (month: Date) => void;
  /** Filter by specific employee IDs. */
  filterEmployeeIds?: string[];
  /** Show employee filter dropdown. */
  showFilter?: boolean;
  /** Show summary row with total hours per employee. */
  showSummary?: boolean;
  /** Read-only mode disables assignment and removal. */
  readOnly?: boolean;
  /** Additional CSS class names. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthDays(year: number, monthIndex: number): Date[] {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  let startPad = firstDay.getDay() - 1;
  if (startPad < 0) startPad = 6;

  const days: Date[] = [];
  for (let i = startPad; i > 0; i--) {
    days.push(new Date(year, monthIndex, 1 - i));
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, monthIndex, d));
  }
  while (days.length % 7 !== 0) {
    const next = new Date(days[days.length - 1]!);
    next.setDate(next.getDate() + 1);
    days.push(next);
  }
  return days;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @component ShiftCalendar
 * @category business/scheduling
 * @since 0.2.0
 * @description Monthly shift scheduling calendar for manufacturing. Displays
 *   employees as rows and calendar days as columns with colored shift badges.
 *   Supports assignment via popover, removal via right-click, and optional
 *   summary totals. / \u5236\u9020\u4e1a\u6708\u5ea6\u6392\u73ed\u65e5\u5386\uff0c\u6309\u5458\u5de5\u884c\u548c\u65e5\u671f\u5217\u5c55\u793a\u73ed\u6b21\u6807\u7b7e\uff0c
 *   \u652f\u6301\u5f39\u51fa\u6846\u5206\u914d\u3001\u53f3\u952e\u5220\u9664\u548c\u5de5\u65f6\u6c47\u603b\u3002
 * @keywords shift, calendar, scheduling, manufacturing, roster, \u6392\u73ed, \u65e5\u5386
 * @example
 * <ShiftCalendar
 *   shiftTypes={[{ id: "morning", label: "Morning", color: "bg-blue-500", hours: 8 }]}
 *   employees={[{ id: "e1", name: "Alice" }]}
 *   assignments={[]}
 * />
 */
function ShiftCalendar({
  shiftTypes,
  employees,
  assignments,
  onAssign,
  onRemove,
  initialMonth,
  month: controlledMonth,
  onMonthChange,
  filterEmployeeIds,
  showFilter = false,
  showSummary = false,
  readOnly = false,
  className,
}: ShiftCalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    () =>
      controlledMonth ??
      initialMonth ??
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [employeeFilter, setEmployeeFilter] = React.useState<string>("all");

  const currentMonth = controlledMonth ?? internalMonth;

  const updateMonth = React.useCallback(
    (newMonth: Date) => {
      if (!controlledMonth) {
        setInternalMonth(newMonth);
      }
      onMonthChange?.(newMonth);
    },
    [controlledMonth, onMonthChange],
  );

  const goToPrevMonth = React.useCallback(() => {
    const prev = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );
    updateMonth(prev);
  }, [currentMonth, updateMonth]);

  const goToNextMonth = React.useCallback(() => {
    const next = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1,
    );
    updateMonth(next);
  }, [currentMonth, updateMonth]);

  const visibleEmployees = React.useMemo(() => {
    let list = employees;
    if (filterEmployeeIds?.length) {
      list = list.filter((e) => filterEmployeeIds.includes(e.id));
    }
    if (showFilter && employeeFilter !== "all") {
      list = list.filter((e) => e.id === employeeFilter);
    }
    return list;
  }, [employees, filterEmployeeIds, showFilter, employeeFilter]);

  const assignmentMap = React.useMemo(() => {
    const map: Record<string, Record<string, ShiftAssignment[]>> = {};
    for (const a of assignments) {
      map[a.date] ??= {};
      (map[a.date]![a.employeeId] ??= []).push(a);
    }
    return map;
  }, [assignments]);

  const shiftTypeMap = React.useMemo(() => {
    const m: Record<string, ShiftType> = {};
    for (const st of shiftTypes) m[st.id] = st;
    return m;
  }, [shiftTypes]);

  const days = React.useMemo(
    () => getMonthDays(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth],
  );

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleAssign = React.useCallback(
    (dateKey: string, employeeId: string, shiftTypeId: string) => {
      onAssign?.(dateKey, employeeId, shiftTypeId);
    },
    [onAssign],
  );

  const handleRemove = React.useCallback(
    (dateKey: string, employeeId: string) => {
      onRemove?.(dateKey, employeeId);
    },
    [onRemove],
  );

  return (
    <div
      data-slot="shift-calendar"
      className={cn("flex flex-col gap-3", className)}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={goToPrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <span className="min-w-[140px] text-center text-sm font-semibold">
            {monthLabel}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        {showFilter && (
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="border-input bg-background h-8 rounded-md border px-2 text-sm"
            aria-label="Filter employees"
          >
            <option value="all">All employees</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Calendar grid */}
      <ScrollArea>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-muted-foreground bg-background border-border sticky left-0 z-10 min-w-[100px] border p-1.5 text-left text-[0.65rem] font-medium">
                Employee
              </th>
              {days.map((day) => {
                const key = formatDateKey(day);
                const we = isWeekend(day);
                const inMonth = day.getMonth() === currentMonth.getMonth();
                return (
                  <th
                    key={key}
                    className={cn(
                      "border-border border p-1 text-center text-[0.65rem] font-medium",
                      we && "bg-muted/40",
                      !inMonth && "text-muted-foreground/40",
                    )}
                  >
                    <div>{DAY_NAMES[(day.getDay() + 6) % 7]}</div>
                    <div className="text-[0.7rem] font-semibold">
                      {day.getDate()}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="text-foreground bg-background border-border sticky left-0 z-10 border p-1.5 text-[0.7rem] font-medium">
                  {emp.name}
                </td>
                {days.map((day) => {
                  const dateKey = formatDateKey(day);
                  const we = isWeekend(day);
                  const inMonth = day.getMonth() === currentMonth.getMonth();
                  const cellAssignments =
                    assignmentMap[dateKey]?.[emp.id] ?? [];

                  return (
                    <td
                      key={dateKey}
                      className={cn(
                        "border-border border p-0.5 align-top",
                        we && "bg-muted/20",
                        !inMonth && "opacity-30",
                      )}
                    >
                      {readOnly ? (
                        <div className="flex flex-wrap gap-0.5 p-0.5">
                          {cellAssignments.map((a, idx) => {
                            const st = shiftTypeMap[a.shiftTypeId];
                            if (!st) return null;
                            return (
                              <span
                                key={a.id ?? `${dateKey}-${emp.id}-${idx}`}
                                className={cn(
                                  "inline-block rounded px-1 py-px text-[0.6rem] leading-tight",
                                  st.color,
                                  st.textColor ?? "text-white",
                                )}
                              >
                                {st.label}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <Popover>
                          <PopoverTrigger
                            className="hover:bg-muted/50 flex min-h-[28px] w-full cursor-pointer flex-wrap gap-0.5 rounded p-0.5 transition-colors"
                            type="button"
                            aria-label={`Assign shift for ${emp.name} on ${dateKey}`}
                          >
                            {cellAssignments.map((a, idx) => {
                              const st = shiftTypeMap[a.shiftTypeId];
                              if (!st) return null;
                              return (
                                <span
                                  key={a.id ?? `${dateKey}-${emp.id}-${idx}`}
                                  className={cn(
                                    "inline-block rounded px-1 py-px text-[0.6rem] leading-tight",
                                    st.color,
                                    st.textColor ?? "text-white",
                                  )}
                                  onContextMenu={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRemove(dateKey, emp.id);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  title="Right-click to remove"
                                >
                                  {st.label}
                                </span>
                              );
                            })}
                          </PopoverTrigger>
                          <PopoverContent side="bottom" align="center">
                            <div className="flex flex-col gap-1">
                              <span className="text-muted-foreground px-1 text-[0.65rem]">
                                Assign shift
                              </span>
                              {shiftTypes.map((st) => (
                                <Button
                                  key={st.id}
                                  type="button"
                                  variant="ghost"
                                  size="xs"
                                  className="justify-start gap-2"
                                  onClick={() =>
                                    handleAssign(dateKey, emp.id, st.id)
                                  }
                                >
                                  <span
                                    className={cn(
                                      "inline-block size-3 rounded-sm",
                                      st.color,
                                    )}
                                  />
                                  <span>{st.label}</span>
                                  {st.startTime && st.endTime && (
                                    <span className="text-muted-foreground ml-auto text-[0.6rem]">
                                      {st.startTime}\u2013{st.endTime}
                                    </span>
                                  )}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Summary row */}
            {showSummary && (
              <tr>
                <td className="text-muted-foreground bg-background border-border sticky left-0 z-10 border p-1.5 text-[0.65rem] font-semibold">
                  Total hours
                </td>
                {days.map((day) => {
                  const dateKey = formatDateKey(day);
                  const we = isWeekend(day);
                  return (
                    <td
                      key={dateKey}
                      className={cn(
                        "border-border border p-0.5 text-center text-[0.6rem]",
                        we && "bg-muted/20",
                      )}
                    >
                      {(() => {
                        let dayTotal = 0;
                        for (const emp of visibleEmployees) {
                          for (const a of assignmentMap[dateKey]?.[emp.id] ??
                            []) {
                            const st = shiftTypeMap[a.shiftTypeId];
                            if (st?.hours) dayTotal += st.hours;
                          }
                        }
                        return dayTotal > 0 ? dayTotal : "";
                      })()}
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        </table>
      </ScrollArea>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3">
        {shiftTypes.map((st) => (
          <div key={st.id} className="flex items-center gap-1.5">
            <span className={cn("inline-block size-3 rounded-sm", st.color)} />
            <span className="text-muted-foreground text-[0.7rem]">
              {st.label}
              {st.hours ? ` (${st.hours}h)` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ShiftCalendar };
