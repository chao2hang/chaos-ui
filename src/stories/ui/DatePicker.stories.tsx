import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/ui/date-picker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default single-date picker. */
export const Default: Story = {
  args: {
    placeholder: "Select a date",
    onChange: noop,
  },
};

/** Pre-filled with today's date. */
export const WithValue: Story = {
  args: {
    value: new Date("2026-07-06"),
    onChange: noop,
  },
};

/** Custom format string. */
export const CustomFormat: Story = {
  args: {
    value: new Date("2026-07-06"),
    format: "yyyy/MM/dd",
    onChange: noop,
  },
};

/** Large size picker. */
export const Large: Story = {
  args: {
    placeholder: "Large picker",
    size: "lg",
    onChange: noop,
  },
};

/** Disabled state. */
export const Disabled: Story = {
  args: {
    value: new Date("2026-07-06"),
    disabled: true,
  },
};

/** Weekends disabled via `disabledDate`. */
export const WeekendsDisabled: Story = {
  args: {
    placeholder: "Weekends disabled",
    disabledDate: (date) => date.getDay() === 0 || date.getDay() === 6,
    onChange: noop,
  },
};
