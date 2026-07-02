import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleBooking } from "./vehicle-booking";
import type { Vehicle, VehicleBookingEntry } from "./vehicle-booking";

vi.mock("@/components/ui/icons", () => ({
  CalendarIcon: (p: Record<string, unknown>) => <svg data-testid="cal" {...p} />,
  CarIcon: (p: Record<string, unknown>) => <svg data-testid="car" {...p} />,
  ClockIcon: (p: Record<string, unknown>) => <svg data-testid="clock" {...p} />,
}));

const vehicles: Vehicle[] = [
  { id: "v1", plate: "京A-12345", model: "Toyota Camry", seats: 5, type: "sedan", status: "available", fuelLevel: 80 },
  { id: "v2", plate: "京B-67890", model: "Honda CR-V", seats: 7, type: "suv", status: "in_use", fuelLevel: 60 },
  { id: "v3", plate: "京C-11111", model: "Ford Transit", seats: 15, type: "van", status: "maintenance", fuelLevel: 30 },
];

const bookings: VehicleBookingEntry[] = [
  { id: "b1", vehicleId: "v1", applicant: "Dave", destination: "Airport", startTime: "2026-07-01T08:00", endTime: "2026-07-01T12:00", passengers: 3, status: "approved" },
  { id: "b2", vehicleId: "v1", applicant: "Eve", destination: "Client Site", startTime: "2026-07-02T09:00", endTime: "2026-07-02T17:00", passengers: 2, status: "pending" },
];

describe("VehicleBooking", () => {
  it("renders with data-slot", () => {
    const { container } = render(<VehicleBooking vehicles={vehicles} bookings={[]} />);
    expect(container.querySelector('[data-slot="vehicle-booking"]')).toBeTruthy();
  });

  it("renders title", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={[]} />);
    expect(screen.getByText("Vehicle Booking")).toBeTruthy();
  });

  it("renders all vehicle options", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={[]} />);
    expect(screen.getByText("Toyota Camry")).toBeTruthy();
    expect(screen.getByText("Honda CR-V")).toBeTruthy();
    expect(screen.getByText("Ford Transit")).toBeTruthy();
  });

  it("renders plate numbers", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={[]} />);
    expect(screen.getByText("京A-12345")).toBeTruthy();
    expect(screen.getByText("京B-67890")).toBeTruthy();
  });

  it("disables maintenance vehicles", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={[]} />);
    const transitBtn = screen.getByText("Ford Transit").closest("button");
    expect(transitBtn).toBeDisabled();
  });

  it("renders existing bookings when vehicle selected", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={bookings} />);
    // Click on v1
    fireEvent.click(screen.getByText("Toyota Camry"));
    expect(screen.getByText("Existing Bookings")).toBeTruthy();
    expect(screen.getByText("Dave")).toBeTruthy();
    expect(screen.getByText("Eve")).toBeTruthy();
  });

  it("shows conflict warning when time overlaps", () => {
    const { container } = render(<VehicleBooking vehicles={vehicles} bookings={bookings} />);
    // Select v1
    fireEvent.click(screen.getByText("Toyota Camry"));
    // Set conflicting time
    const startInput = container.querySelector('[aria-label="Start time"]') as HTMLInputElement;
    const endInput = container.querySelector('[aria-label="End time"]') as HTMLInputElement;
    fireEvent.change(startInput, { target: { value: "2026-07-01T09:00" } });
    fireEvent.change(endInput, { target: { value: "2026-07-01T11:00" } });
    // Wait for conflict detection
    const warning = container.querySelector('[data-slot="conflict-warning"]');
    expect(warning).toBeTruthy();
  });

  it("disables submit when no vehicle selected", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={[]} onSubmit={() => {}} />);
    expect(screen.getByText("Submit Booking")).toBeDisabled();
  });

  it("calls onSubmit with booking data", () => {
    const onSubmit = vi.fn();
    const { container } = render(<VehicleBooking vehicles={vehicles} bookings={[]} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Toyota Camry"));
    fireEvent.change(container.querySelector('[aria-label="Applicant name"]')!, { target: { value: "Alice" } });
    fireEvent.change(container.querySelector('[aria-label="Destination"]')!, { target: { value: "Office" } });
    fireEvent.change(container.querySelector('[aria-label="Start time"]')!, { target: { value: "2026-07-05T08:00" } });
    fireEvent.change(container.querySelector('[aria-label="End time"]')!, { target: { value: "2026-07-05T12:00" } });
    fireEvent.click(screen.getByText("Submit Booking"));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      vehicleId: "v1",
      applicant: "Alice",
      destination: "Office",
    }));
  });

  it("hides actions in read-only mode", () => {
    render(<VehicleBooking vehicles={vehicles} bookings={[]} readOnly onSubmit={() => {}} />);
    expect(screen.queryByText("Submit Booking")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<VehicleBooking vehicles={vehicles} bookings={[]} className="my-vb" />);
    const el = container.querySelector('[data-slot="vehicle-booking"]') as HTMLElement;
    expect(el.className).toContain("my-vb");
  });
});
