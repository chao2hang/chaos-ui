import type { Meta, StoryObj } from "@storybook/react";
import { AttachmentUploader } from "@/components/business/attachment-uploader";

const meta = {
  title: "Business/Print/AttachmentUploader",
  component: AttachmentUploader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AttachmentUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ImageOnly: Story = {
  args: { accept: "image/*" },
};

export const MaxSize: Story = {
  args: { maxSize: 5 * 1024 * 1024 },
};

export const WithUploadCallback: Story = {
  args: {
    onUpload: (files: File[]) => {
      void files;
    },
  },
};
