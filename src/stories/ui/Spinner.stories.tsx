import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/components/ui/spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const WithLabel: Story = {
  args: { label: "Loading…" },
};

export const DotsVariant: Story = {
  args: { variant: "dots", label: "dots" },
};

export const BarsVariant: Story = {
  args: { variant: "bars", label: "bars" },
};

export const Destructive: Story = {
  args: { color: "destructive", label: "error" },
};
