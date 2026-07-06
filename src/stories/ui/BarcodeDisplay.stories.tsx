import type { Meta, StoryObj } from "@storybook/react";
import { BarcodeDisplay } from "@/components/ui/barcode-display";

const meta = {
  title: "Components/BarcodeDisplay",
  component: BarcodeDisplay,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof BarcodeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default barcode with the value shown below the bars. */
export const Default: Story = {
  args: {
    value: "4006381333931",
    showText: true,
  },
};

/** Taller bars, hidden value text. */
export const TallHiddenText: Story = {
  args: {
    value: "012345678905",
    height: 80,
    showText: false,
  },
};

/** Wider bars (barWidth 3) for low-resolution scanners. */
export const WideBars: Story = {
  args: {
    value: "73513537",
    barWidth: 3,
    showText: true,
  },
};

/** Compact barcode — minimal height and width. */
export const Compact: Story = {
  args: {
    value: "12345670",
    height: 30,
    barWidth: 1,
    showText: true,
  },
};
