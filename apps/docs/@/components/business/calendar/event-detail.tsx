"use client"
import * as React from "react"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { cn } from "@chaos_team/chaos-ui/lib"
import { Button } from "@chaos_team/chaos-ui/ui"
import { formatDate, formatTime } from "@chaos_team/chaos-ui/lib"

export interface EventDetailData {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  location?: string
  attendees?: Array<{ name: string; avatar?: string }>
  rsvp?: "accepted" | "declined" | "pending" | "tentative"
  organizer?: string
}

interface EventDetailProps extends React.ComponentProps<"div"> {
  event: EventDetailData
  onRsvp?: (status: NonNullable<EventDetailData["rsvp"]>) => void
  className?: string
}

export function EventDetail({ event, onRsvp, className, ...props }: EventDetailProps) {
  return (
    <div
      data-slot="event-detail"
      className={cn("space-y-4 rounded-md border bg-card p-4", className)}
      {...props}
    >
      <div>
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {event.description && <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>}
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 text-muted-foreground" />
          <span>{formatDate(event.start, { dateStyle: "full" })}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 text-muted-foreground" />
          <span>
            {formatTime(event.start)} - {formatTime(event.end)}
          </span>
        </div>
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPinIcon className="size-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
        )}
        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center gap-2">
            <UsersIcon className="size-4 text-muted-foreground" />
            <span>{event.attendees.length} 位参与者</span>
          </div>
        )}
      </div>
      {onRsvp && (
        <div className="flex gap-2 border-t pt-3">
          <Button
            size="sm"
            variant={event.rsvp === "accepted" ? "default" : "outline"}
            onClick={() => onRsvp("accepted")}
          >
            接受
          </Button>
          <Button
            size="sm"
            variant={event.rsvp === "tentative" ? "default" : "outline"}
            onClick={() => onRsvp("tentative")}
          >
            暂定
          </Button>
          <Button
            size="sm"
            variant={event.rsvp === "declined" ? "destructive" : "outline"}
            onClick={() => onRsvp("declined")}
          >
            拒绝
          </Button>
        </div>
      )}
    </div>
  )
}
