import type { Meta, StoryObj } from "@storybook/react";
import { MasterEditTemplate } from "@/components/business/master-edit-template";

const noop = () => {};
const meta = { title: "Business/Forms/MasterEditTemplate", component: MasterEditTemplate, tags: ["autodocs"], parameters: { layout: "fullscreen" }, args: { children: null } } satisfies Meta<typeof MasterEditTemplate>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: "Edit product", onBack: noop, onSave: noop, children: <div className="p-4 text-sm text-muted-foreground">Edit form content</div> } };
export const Loading: Story = { args: { title: "Saving...", loading: true, onSave: noop, children: <div className="p-4 text-sm text-muted-foreground">Form</div> } };
