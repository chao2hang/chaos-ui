import type { Meta, StoryObj } from "@storybook/react";
import { ResourceSchedule } from "@/components/business/resource-schedule";

const resources = [
  { id: "1", name: "Room A" },
  { id: "2", name: "Projector" },
  { id: "3", name: "Studio" },
];

const bookings = [
  { resourceId: "1", start: "09:00", end: "10:00", title: "Standup" },
  { resourceId: "1", start: "11:00", end: "12:00", title: "Review" },
  { resourceId: "2", start: "13:00", end: "14:00", title: "Demo" },
  { resourceId: "3", start: "10:00", end: "12:00", title: "Recording" },
];

const meta = {
  title: "Business/BOM/ResourceSchedule",
  component: ResourceSchedule,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { resources: [], bookings: [] },
} satisfies Meta<typeof ResourceSchedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { resources, bookings },
};

export const EmptyBookings: Story = {
  args: { resources, bookings: [] },
};

export const SingleResource: Story = {
  args: {
    resources: resources.slice(0, 1),
    bookings: bookings.filter((b) => b.resourceId === "1"),
  },
};
