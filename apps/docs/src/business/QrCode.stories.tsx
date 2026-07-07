import type { Meta, StoryObj } from "@storybook/react";
import { QRCode } from "@/components/business/qr-code";

const meta = {
  title: "Business/QrCode",
  component: QRCode,
  tags: ["autodocs"],
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
