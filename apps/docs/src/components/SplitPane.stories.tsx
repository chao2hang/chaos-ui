import type { Meta, StoryObj } from "@storybook/react";
import { SplitPane } from "@/components/ui/split-pane";

const meta: Meta<typeof SplitPane> = {
  title: "Components/SplitPane",
  component: SplitPane,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="h-[300px] overflow-hidden rounded-lg border">
      <SplitPane
        first={
          <div className="bg-muted/50 flex h-full items-center justify-center">
            <p className="text-sm font-medium">Left Pane</p>
          </div>
        }
        second={
          <div className="bg-muted/30 flex h-full items-center justify-center">
            <p className="text-sm font-medium">Right Pane</p>
          </div>
        }
      />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="h-[300px] overflow-hidden rounded-lg border">
      <SplitPane
        direction="vertical"
        first={
          <div className="bg-muted/50 flex h-full items-center justify-center">
            <p className="text-sm font-medium">Top Pane</p>
          </div>
        }
        second={
          <div className="bg-muted/30 flex h-full items-center justify-center">
            <p className="text-sm font-medium">Bottom Pane</p>
          </div>
        }
      />
    </div>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div className="h-[300px] overflow-hidden rounded-lg border">
      <SplitPane
        defaultSize={30}
        first={
          <div className="bg-muted/50 flex h-full items-center justify-center">
            <p className="text-sm font-medium">30%</p>
          </div>
        }
        second={
          <div className="bg-muted/30 flex h-full items-center justify-center">
            <p className="text-sm font-medium">70%</p>
          </div>
        }
      />
    </div>
  ),
};
