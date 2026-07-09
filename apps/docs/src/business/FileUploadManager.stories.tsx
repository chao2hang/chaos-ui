import type { Meta, StoryObj } from "@storybook/react"
import { FileUploadManager } from "@/components/business/file-upload-manager"
import { useState } from "react"

interface UploadedFile {
  id: string
  name: string
  size: number
  progress: number
  status: "uploading" | "completed" | "error"
}

const meta: Meta<typeof FileUploadManager> = {
  title: "Business/FileUploadManager",
  component: FileUploadManager,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([
      { id: "1", name: "document.pdf", size: 1024000, progress: 100, status: "completed" },
      { id: "2", name: "image.png", size: 512000, progress: 65, status: "uploading" },
    ])
    return (
      <FileUploadManager
        files={files as any}
        onFilesChange={setFiles as any}
      />
    )
  },
}
