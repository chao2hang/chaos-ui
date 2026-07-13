import type { Meta, StoryObj } from "@storybook/react";
import { MobileQrCodeScanner } from "@/components/business/mobile-qrcode-scanner";

const meta = {
  title: "Business/MobileQrCodeScanner",
  component: MobileQrCodeScanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileQrCodeScanner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onScan: (result: unknown) => {
      console.log(result);
    },
  } as any,
};
