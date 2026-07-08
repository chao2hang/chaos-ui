import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "@/components/ui/time-picker";

const meta = {
  title: "Business/TimePicker",
  component: TimePicker,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;
type TimePickerProps = React.ComponentProps<typeof TimePicker>;

function ControlledTimePicker(args: TimePickerProps) {
  const [value, setValue] = React.useState(args.value);

  return (
    <div className="flex flex-col gap-3">
      <TimePicker
        {...args}
        value={(value ?? "") as string}
        onChange={setValue}
      />
      <p className="text-muted-foreground text-xs">
        Time: <span className="font-mono">{value ?? "none"}</span>
      </p>
    </div>
  );
}

export const Default: Story = {
  args: {
    value: "09:30",
    step: 15,
  },
  render: (args) => <ControlledTimePicker {...args} />,
};

export const TwelveHour: Story = {
  args: {
    value: "2:45 PM",
    format: "12h",
    step: 15,
  },
  render: (args) => <ControlledTimePicker {...args} />,
};

export const Empty: Story = {
  args: {
    placeholder: "Schedule send time",
    step: 30,
  },
  render: (args) => <ControlledTimePicker {...args} />,
};

export const Disabled: Story = {
  args: {
    value: "18:00",
    disabled: true,
  },
};
