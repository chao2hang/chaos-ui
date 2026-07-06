import type { Meta, StoryObj } from "@storybook/react";
import { SerialNumberManager } from "@/components/business/serial-number-manager";

const meta = { title: "Business/Status/SerialNumberManager", component: SerialNumberManager, tags: ["autodocs"], parameters: { layout: "padded" }, args: { rules: [] } } satisfies Meta<typeof SerialNumberManager>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { rules: [{ prefix: "INV-", dateFormat: "YYYYMMDD", zeroFill: 4, separator: "-" }] } };
