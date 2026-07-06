import type { Meta, StoryObj } from "@storybook/react";
import { AttachmentList } from "@/components/business/attachment-list";

const sample = [
  { id: "1", name: "invoice-001.pdf", size: 245760, type: "application/pdf" },
  { id: "2", name: "screenshot.png", size: 102400, type: "image/png" },
  { id: "3", name: "report.xlsx", size: 51200, type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
];

const meta = {
  title: "Business/Print/AttachmentList",
  component: AttachmentList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { attachments: [] },
} satisfies Meta<typeof AttachmentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { attachments: sample },
};

export const Empty: Story = {};

export const WithRemovable: Story = {
  args: {
    attachments: sample,
    onRemove: (id: string) => { void id; },
  },
};
