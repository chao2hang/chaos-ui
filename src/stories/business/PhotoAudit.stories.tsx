import type { Meta, StoryObj } from "@storybook/react";
import { PhotoAudit } from "@/components/business/photo-audit";

const meta = { title: "Business/Files/PhotoAudit", component: PhotoAudit, tags: ["autodocs"], parameters: { layout: "padded" }, args: { photos: [] } } satisfies Meta<typeof PhotoAudit>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { photos: [{ src: "https://picsum.photos/seed/audit1/300/200" }, { src: "https://picsum.photos/seed/audit2/300/200" }] } };
export const WithCallbacks: Story = { args: { photos: [{ src: "https://picsum.photos/seed/audit3/300/200" }], onApprove: (i) => { void i; }, onReject: (i, r) => { void i; void r; } } };
