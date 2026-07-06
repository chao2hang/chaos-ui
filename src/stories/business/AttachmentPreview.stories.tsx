import type { Meta, StoryObj } from "@storybook/react";
import { AttachmentPreview } from "@/components/business/attachment-preview";

const meta = {
  title: "Business/Print/AttachmentPreview",
  component: AttachmentPreview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { url: "https://picsum.photos/seed/document/400/300", type: "image/png" },
} satisfies Meta<typeof AttachmentPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
  args: { name: "screenshot.png" },
};

export const PDF: Story = {
  args: {
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: "application/pdf",
    name: "invoice.pdf",
  },
};

export const NoName: Story = {};
