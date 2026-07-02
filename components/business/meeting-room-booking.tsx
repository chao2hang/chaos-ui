"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircleIcon, UsersIcon, ClockIcon } from "@/components/ui/icons";

/**
 * @component MeetingRoomBooking
 * @category business/oa
 * @since 1.0.0
 * @description Meeting room booking with conflict detection, room capacity
 * filtering, equipment indicators, and time slot visualization.
 * @keywords meeting, room, booking, reservation, conflict, schedule, oa
 */

interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  floor?: string;
  equipment?: string[];
}

interface ExistingBooking {
  id: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  bookedBy: string;
  title: string;
}

interface MeetingRoomBookingProps {
  rooms: MeetingRoom[];
  existingBookings?: ExistingBooking[];
  selectedRoom?: string;
  onRoomChange?: (roomId: string) => void;
  date?: string;
  onDateChange?: (date: string) => void;
  startTime?: string;
  endTime?: string;
  onTimeChange?: (start: string, end: string) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  attendeeCount?: number;
  onAttendeeCountChange?: (count: number) => void;
  onBook?: () => void;
  readOnly?: boolean;
  className?: string;
}

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30",
];

function checkConflict(
  roomId: string,
  date: string,
  start: string,
  end: string,
  bookings: ExistingBooking[],
): ExistingBooking | null {
  return bookings.find(
    (b) =>
      b.roomId === roomId &&
      b.date === date &&
      !(b.endTime <= start || b.startTime >= end),
  ) ?? null;
}

function MeetingRoomBooking({
  rooms,
  existingBookings = [],
  selectedRoom = "",
  onRoomChange,
  date = "",
  onDateChange,
  startTime = "09:00",
  endTime = "10:00",
  onTimeChange,
  title = "",
  onTitleChange,
  attendeeCount = 1,
  onAttendeeCountChange,
  onBook,
  readOnly = false,
  className,
}: MeetingRoomBookingProps) {
  const conflict = checkConflict(selectedRoom, date, startTime, endTime, existingBookings);
  const selectedRoomData = rooms.find((r) => r.id === selectedRoom);
  const capacityWarning = selectedRoomData && attendeeCount > selectedRoomData.capacity;

  const dayBookings = existingBookings.filter(
    (b) => b.roomId === selectedRoom && b.date === date,
  );

  const isSlotBooked = (slot: string): boolean => {
    return dayBookings.some(
      (b) => slot >= b.startTime && slot < b.endTime,
    );
  };

  return (
    <div
      data-slot="meeting-room-booking"
      className={cn("space-y-4 rounded-lg border border-border bg-card p-5", className)}
    >
      {/* Meeting title */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Meeting Title</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          placeholder="Quarterly Review"
          disabled={readOnly}
          aria-label="Meeting title"
        />
      </div>

      {/* Date */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => onDateChange?.(e.target.value)}
          disabled={readOnly}
          aria-label="Booking date"
        />
      </div>

      {/* Room selection */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Select Room</label>
        <div className="grid grid-cols-2 gap-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              data-slot="room-option"
              data-active={selectedRoom === room.id}
              onClick={() => !readOnly && onRoomChange?.(room.id)}
              disabled={readOnly}
              className={cn(
                "flex flex-col items-start rounded-md border p-3 text-left transition-colors",
                selectedRoom === room.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:bg-muted",
              )}
            >
              <span className="text-sm font-medium text-foreground">{room.name}</span>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <UsersIcon className="size-3" />
                  {room.capacity}
                </span>
                {room.floor && <span>• {room.floor}</span>}
              </div>
              {room.equipment && room.equipment.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {room.equipment.map((eq) => (
                    <Badge key={eq} variant="outline" className="text-[9px]">{eq}</Badge>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Time Slot</label>
        <div className="flex items-center gap-2">
          <select
            className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm"
            value={startTime}
            onChange={(e) => onTimeChange?.(e.target.value, endTime)}
            disabled={readOnly}
            aria-label="Start time"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <span className="text-muted-foreground">to</span>
          <select
            className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm"
            value={endTime}
            onChange={(e) => onTimeChange?.(startTime, e.target.value)}
            disabled={readOnly}
            aria-label="End time"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendees */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Attendees</label>
        <Input
          type="number"
          min={1}
          value={attendeeCount}
          onChange={(e) => onAttendeeCountChange?.(parseInt(e.target.value) || 1)}
          disabled={readOnly}
          aria-label="Attendee count"
        />
        {capacityWarning && (
          <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
            <AlertCircleIcon className="size-3" />
            Exceeds room capacity ({selectedRoomData?.capacity})
          </p>
        )}
      </div>

      {/* Conflict warning */}
      {conflict && (
        <div
          data-slot="booking-conflict"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2"
        >
          <AlertCircleIcon className="mt-0.5 size-4 text-destructive" />
          <div className="text-sm">
            <p className="font-medium text-destructive">Time Conflict</p>
            <p className="text-xs text-muted-foreground">
              Room is booked by {conflict.bookedBy} ({conflict.title}) from {conflict.startTime} to {conflict.endTime}
            </p>
          </div>
        </div>
      )}

      {/* Day schedule preview */}
      {selectedRoom && date && dayBookings.length > 0 && (
        <div data-slot="room-schedule">
          <div className="mb-1.5 text-sm font-medium text-foreground">Today's Schedule</div>
          <div className="space-y-1">
            {dayBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                <ClockIcon className="size-3" />
                <span>{b.startTime} - {b.endTime}</span>
                <span className="text-foreground">{b.title}</span>
                <span>({b.bookedBy})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time slot grid */}
      {selectedRoom && date && (
        <div data-slot="slot-grid">
          <div className="mb-1.5 text-sm font-medium text-foreground">Availability</div>
          <div className="grid grid-cols-6 gap-1">
            {TIME_SLOTS.map((slot) => (
              <div
                key={slot}
                className={cn(
                  "rounded px-1 py-0.5 text-center text-[9px]",
                  isSlotBooked(slot)
                    ? "bg-destructive/20 text-destructive"
                    : "bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400",
                )}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!readOnly && onBook && (
        <Button className="w-full" onClick={onBook} disabled={!!conflict || !selectedRoom || !date}>
          Book Room
        </Button>
      )}
    </div>
  );
}

export { MeetingRoomBooking };
export type { MeetingRoomBookingProps, MeetingRoom, ExistingBooking };
