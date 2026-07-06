import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "@/components/ui/countdown";

const meta = {
  title: "Components/Countdown",
  component: Countdown,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** One-hour countdown with days hidden. */
export const OneHour: Story = {
  args: {
    target: Date.now() + 1000 * 60 * 60,
    days: false,
    onFinish: noop,
  },
};

/** 3-day countdown with the days field shown. */
export const ThreeDays: Story = {
  args: {
    target: Date.now() + 1000 * 60 * 60 * 24 * 3,
    days: true,
    onFinish: noop,
  },
};

/** Short 90-second countdown — HH:MM:SS without days. */
export const NinetySeconds: Story = {
  args: {
    target: Date.now() + 1000 * 90,
    days: false,
    onFinish: noop,
  },
};

/** Already-expired target — calls onFinish immediately. */
export const Expired: Story = {
  args: {
    target: Date.now() - 1000,
    days: false,
    onFinish: noop,
  },
};
