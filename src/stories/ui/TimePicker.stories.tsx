import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker } from "@/components/ui/time-picker";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs", "a11y"],
  argTypes: {
    step: {
      control: "select",
      options: [1, 5, 10, 15, 30, 60],
    },
    format: {
      control: "radio",
      options: ["12h", "24h"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <TimePicker
        {...(value !== undefined ? { value } : {})}
        onChange={setValue}
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>("09:30");
    return <TimePicker value={value} onChange={setValue} />;
  },
};

export const TwelveHour: Story = {
  render: () => {
    const [value, setValue] = useState<string>("02:30 PM");
    return <TimePicker value={value} onChange={setValue} format="12h" />;
  },
};

export const WithStep15: Story = {
  render: () => {
    const [value, setValue] = useState<string>("10:00");
    return <TimePicker value={value} onChange={setValue} step={15} />;
  },
};

export const Disabled: Story = {
  args: {
    value: "09:30",
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <TimePicker
        {...(value !== undefined ? { value } : {})}
        onChange={setValue}
        placeholder="Pick a time"
      />
    );
  },
};
