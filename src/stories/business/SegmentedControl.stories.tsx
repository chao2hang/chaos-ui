import type { Meta, StoryObj } from "@storybook/react";
import { BarChart3Icon, CalendarIcon, TableIcon } from "@/components/ui/icons";
import { SegmentedControl } from "@/components/business/segmented-control";

const viewOptions = [
  { value: "table", label: "Table", icon: <TableIcon /> },
  { value: "chart", label: "Chart", icon: <BarChart3Icon /> },
  { value: "calendar", label: "Calendar", icon: <CalendarIcon /> },
];

const meta = {
  title: "Business/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    options: viewOptions,
    defaultValue: "table",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl options={viewOptions} defaultValue="table" size="sm" />
      <SegmentedControl options={viewOptions} defaultValue="chart" />
      <SegmentedControl
        options={viewOptions}
        defaultValue="calendar"
        size="lg"
      />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    options: viewOptions,
    defaultValue: "chart",
    orientation: "vertical",
  },
};

export const DisabledOption: Story = {
  args: {
    options: [
      ...viewOptions.slice(0, 2),
      {
        value: "calendar",
        label: "Calendar",
        icon: <CalendarIcon />,
        disabled: true,
      },
    ],
    defaultValue: "table",
  },
};
