import type { Meta, StoryObj } from "@storybook/react";
import { MobileQrCodeScanner } from "@/components/business/mobile-qrcode-scanner";

const meta = {
  title: "Business/Mobile/MobileQrCodeScanner",
  component: MobileQrCodeScanner,
  tags: ["autodocs"],
  parameters: { layout: "pinned" },
} satisfies Meta<typeof MobileQrCodeScanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithScanHandler: Story = {
  args: {
    onScan: (result) => {
      void result;
    },
  },
};
