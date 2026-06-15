import type { Meta, StoryObj } from "@storybook/react"
import { FileUpload } from "@/components/ui/file-upload"
import { Button } from "@/components/ui/button"
import { UploadIcon } from "lucide-react"

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FileUpload>
      <Button variant="outline">
        <UploadIcon />
        Upload File
      </Button>
    </FileUpload>
  ),
}

export const Dropzone: Story = {
  render: () => (
    <FileUpload dropzone>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
        <UploadIcon className="size-8 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">Drop files here</p>
        <p className="text-xs text-muted-foreground">or click to browse</p>
      </div>
    </FileUpload>
  ),
}
