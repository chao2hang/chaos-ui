import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-48 rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="bg-muted/20 flex h-full items-center justify-center p-4 text-sm">
          Panel A
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm">
          Panel B
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="h-64 rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="bg-muted/20 flex h-full items-center justify-center p-4 text-sm">
          Top
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm">
          Bottom
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
