import type { Meta, StoryObj } from "@storybook/react";
import { RedPacket } from "@/components/business/red-packet";

const meta = { title: "Business/Status/RedPacket", component: RedPacket, tags: ["autodocs"], parameters: { layout: "padded" }, args: { label: "" } } satisfies Meta<typeof RedPacket>;
export default meta; type Story = StoryObj<typeof meta>;
const noop = () => {};
export const Default: Story = { args: { label: "¥8.88", subtitle: "新年快乐", onOpen: noop } };
export const Opened: Story = { args: { label: "¥6.66", opened: true } };
