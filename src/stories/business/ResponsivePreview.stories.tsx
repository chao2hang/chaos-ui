import type { Meta, StoryObj } from "@storybook/react";
import { ResponsivePreview } from "@/components/business/responsive-preview";

const meta = { title: "Business/Misc/ResponsivePreview", component: ResponsivePreview, tags: ["autodocs"], parameters: { layout: "padded" }, args: { children: null } } satisfies Meta<typeof ResponsivePreview>;
export default meta; type Story = StoryObj<typeof meta>;
export const Mobile: Story = { args: { device: "mobile", children: <div className="p-4 text-sm">Mobile content</div> } };
export const Tablet: Story = { args: { device: "tablet", children: <div className="p-4 text-sm">Tablet content</div>, showFrame: true } };
export const Desktop: Story = { args: { device: "desktop", children: <div className="p-4 text-sm">Desktop content</div> } };
