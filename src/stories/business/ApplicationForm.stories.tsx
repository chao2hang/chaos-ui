import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationForm } from "@/components/business/application-form";

const meta = { title: "Business/Forms/ApplicationForm", component: ApplicationForm, tags: ["autodocs"], parameters: { layout: "padded" }, args: { type: "open" } } satisfies Meta<typeof ApplicationForm>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Close: Story = { args: { type: "close" } };
export const Change: Story = { args: { type: "change", onSubmit: (data) => { void data; } } };
