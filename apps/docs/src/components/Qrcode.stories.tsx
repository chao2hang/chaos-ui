import type { Meta, StoryObj } from "@storybook/react";
import { QRCode } from "@/components/ui/qrcode";

const meta: Meta<typeof QRCode> = {
  title: "Components/Qrcode",
  component: QRCode,
  tags: ["autodocs"],
  parameters: { layout: "centered" },

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: "https://chaos-ui.dev", size: 200 },
};

export const Small: Story = {
  args: { value: "https://example.com", size: 128 },
};

export const HighCorrection: Story = {
  args: { value: "https://chaos-ui.dev/docs", size: 200, level: "H" },
};
