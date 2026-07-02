import type { Meta, StoryObj } from "@storybook/react";
import {
  ShiftCalendar,
  type ShiftType,
  type Employee,
  type ShiftAssignment,
} from "@/components/business/shift-calendar";

const shiftTypes: ShiftType[] = [
  { id: "morning", label: "Morning", color: "bg-blue-500", hours: 8, startTime: "06:00", endTime: "14:00" },
  { id: "afternoon", label: "Afternoon", color: "bg-green-500", hours: 8, startTime: "14:00", endTime: "22:00" },
  { id: "night", label: "Night", color: "bg-purple-500", hours: 10, startTime: "22:00", endTime: "06:00" },
];

const employees: Employee[] = [
  { id: "emp-1", name: "Alice Wang", department: "Assembly" },
  { id: "emp-2", name: "Bob Li", department: "Packaging" },
  { id: "emp-3", name: "Carol Zhang", department: "Assembly" },
  { id: "emp-4", name: "David Chen", department: "QC" },
  { id: "emp-5", name: "Eve Zhao", department: "Warehouse" },
];

const assignments: ShiftAssignment[] = [
  { id: "a-1", date: "2025-01-06", employeeId: "emp-1", shiftTypeId: "morning" },
  { id: "a-2", date: "2025-01-06", employeeId: "emp-2", shiftTypeId: "afternoon" },
  { id: "a-3", date: "2025-01-06", employeeId: "emp-3", shiftTypeId: "night" },
  { id: "a-4", date: "2025-01-07", employeeId: "emp-1", shiftTypeId: "morning" },
  { id: "a-5", date: "2025-01-07", employeeId: "emp-2", shiftTypeId: "morning" },
  { id: "a-6", date: "2025-01-08", employeeId: "emp-1", shiftTypeId: "afternoon" },
  { id: "a-7", date: "2025-01-08", employeeId: "emp-3", shiftTypeId: "morning" },
  { id: "a-8", date: "2025-01-08", employeeId: "emp-4", shiftTypeId: "night" },
  { id: "a-9", date: "2025-01-09", employeeId: "emp-2", shiftTypeId: "night" },
  { id: "a-10", date: "2025-01-10", employeeId: "emp-5", shiftTypeId: "morning" },
  { id: "a-11", date: "2025-01-13", employeeId: "emp-1", shiftTypeId: "morning" },
  { id: "a-12", date: "2025-01-13", employeeId: "emp-4", shiftTypeId: "afternoon" },
  { id: "a-13", date: "2025-01-14", employeeId: "emp-2", shiftTypeId: "morning" },
  { id: "a-14", date: "2025-01-15", employeeId: "emp-3", shiftTypeId: "afternoon" },
];

const meta = {
  title: "Business/ShiftCalendar",
  component: ShiftCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ShiftCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shiftTypes,
    employees,
    assignments,
    initialMonth: new Date(2025, 0, 1),
    onAssign: (date, employeeId, shiftTypeId) =>
      console.log("Assign:", { date, employeeId, shiftTypeId }),
    onRemove: (date, employeeId) =>
      console.log("Remove:", { date, employeeId }),
  },
};

export const ReadOnly: Story = {
  args: {
    shiftTypes,
    employees,
    assignments,
    initialMonth: new Date(2025, 0, 1),
    readOnly: true,
  },
};

export const ShowSummary: Story = {
  args: {
    shiftTypes,
    employees,
    assignments,
    initialMonth: new Date(2025, 0, 1),
    showSummary: true,
    onAssign: (date, employeeId, shiftTypeId) =>
      console.log("Assign:", { date, employeeId, shiftTypeId }),
    onRemove: (date, employeeId) =>
      console.log("Remove:", { date, employeeId }),
  },
};

export const DarkMode: Story = {
  args: {
    shiftTypes,
    employees,
    assignments,
    initialMonth: new Date(2025, 0, 1),
    showFilter: true,
    showSummary: true,
  },
  parameters: {
    themes: { themeOverride: "dark" },
  },
};
