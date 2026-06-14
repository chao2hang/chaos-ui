import { CampaignStatusTag } from "@/components/business/campaign-status-tag"
import type { CampaignStatus } from "@/components/business/campaign-status-tag"
import type { MarketingChannel } from "@/components/business/channel-picker"
import { cn } from "@/lib/utils"

export interface CampaignCalendarEvent {
  id: string
  name: string
  date: Date | string
  status: CampaignStatus
  channel?: MarketingChannel
}

export interface CampaignCalendarProps {
  month: Date
  events: CampaignCalendarEvent[]
  className?: string
}

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value)
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function CampaignCalendar({ month, events, className }: CampaignCalendarProps) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const leading = first.getDay()
  const cells = Array.from({ length: leading + daysInMonth }, (_, index) =>
    index < leading ? null : new Date(month.getFullYear(), month.getMonth(), index - leading + 1)
  )

  return (
    <div data-slot="campaign-calendar" className={cn("overflow-hidden rounded-lg border", className)}>
      <div className="grid grid-cols-7 border-b bg-muted/30 text-xs font-medium text-muted-foreground">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="px-3 py-2 text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, index) => {
          const dayEvents = date ? events.filter((event) => sameDay(toDate(event.date), date)) : []
          return (
            <div
              key={date?.toISOString() ?? `empty-${index}`}
              className="min-h-28 border-r border-b p-2 last:border-r-0"
            >
              {date && (
                <>
                  <div className="mb-2 text-xs font-medium tabular-nums">{date.getDate()}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="rounded-md bg-muted/60 p-1.5">
                        <div className="truncate text-xs font-medium">{event.name}</div>
                        <div className="mt-1 flex items-center gap-1">
                          <CampaignStatusTag status={event.status} size="sm" />
                          {event.channel && (
                            <span className="truncate text-[0.65rem] text-muted-foreground">
                              {event.channel}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-[0.65rem] text-muted-foreground">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
