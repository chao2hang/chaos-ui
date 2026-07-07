import type { Meta, StoryObj } from "@storybook/react";
import { QRCodeDisplay } from "@/components/ui/qrcode-display";

const meta = {
  title: "Components/QRCodeDisplay",
  component: QRCodeDisplay,
  tags: ["autodocs"],
  args: {
    value: "https://chaos-ui.dev",
    size: 200,
  },
} satisfies Meta<typeof QRCodeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "https://chaos-ui.dev",
    size: 200,
  },
};

export const Small: Story = {
  args: {
    value: "https://example.com",
    size: 128,
  },
};

export const WithText: Story = {
  args: {
    value: "https://chaos-ui.dev",
    size: 200,
    showText: true,
  },
};
