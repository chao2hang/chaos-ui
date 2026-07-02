import type { Meta, StoryObj } from "@storybook/react";
import { AttendanceCalendar } from "@/components/business/attendance-calendar";
import type { AttendanceRecord } from "@/components/business/attendance-calendar";

const meta = {
  title: "Business/AttendanceCalendar",
  component: AttendanceCalendar,
  tags: ["autodocs"],
} satisfies Meta<typeof AttendanceCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const records: AttendanceRecord[] = [
  { date: "2026-07-01", status: "present", checkIn: "08:55", checkOut: "18:02", workHours: 9 },
  { date: "2026-07-02", status: "late", checkIn: "09:30", checkOut: "18:00", note: "Traffic delay" },
  { date: "2026-07-03", status: "present", checkIn: "08:50", checkOut: "18:10" },
  { date: "2026-07-06", status: "absent", note: "No-show" },
  { date: "2026-07-07", status: "leave", note: "Annual leave" },
  { date: "2026-07-08", status: "present", checkIn: "08:45", checkOut: "18:00" },
  { date: "2026-07-09", status: "present", checkIn: "08:58", checkOut: "18:05" },
  { date: "2026-07-10", status: "present", checkIn: "08:52", checkOut: "17:30" },
  { date: "2026-07-13", status: "late", checkIn: "09:45", checkOut: "18:30", note: "Overslept" },
  { date: "2026-07-14", status: "present", checkIn: "08:48", checkOut: "18:00" },
  { date: "2026-07-15", status: "present", checkIn: "08:55", checkOut: "18:02" },
  { date: "2026-07-16", status: "leave", note: "Sick leave" },
  { date: "2026-07-20", status: "holiday", note: "Company anniversary" },
  { date: "2026-07-21", status: "present", checkIn: "08:50", checkOut: "18:00" },
  { date: "2026-07-22", status: "present", checkIn: "08:53", checkOut: "18:10" },
  { date: "2026-07-23", status: "absent", note: "Unexcused" },
  { date: "2026-07-27", status: "present", checkIn: "08:47", checkOut: "18:00" },
  { date: "2026-07-28", status: "late", checkIn: "10:00", checkOut: "19:00", note: "Doctor appointment" },
  { date: "2026-07-29", status: "present", checkIn: "08:55", checkOut: "18:05" },
  { date: "2026-07-30", status: "present", checkIn: "08:50", checkOut: "18:00" },
];

export const Default: Story = { args: { records, year: 2026, month: 6 } };
export const Empty: Story = { args: { records: [], year: 2026, month: 6 } };
