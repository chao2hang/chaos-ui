import type { Meta, StoryObj } from "@storybook/react";
import { CompanyPicker } from "@/components/business/company-picker";

const meta = { title: "Business/Pickers/CompanyPicker", component: CompanyPicker, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof CompanyPicker>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { options: [{ value: "1", label: "Acme Inc." }, { value: "2", label: "GlobalCorp" }, { value: "3", label: "TechStart" }], placeholder: "Select company" } };
export const WithValue: Story = { args: { options: [{ value: "1", label: "Acme Inc." }], value: "1" } };
