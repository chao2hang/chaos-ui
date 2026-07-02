import type { Meta, StoryObj } from "@storybook/react";
import { VehicleBooking } from "@/components/business/vehicle-booking";
import type { Vehicle, VehicleBookingEntry } from "@/components/business/vehicle-booking";

const meta = {
  title: "Business/VehicleBooking",
  component: VehicleBooking,
  tags: ["autodocs"],
} satisfies Meta<typeof VehicleBooking>;
export default meta;
type Story = StoryObj<typeof meta>;

const vehicles: Vehicle[] = [
  { id: "v1", plate: "京A-12345", model: "Toyota Camry", seats: 5, type: "sedan", status: "available", fuelLevel: 85 },
  { id: "v2", plate: "京A-23456", model: "Honda CR-V", seats: 7, type: "suv", status: "available", fuelLevel: 72 },
  { id: "v3", plate: "京B-34567", model: "Ford Transit", seats: 15, type: "van", status: "in_use", fuelLevel: 45 },
  { id: "v4", plate: "京C-45678", model: "Mercedes Sprinter", seats: 20, type: "bus", status: "available", fuelLevel: 90 },
  { id: "v5", plate: "京D-56789", model: "Isuzu Truck", seats: 3, type: "truck", status: "maintenance", fuelLevel: 20 },
];

const bookings: VehicleBookingEntry[] = [
  { id: "b1", vehicleId: "v1", applicant: "Alice Wang", destination: "Capital Airport T3", startTime: "2026-07-01T08:00", endTime: "2026-07-01T12:00", passengers: 3, driver: "Zhang", status: "approved" },
  { id: "b2", vehicleId: "v1", applicant: "Bob Li", destination: "Client HQ — Shanghai", startTime: "2026-07-03T06:00", endTime: "2026-07-03T22:00", passengers: 4, status: "pending" },
  { id: "b3", vehicleId: "v2", applicant: "Carol Zhang", destination: "Regional Office", startTime: "2026-07-02T09:00", endTime: "2026-07-02T17:00", passengers: 5, status: "approved" },
];

export const Default: Story = {
  args: { vehicles, bookings },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};

export const NoBookings: Story = {
  args: { vehicles, bookings: [] },
};
