import type { Meta, StoryObj } from "@storybook/react";
import { FileUploadManager } from "@/components/business/file-upload-manager";
import { useState, type ComponentProps } from "react";

type UploadedFile = NonNullable<
  ComponentProps<typeof FileUploadManager>["files"]
>[number];

const meta = {
  title: "Business/FileUploadManager",
  component: FileUploadManager,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof FileUploadManager>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultFileUploadManager() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { name: "document.pdf", size: 1024000, progress: 100, status: "completed" },
    {
      name: "image.png",
      size: 512000,
      progress: 65,
      status: "uploading",
      type: "image/png",
    },
  ]);
  return <FileUploadManager files={files} onFilesChange={setFiles} />;
}

export const Default: Story = {
  render: () => <DefaultFileUploadManager />,
};
