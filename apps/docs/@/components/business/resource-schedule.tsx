"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatTime } from "@chaos_team/chaos-ui/lib";

/**
 * @component ResourceSchedule
 * @category business/charts
 * @since 0.7.0
 * @description 资源调度视图。以资源为行、时间为列，将预约以色块定位在时间轴上（甘特式）。
 * @param resources 资源列表（id / name）
 * @param bookings 预约列表（resourceId / start / end / title）
 * @example
 * <ResourceSchedule resources={[{ id: "r1", name: "会议室 A" }]} bookings={[{ resourceId: "r1", start: "2026-06-30T09:00", end: "2026-06-30T10:00", title: "周会" }]} />
 */

interface ResourceScheduleProps {
  resources: Array<{ id: string; name: string }>;
  bookings: Array<{
    resourceId: string;
    start: string;
    end: string;
    title: string;
  }>;
  className?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00 - 19:00

function toMinutes(value: string): number {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return NaN;
  return d.getHours() * 60 + d.getMinutes();
}

const DAY_START = 8 * 60; // 08:00
const DAY_END = 20 * 60; // 20:00
const DAY_SPAN = DAY_END - DAY_START;

function ResourceSchedule({ resources = [], bookings = [], className }: ResourceScheduleProps) {
  const bookingsByResource = React.useMemo(() => {
    const map = new Map<string, typeof bookings>();
    for (const b of bookings) {
      const list = map.get(b.resourceId) ?? [];
      list.push(b);
      map.set(b.resourceId, list);
    }
    return map;
  }, [bookings]);

  return (
    <div
      data-slot="resource-schedule"
      className={cn("w-full overflow-x-auto rounded-lg border", className)}
      role="region"
      aria-label="资源调度视图"
    >
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 w-32 border-b border-r bg-card px-3 py-2 text-left text-xs font-medium text-muted-foreground">
              资源
            </th>
            {HOURS.map((h) => (
              <th key={h} scope="col" className="border-b px-1 py-2 text-center text-xs font-medium text-muted-foreground tabular-nums">
                {String(h).padStart(2, "0")}:00
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resources.length === 0 ? (
            <tr>
              <td colSpan={HOURS.length + 1} className="px-3 py-6 text-center text-muted-foreground">
                暂无资源
              </td>
            </tr>
          ) : (
            resources.map((resource) => {
              const rowBookings = bookingsByResource.get(resource.id) ?? [];
              return (
                <tr key={resource.id} className="border-b last:border-b-0">
                  <th scope="row" className="sticky left-0 z-10 w-32 border-r bg-card px-3 py-2 text-left text-xs font-medium">
                    {resource.name}
                  </th>
                  <td colSpan={HOURS.length} className="relative h-12 p-0">
                    <div className="relative h-full w-full">
                      {/* hour gridlines */}
                      {HOURS.map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 border-r border-border/40"
                          style={{ left: `${(i / HOURS.length) * 100}%` }}
                        />
                      ))}
                      {rowBookings.map((booking, idx) => {
                        const startMin = toMinutes(booking.start);
                        const endMin = toMinutes(booking.end);
                        if (Number.isNaN(startMin) || Number.isNaN(endMin) || endMin <= startMin) {
                          return null;
                        }
                        const left = ((startMin - DAY_START) / DAY_SPAN) * 100;
                        const width = ((endMin - startMin) / DAY_SPAN) * 100;
                        return (
                          <div
                            key={`${booking.resourceId}-${idx}`}
                            className="absolute top-1 bottom-1 flex items-center rounded bg-primary/80 px-1.5 text-[10px] font-medium text-primary-foreground shadow-sm"
                            style={{
                              left: `${Math.max(0, left)}%`,
                              width: `${Math.min(100 - left, width)}%`,
                            }}
                            title={`${booking.title} · ${formatTime(booking.start)} - ${formatTime(booking.end)}`}
                          >
                            <span className="truncate">{booking.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export { ResourceSchedule };
export type { ResourceScheduleProps };
