import type { Meta, StoryObj } from "@storybook/react";
import { BarcodeDisplay } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof BarcodeDisplay> = {
  title: "Business/BarcodeDisplay",
  component: BarcodeDisplay,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    value: "123456789012",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BarcodeDisplay value={"示例内容"} />,
};

export const EAN13: Story = {
  args: {
    value: "5901234123457",
    format: "EAN13",
  },
};

export const CustomSize: Story = {
  args: {
    value: "BARCODE-DEMO",
    format: "CODE128",
    width: 3,
    height: 120,
  },
};

export const Dark: Story = {
  args: {
    value: "123456789012",
  },
  parameters: { backgrounds: { default: "dark" } },
};
