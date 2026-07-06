import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs", "a11y"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The panel resize direction",
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function ResizableWorkspaceDemo() {
  const [navSize, setNavSize] = useState(35);

  return (
    <ResizablePanelGroup className="h-64 w-full max-w-2xl rounded-lg border">
      <ResizablePanel
        defaultSize={35}
        minSize={20}
        onResize={setNavSize}
        className="relative border-r"
      >
        <div className="flex h-full flex-col justify-center gap-1 p-4">
          <div className="font-medium">Navigation</div>
          <p className="text-muted-foreground text-sm">
            Drag the handle to resize this panel.
          </p>
          <p className="text-muted-foreground text-xs">
            Current width: {Math.round(navSize)}%
          </p>
        </div>
        <ResizableHandle withHandle className="absolute top-0 right-0" />
      </ResizablePanel>
      <ResizablePanel defaultSize={65} minSize={30} className="bg-muted/30">
        <div className="text-muted-foreground flex h-full items-center justify-center p-6 text-sm">
          Content area
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export const Default: Story = {
  render: () => <ResizableWorkspaceDemo />,
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="h-80 w-full max-w-xl rounded-lg border"
    >
      <ResizablePanel
        defaultSize={60}
        minSize={30}
        className="relative border-b"
      >
        <div className="flex h-full items-center justify-center text-sm">
          Preview
        </div>
        <ResizableHandle withHandle className="absolute bottom-0 left-0" />
      </ResizablePanel>
      <ResizablePanel defaultSize={40} minSize={20} className="bg-muted/30">
        <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
          Console
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <ResizablePanelGroup className="h-64 w-full max-w-2xl rounded-lg border">
      <ResizablePanel
        collapsible
        collapsedSize={8}
        defaultSize={30}
        minSize={18}
        className="relative border-r"
      >
        <div className="flex h-full flex-col justify-center gap-1 p-4">
          <div className="font-medium">Filters</div>
          <p className="text-muted-foreground text-sm">
            Double-click the handle to collapse.
          </p>
        </div>
        <ResizableHandle withHandle className="absolute top-0 right-0" />
      </ResizablePanel>
      <ResizablePanel defaultSize={70} minSize={40} className="bg-muted/30">
        <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
          Results
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
