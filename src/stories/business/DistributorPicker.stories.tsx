import type { Meta, StoryObj } from "@storybook/react";
import { DistributorPicker } from "@/components/business/distributor-picker";

const meta = { title: "Business/Pickers/DistributorPicker", component: DistributorPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof DistributorPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "d1", label: "Distributor A" }, { value: "d2", label: "Distributor B" }, { value: "d3", label: "Distributor C" }], placeholder: "Select distributor" } };
export const WithValue: Story = { args: { options: [{ value: "d1", label: "Distributor A" }], value: "d1" } };
