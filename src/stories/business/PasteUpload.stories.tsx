import type { Meta, StoryObj } from "@storybook/react";
import { PasteUpload } from "@/components/business/paste-upload";

const meta = { title: "Business/Files/PasteUpload", component: PasteUpload, tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof PasteUpload>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { children: <div className="rounded border border-dashed p-8 text-center text-sm text-muted-foreground">Paste an image here</div> } };
export const WithCallback: Story = { args: { onPaste: (files) => { void files; }, children: <div className="rounded border p-4 text-sm">Paste to upload</div> } };
