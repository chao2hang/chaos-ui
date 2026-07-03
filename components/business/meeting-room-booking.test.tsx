import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MeetingRoomBooking } from "./meeting-room-booking";
import type { MeetingRoom, ExistingBooking } from "./meeting-room-booking";

vi.mock("@/components/ui/icons", () => ({
  AlertCircleIcon: (p: Record<string, unknown>) => (
    <svg data-testid="alert" {...p} />
  ),
  UsersIcon: (p: Record<string, unknown>) => <svg data-testid="users" {...p} />,
  ClockIcon: (p: Record<string, unknown>) => <svg data-testid="clock" {...p} />,
}));

const rooms: MeetingRoom[] = [
  {
    id: "r1",
    name: "Conference A",
    capacity: 12,
    floor: "3F",
    equipment: ["Projector", "Whiteboard"],
  },
  { id: "r2", name: "Huddle B", capacity: 6, floor: "3F", equipment: ["TV"] },
  {
    id: "r3",
    name: "Boardroom",
    capacity: 20,
    floor: "5F",
    equipment: ["Projector", "Video"],
  },
];

const bookings: ExistingBooking[] = [
  {
    id: "b1",
    roomId: "r1",
    date: "2026-07-02",
    startTime: "09:00",
    endTime: "10:00",
    bookedBy: "Alice",
    title: "Standup",
  },
  {
    id: "b2",
    roomId: "r1",
    date: "2026-07-02",
    startTime: "14:00",
    endTime: "15:30",
    bookedBy: "Bob",
    title: "Review",
  },
];

describe("MeetingRoomBooking", () => {
  it("renders with data-slot", () => {
    const { container } = render(<MeetingRoomBooking rooms={rooms} />);
    expect(
      container.querySelector('[data-slot="meeting-room-booking"]'),
    ).toBeTruthy();
  });

  it("renders room options", () => {
    render(<MeetingRoomBooking rooms={rooms} />);
    expect(screen.getByText("Conference A")).toBeTruthy();
    expect(screen.getByText("Huddle B")).toBeTruthy();
    expect(screen.getByText("Boardroom")).toBeTruthy();
  });

  it("shows room capacity", () => {
    render(<MeetingRoomBooking rooms={rooms} />);
    expect(screen.getByText("12")).toBeTruthy();
    expect(screen.getByText("6")).toBeTruthy();
    expect(screen.getByText("20")).toBeTruthy();
  });

  it("calls onRoomChange when room is selected", () => {
    const onRoomChange = vi.fn();
    render(<MeetingRoomBooking rooms={rooms} onRoomChange={onRoomChange} />);
    fireEvent.click(screen.getByText("Conference A"));
    expect(onRoomChange).toHaveBeenCalledWith("r1");
  });

  it("detects booking conflict", () => {
    render(
      <MeetingRoomBooking
        rooms={rooms}
        existingBookings={bookings}
        selectedRoom="r1"
        date="2026-07-02"
        startTime="09:30"
        endTime="10:30"
      />,
    );
    expect(screen.getByText("Time Conflict")).toBeTruthy();
    // "Alice" appears in both the conflict warning and the schedule preview.
    expect(screen.getAllByText(/Alice/).length).toBeGreaterThan(0);
  });

  it("no conflict when times do not overlap", () => {
    render(
      <MeetingRoomBooking
        rooms={rooms}
        existingBookings={bookings}
        selectedRoom="r1"
        date="2026-07-02"
        startTime="10:00"
        endTime="11:00"
      />,
    );
    expect(screen.queryByText("Time Conflict")).toBeNull();
  });

  it("disables book button when conflict exists", () => {
    const onBook = vi.fn();
    render(
      <MeetingRoomBooking
        rooms={rooms}
        existingBookings={bookings}
        selectedRoom="r1"
        date="2026-07-02"
        startTime="09:30"
        endTime="10:30"
        onBook={onBook}
      />,
    );
    expect(screen.getByText("Book Room")).toBeDisabled();
  });

  it("shows capacity warning", () => {
    render(
      <MeetingRoomBooking rooms={rooms} selectedRoom="r2" attendeeCount={10} />,
    );
    expect(screen.getByText(/Exceeds room capacity/)).toBeTruthy();
  });

  it("shows schedule preview when room and date are selected", () => {
    render(
      <MeetingRoomBooking
        rooms={rooms}
        existingBookings={bookings}
        selectedRoom="r1"
        date="2026-07-02"
      />,
    );
    expect(screen.getByText("Today's Schedule")).toBeTruthy();
    expect(screen.getByText("Standup")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MeetingRoomBooking rooms={rooms} className="custom-booking" />,
    );
    const el = container.querySelector(
      '[data-slot="meeting-room-booking"]',
    ) as HTMLElement;
    expect(el.className).toContain("custom-booking");
  });
});
