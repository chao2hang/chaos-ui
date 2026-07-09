"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { CalendarIcon, CarIcon, ClockIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component VehicleBooking
 * @category business/admin
 * @since 1.0.0
 * @description Vehicle booking system with vehicle list, time slot selection,
 * conflict detection, driver assignment, and booking confirmation.
 * @keywords vehicle, booking, car, fleet, reservation, driver, admin
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Vehicle in the fleet. */
interface Vehicle {
  id: string;
  /** License plate. */
  plate: string;
  /** Vehicle model. */
  model: string;
  /** Seat capacity. */
  seats: number;
  /** Vehicle type. */
  type: "sedan" | "suv" | "van" | "bus" | "truck";
  /** Status. */
  status: "available" | "in_use" | "maintenance";
  /** Fuel level 0–100. */
  fuelLevel?: number;
}

/** A booking entry. */
interface VehicleBookingEntry {
  id: string;
  vehicleId: string;
  /** Applicant name. */
  applicant: string;
  /** Department. */
  department?: string;
  /** Destination. */
  destination: string;
  /** Start datetime (ISO). */
  startTime: string;
  /** End datetime (ISO). */
  endTime: string;
  /** Assigned driver. */
  driver?: string;
  /** Number of passengers. */
  passengers: number;
  /** Purpose. */
  purpose?: string;
  /** Status. */
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled";
}

/** Props for VehicleBooking. */
interface VehicleBookingProps {
  /** Available vehicles. */
  vehicles: Vehicle[];
  /** Existing bookings for conflict detection. */
  bookings: VehicleBookingEntry[];
  /** Submit handler. */
  onSubmit?: (booking: Omit<VehicleBookingEntry, "id" | "status">) => void;
  /** Cancel handler. */
  onCancel?: () => void;
  /** Read-only mode. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const typeLabels: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  van: "Van",
  bus: "Bus",
  truck: "Truck",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  available: { label: "Available", className: "text-emerald-600" },
  in_use: { label: "In Use", className: "text-amber-600" },
  maintenance: { label: "Maintenance", className: "text-destructive" },
};

const bookingStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  approved: {
    label: "Approved",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
};

/** Check if two time ranges overlap. */
function timeOverlaps(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** Detect conflicts for a specific vehicle and time range. */
function findConflicts(
  bookings: VehicleBookingEntry[],
  vehicleId: string,
  startTime: string,
  endTime: string,
  excludeId?: string,
): VehicleBookingEntry[] {
  return bookings.filter(
    (b) =>
      b.vehicleId === vehicleId &&
      b.id !== excludeId &&
      (b.status === "approved" || b.status === "pending") &&
      timeOverlaps(startTime, endTime, b.startTime, b.endTime),
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function VehicleBooking({
  vehicles = [],
  bookings = [],
  onSubmit,
  onCancel,
  readOnly = false,
  className,
}: VehicleBookingProps) {
  // Form state
  const [selectedVehicle, setSelectedVehicle] = React.useState<string>("");
  const [applicant, setApplicant] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [passengers, setPassengers] = React.useState(1);
  const [driver, setDriver] = React.useState("");
  const [purpose, setPurpose] = React.useState("");

  // Conflict detection
  const conflicts = React.useMemo(() => {
    if (!selectedVehicle || !startTime || !endTime) return [];
    return findConflicts(bookings, selectedVehicle, startTime, endTime);
  }, [bookings, selectedVehicle, startTime, endTime]);

  const hasConflict = conflicts.length > 0;
  const endTimeBeforeStart = startTime && endTime && endTime <= startTime;

  const canSubmit =
    !readOnly &&
    selectedVehicle &&
    applicant &&
    destination &&
    startTime &&
    endTime &&
    !hasConflict &&
    !endTimeBeforeStart;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({
      vehicleId: selectedVehicle,
      applicant,
      destination,
      startTime,
      endTime,
      passengers,
      ...(driver ? { driver } : {}),
      ...(purpose ? { purpose } : {}),
    });
  };

  const selectedVehicleObj = vehicles.find((v) => v.id === selectedVehicle);

  return (
    <div
      data-slot="vehicle-booking"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-center gap-2 border-b pb-3">
        <CarIcon className="text-primary size-5" />
        <h3 className="text-foreground text-lg font-semibold">
          Vehicle Booking
        </h3>
      </div>

      {/* Vehicle selection */}
      <div>
        <label className="text-foreground mb-1.5 block text-sm font-medium">
          Select Vehicle
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => {
            const isSelected = selectedVehicle === v.id;
            const statusInfo = (statusConfig[v.status] ??
              statusConfig.available)!;
            return (
              <button
                key={v.id}
                type="button"
                data-slot="vehicle-option"
                data-active={isSelected}
                disabled={readOnly || v.status === "maintenance"}
                onClick={() => setSelectedVehicle(v.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:bg-muted/30",
                  v.status === "maintenance" && "cursor-not-allowed opacity-50",
                )}
              >
                <div className="bg-muted flex size-10 items-center justify-center rounded-lg text-xl">
                  🚗
                </div>
                <div className="flex-1">
                  <div className="text-foreground text-sm font-medium">
                    {v.model}
                  </div>
                  <div className="text-muted-foreground font-mono text-xs">
                    {v.plate}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {typeLabels[v.type]}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {v.seats} seats
                    </span>
                    <span className={cn("font-medium", statusInfo.className)}>
                      · {statusInfo.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking form */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Applicant
          </label>
          <Input
            value={applicant}
            onChange={(e) => setApplicant(e.target.value)}
            disabled={readOnly}
            aria-label="Applicant name"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Destination
          </label>
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={readOnly}
            aria-label="Destination"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Start Time
          </label>
          <div className="relative">
            <ClockIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              type="datetime-local"
              className="pl-8"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={readOnly}
              aria-label="Start time"
            />
          </div>
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            End Time
          </label>
          <div className="relative">
            <ClockIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              type="datetime-local"
              className="pl-8"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={readOnly}
              aria-label="End time"
            />
          </div>
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Passengers
          </label>
          <Input
            type="number"
            min={1}
            max={selectedVehicleObj?.seats ?? 50}
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
            disabled={readOnly}
            aria-label="Passengers"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Driver (optional)
          </label>
          <Input
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            disabled={readOnly}
            aria-label="Driver"
          />
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label className="text-muted-foreground mb-1 block text-xs font-medium">
          Purpose
        </label>
        <textarea
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
          rows={2}
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          disabled={readOnly}
          aria-label="Purpose"
        />
      </div>

      {/* Conflict warning */}
      {endTimeBeforeStart && (
        <div
          className="border-destructive/30 bg-destructive/5 text-destructive rounded-md border px-3 py-2 text-xs"
          data-slot="time-error"
        >
          End time must be after start time
        </div>
      )}
      {hasConflict && (
        <div
          className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2"
          data-slot="conflict-warning"
        >
          <div className="text-xs font-medium text-amber-700 dark:text-amber-400">
            ⚠ {conflicts.length} booking conflict
            {conflicts.length > 1 ? "s" : ""} detected:
          </div>
          {conflicts.map((c) => (
            <div
              key={c.id}
              className="mt-1 text-xs text-amber-600 dark:text-amber-500"
            >
              {c.applicant}: {c.startTime} → {c.endTime} ({c.destination})
            </div>
          ))}
        </div>
      )}

      {/* Existing bookings for selected vehicle */}
      {selectedVehicle && (
        <div data-slot="vehicle-bookings">
          <h4 className="text-foreground mb-2 text-sm font-semibold">
            Existing Bookings
          </h4>
          <div className="space-y-1.5">
            {bookings
              .filter(
                (b) =>
                  b.vehicleId === selectedVehicle &&
                  (b.status === "approved" || b.status === "pending"),
              )
              .map((b) => {
                const cfg = (bookingStatusConfig[b.status] ??
                  bookingStatusConfig.pending)!;
                return (
                  <div
                    key={b.id}
                    data-slot="booking-entry"
                    className="border-border bg-muted/20 flex items-center gap-2 rounded-md border px-3 py-1.5"
                  >
                    <CalendarIcon className="text-muted-foreground size-4" />
                    <span className="text-foreground flex-1 text-sm">
                      {b.applicant}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {b.startTime} → {b.endTime}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        cfg.className,
                      )}
                    >
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            {bookings.filter(
              (b) =>
                b.vehicleId === selectedVehicle &&
                (b.status === "approved" || b.status === "pending"),
            ).length === 0 && (
              <div className="text-muted-foreground py-2 text-center text-xs">
                No existing bookings
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {!readOnly && (
        <div className="border-border flex justify-end gap-2 border-t pt-3">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Submit Booking
          </Button>
        </div>
      )}
    </div>
  );
}

export { VehicleBooking };
export type { VehicleBookingProps, Vehicle, VehicleBookingEntry };
