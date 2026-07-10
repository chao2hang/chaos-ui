import type { Meta, StoryObj } from "@storybook/react";
import { QRCode } from "@/components/business/qr-code";

const meta: Meta<typeof QRCode> = {
  title: "Business/QRCode",
  component: QRCode,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    value: "https://example.com",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <QRCode value={"示例内容"} />,
};

export const CustomSize: Story = {
  args: {
    value: "https://example.com",
    size: 300,
  },
};

export const ErrorCorrectionLevels: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <div className="text-center">
        <QRCode value="https://example.com" level="L" size={120} />
        <p className="text-muted-foreground mt-1 text-xs">L (Low)</p>
      </div>
      <div className="text-center">
        <QRCode value="https://example.com" level="M" size={120} />
        <p className="text-muted-foreground mt-1 text-xs">M (Medium)</p>
      </div>
      <div className="text-center">
        <QRCode value="https://example.com" level="Q" size={120} />
        <p className="text-muted-foreground mt-1 text-xs">Q (Quartile)</p>
      </div>
      <div className="text-center">
        <QRCode value="https://example.com" level="H" size={120} />
        <p className="text-muted-foreground mt-1 text-xs">H (High)</p>
      </div>
    </div>
  ),
};

export const Dark: Story = {
  args: {
    value: "https://example.com",
    fgColor: "#ffffff",
    bgColor: "#1a1a1a",
  },
  parameters: { backgrounds: { default: "dark" } },
};
