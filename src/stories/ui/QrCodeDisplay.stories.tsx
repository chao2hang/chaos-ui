import type { Meta, StoryObj } from "@storybook/react";
import { QrCodeDisplay } from "@/components/ui/qrcode-display";

const meta = {
  title: "Components/QrCodeDisplay",
  component: QrCodeDisplay,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof QrCodeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: "https://chaos-ui.example.com", showText: true },
};

export const HiddenText: Story = {
  args: { value: "https://chaos-ui.example.com" },
};

export const Large: Story = {
  args: { value: "https://chaos-ui.example.com", size: 240, showText: true },
};

export const Compact: Story = {
  args: { value: "https://chaos-ui.example.com", size: 96, showText: true },
};

export const WiFiPayload: Story = {
  args: {
    value: "WIFI:T:WPA;S:ChaosGuest;P:welcome2026;;",
    size: 160,
    showText: true,
  },
};
