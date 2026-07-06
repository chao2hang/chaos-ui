import type { Meta, StoryObj } from "@storybook/react";
import { CompanyBrowse } from "@/components/business/company-browse";

const noop = () => {};
const meta = { title: "Business/Pickers/CompanyBrowse", component: CompanyBrowse, tags: ["autodocs"], parameters: { layout: "padded" }, args: { open: true, onOpenChange: noop, onSelect: noop } } satisfies Meta<typeof CompanyBrowse>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithItems: Story = { args: { items: [{ id: "1", name: "Acme Inc." }, { id: "2", name: "GlobalCorp" }, { id: "3", name: "TechStart" }] } };
