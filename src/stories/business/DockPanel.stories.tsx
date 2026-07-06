import type { Meta, StoryObj } from "@storybook/react";
import { DockPanel } from "@/components/business/dock-panel";

const meta = {
  title: "Business/Nav/DockPanel",
  component: DockPanel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { side: "right" as const, children: null },
} satisfies Meta<typeof DockPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  args: {
    side: "right",
    children: <div className="p-4"><p className="text-sm">Right dock content</p></div>,
  },
};

export const Left: Story = {
  args: {
    side: "left",
    children: <div className="p-4"><p className="text-sm">Left panel content</p></div>,
  },
};

export const Collapsible: Story = {
  render: () => (
    <DockPanel side="bottom" collapsed onToggle={() => {}}>
      <div className="p-4"><p className="text-sm">Collapsed dock</p></div>
    </DockPanel>
  ),
};
