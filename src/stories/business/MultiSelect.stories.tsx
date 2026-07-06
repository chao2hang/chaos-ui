import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/business/multi-select";

const segmentOptions: MultiSelectOption[] = [
  {
    value: "vip",
    label: "VIP customers",
    description: "High lifetime value",
    group: "Customer",
  },
  {
    value: "new",
    label: "New signups",
    description: "Joined this week",
    group: "Customer",
  },
  {
    value: "at-risk",
    label: "At-risk users",
    description: "No purchase in 60 days",
    group: "Customer",
  },
  {
    value: "email",
    label: "Email subscribers",
    description: "Can receive campaigns",
    group: "Channel",
  },
  {
    value: "sms",
    label: "SMS subscribers",
    description: "Phone opt-in complete",
    group: "Channel",
  },
  {
    value: "suppressed",
    label: "Suppressed",
    description: "Cannot be contacted",
    disabled: true,
    group: "Compliance",
  },
];

const meta = {
  title: "Business/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;
type MultiSelectProps = React.ComponentProps<typeof MultiSelect>;

function ControlledMultiSelect(args: MultiSelectProps) {
  const [value, setValue] = React.useState(args.value ?? []);

  return (
    <div className="flex max-w-md flex-col gap-3">
      <MultiSelect {...args} value={value} onChange={setValue} />
      <p className="text-muted-foreground text-xs">
        Selected:{" "}
        <span className="font-mono">
          {value.length ? value.join(", ") : "none"}
        </span>
      </p>
    </div>
  );
}

export const Default: Story = {
  args: {
    options: segmentOptions,
    value: ["vip", "email"],
    placeholder: "Select segments",
    searchPlaceholder: "Search segments...",
  },
  render: (args) => <ControlledMultiSelect {...args} />,
};

export const WithOverflow: Story = {
  args: {
    options: segmentOptions,
    value: ["vip", "new", "at-risk", "email", "sms"],
    maxCount: 2,
  },
  render: (args) => <ControlledMultiSelect {...args} />,
};

export const LimitedSelection: Story = {
  args: {
    options: segmentOptions,
    value: ["vip"],
    maxSelected: 2,
    placeholder: "Pick up to two segments",
  },
  render: (args) => <ControlledMultiSelect {...args} />,
};

export const Disabled: Story = {
  args: {
    options: segmentOptions,
    value: ["vip", "sms"],
    disabled: true,
  },
};

export const Empty: Story = {
  args: {
    options: [],
    placeholder: "No segments available",
    emptyText: "No segments found",
  },
  render: (args) => <ControlledMultiSelect {...args} />,
};
