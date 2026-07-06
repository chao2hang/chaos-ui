import type { Meta, StoryObj } from "@storybook/react";
import { SubformTabs } from "@/components/business/subform-tabs";

const meta = { title: "Business/Forms/SubformTabs", component: SubformTabs, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof SubformTabs>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { tabs: [{ id: "basic", label: "Basic", fields: [] }, { id: "contact", label: "Contact", fields: [] }] } };
export const SingleTab: Story = { args: { tabs: [{ id: "info", label: "Info", fields: [] }] } };
