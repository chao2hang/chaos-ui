import type { Meta, StoryObj } from "@storybook/react";
import { MeetingRoomBooking } from "@/components/business/meeting-room-booking";
import type { MeetingRoom, ExistingBooking } from "@/components/business/meeting-room-booking";

const meta = {
  title: "Business/MeetingRoomBooking",
  component: MeetingRoomBooking,
  tags: ["autodocs"],
} satisfies Meta<typeof MeetingRoomBooking>;

export default meta;
type Story = StoryObj<typeof meta>;

const rooms: MeetingRoom[] = [
  { id: "r1", name: "Conference A", capacity: 12, floor: "3F", equipment: ["Projector", "Whiteboard"] },
  { id: "r2", name: "Huddle B", capacity: 6, floor: "3F", equipment: ["TV"] },
  { id: "r3", name: "Boardroom", capacity: 20, floor: "5F", equipment: ["Projector", "Video", "Audio"] },
  { id: "r4", name: "Training Room", capacity: 30, floor: "B1", equipment: ["Projector"] },
];

const bookings: ExistingBooking[] = [
  { id: "b1", roomId: "r1", date: "2026-07-02", startTime: "09:00", endTime: "10:00", bookedBy: "Alice", title: "Daily Standup" },
  { id: "b2", roomId: "r1", date: "2026-07-02", startTime: "14:00", endTime: "15:30", bookedBy: "Bob", title: "Sprint Review" },
  { id: "b3", roomId: "r3", date: "2026-07-02", startTime: "10:00", endTime: "12:00", bookedBy: "Carol", title: "Board Meeting" },
];

export const Default: Story = {
  args: { rooms, existingBookings: bookings, selectedRoom: "r1", date: "2026-07-02", startTime: "10:00", endTime: "11:00", title: "Project Sync", attendeeCount: 8 },
};

export const Conflict: Story = {
  args: { rooms, existingBookings: bookings, selectedRoom: "r1", date: "2026-07-02", startTime: "09:30", endTime: "10:30", title: "Conflicting Meeting", attendeeCount: 5 },
};

export const Empty: Story = {
  args: { rooms },
};
