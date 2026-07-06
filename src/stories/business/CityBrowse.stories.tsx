import type { Meta, StoryObj } from "@storybook/react";
import { CityBrowse } from "@/components/business/city-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/CityBrowse", component: CityBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof CityBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ code: "BJ", name: "北京" }, { code: "SH", name: "上海" }, { code: "GZ", name: "广州" }] } };
