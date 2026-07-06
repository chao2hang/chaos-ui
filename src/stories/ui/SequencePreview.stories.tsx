import type { Meta, StoryObj } from "@storybook/react";
import { SequencePreview } from "@/components/ui/sequence-preview";

const meta = {
  title: "Components/SequencePreview",
  component: SequencePreview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SequencePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefix: "INV",
    date: new Date("2026-07-06"),
    dateFormat: "YYYYMMDD",
    seq: 42,
    zeroFill: 4,
  },
};

export const ShortDate: Story = {
  args: {
    prefix: "SO",
    date: new Date("2026-07-06"),
    dateFormat: "YYMMDD",
    seq: 7,
    zeroFill: 6,
  },
};

export const NoDate: Story = {
  args: {
    prefix: "ORD",
    dateFormat: "none",
    seq: 128,
    zeroFill: 5,
  },
};

export const CustomSeparator: Story = {
  args: {
    prefix: "PO",
    date: new Date("2026-07-06"),
    dateFormat: "YYYYMMDD",
    seq: 9,
    zeroFill: 3,
    separator: "_",
  },
};

export const PrefixOnly: Story = {
  args: {
    prefix: "TKT",
    seq: 1,
    zeroFill: 8,
  },
};
