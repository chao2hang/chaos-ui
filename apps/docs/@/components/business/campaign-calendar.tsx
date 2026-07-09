import { CampaignStatusTag } from "@/components/business/campaign-status-tag";
import type { CampaignStatus } from "@/components/business/campaign-status-tag";
import type { MarketingChannel } from "@/components/business/channel-picker";
import { cn } from "@/lib/utils";

export interface CampaignCalendarEvent {
  id: string;
  name: string;
  date: Date | string;
  status: CampaignStatus;
  channel?: MarketingChannel;
}

export interface CampaignCalendarProps {
  month: Date;
  events: CampaignCalendarEvent[];
  className?: string;
}

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * @component CampaignCalendar
 * @category business/dashboard
 * @since 0.2.0
 * @description Monthly calendar grid displaying campaigns with status tags and channel info per day / 按月展示营销活动的日历视图，每天显示活动状态和渠道信息
 * @keywords calendar, campaign, schedule, month, events
 * @example
 * <CampaignCalendar month={new Date()} events={[{ id: "1", name: "Sale", date: new Date(), status: "active" }]} />
 */
export function CampaignCalendar({
  month,
  events,
  className,
}: CampaignCalendarProps) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const leading = first.getDay();
  const cells = Array.from({ length: leading + daysInMonth }, (_, index) =>
    index < leading
      ? null
      : new Date(month.getFullYear(), month.getMonth(), index - leading + 1),
  );

  return (
    <div
      data-slot="campaign-calendar"
      className={cn("overflow-hidden rounded-lg border", className)}
    >
      <div className="bg-muted/30 text-muted-foreground grid grid-cols-7 border-b text-xs font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="px-3 py-2 text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, index) => {
          const dayEvents = date
            ? events.filter((event) => sameDay(toDate(event.date), date))
            : [];
          return (
            <div
              key={date?.toISOString() ?? `empty-${index}`}
              className="min-h-28 border-r border-b p-2 last:border-r-0"
            >
              {date && (
                <>
                  <div className="mb-2 text-xs font-medium tabular-nums">
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="bg-muted/60 rounded-md p-1.5"
                      >
                        <div className="truncate text-xs font-medium">
                          {event.name}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <CampaignStatusTag status={event.status} size="sm" />
                          {event.channel && (
                            <span className="text-muted-foreground truncate text-[0.65rem]">
                              {event.channel}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-muted-foreground text-[0.65rem]">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
