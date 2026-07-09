import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { UploadIcon } from "lucide-react";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FileUpload {...({} as any)}>
      <Button variant="outline">
        <UploadIcon />
        Upload File
      </Button>
    </FileUpload>
  ),
};

export const Dropzone: Story = {
  render: () => (
    <FileUpload {...({} as any)}>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
        <UploadIcon className="text-muted-foreground mb-2 size-8" />
        <p className="text-sm font-medium">Drop files here</p>
        <p className="text-muted-foreground text-xs">or click to browse</p>
      </div>
    </FileUpload>
  ),
};
