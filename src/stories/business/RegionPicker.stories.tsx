import type { Meta, StoryObj } from "@storybook/react";
import { RegionPicker } from "@/components/business/region-picker";

const meta = { title: "Business/Pickers/RegionPicker", component: RegionPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof RegionPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "cn", label: "China" }, { value: "us", label: "United States" }, { value: "eu", label: "Europe" }], placeholder: "Select region" } };
export const WithValue: Story = { args: { options: [{ value: "cn", label: "China" }], value: "cn" } };
