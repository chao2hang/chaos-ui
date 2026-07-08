import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "@/components/ui/countdown";

const meta: Meta<typeof Countdown> = {
  title: "Components/Countdown",
  component: Countdown,
  tags: ["autodocs"],
  parameters: { layout: "centered" },

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const target = React.useMemo(() => Date.now() + 3600 * 1000, []);
    return <Countdown target={target} />;
  },
};

export const Finished: Story = {
  args: {
    target: Date.now() - 1000,
    finishedText: "Expired!",
  },
};
