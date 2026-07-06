import type { Meta, StoryObj } from "@storybook/react";
import { FileCard } from "@/components/business/file-card";

const meta = { title: "Business/Files/FileCard", component: FileCard, tags: ["autodocs"], parameters: { layout: "padded" }, args: { name: "", size: 0, type: "" } } satisfies Meta<typeof FileCard>;
export default meta; type Story = StoryObj<typeof meta>;
const noop = () => {};
export const Default: Story = { args: { name: "report.pdf", size: 245760, type: "application/pdf" } };
export const Removable: Story = { args: { name: "screenshot.png", size: 102400, type: "image/png", onRemove: noop } };
