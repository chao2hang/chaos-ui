import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MobileSheet } from "@/components/mobile/mobile-sheet";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileSheet",
  component: MobileSheet,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof MobileSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <MobileSheet
        title="Bottom Sheet"
        description="Swipe down to close"
        trigger={<MobileButton variant="outline">Open Bottom Sheet</MobileButton>}
      >
        <div className="space-y-4">
          <p>This is a mobile-optimized bottom sheet.</p>
          <MobileButton>Action 1</MobileButton>
          <MobileButton variant="outline">Action 2</MobileButton>
        </div>
      </MobileSheet>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4 space-y-3">
        <MobileButton variant="outline" onClick={() => setOpen(true)}>
          Open controlled sheet
        </MobileButton>
        <MobileSheet
          open={open}
          onOpenChange={setOpen}
          title="Controlled sheet"
          description="State-driven"
        >
          <p>Open state controlled externally.</p>
        </MobileSheet>
      </div>
    );
  },
};

export const RightSide: Story = {
  render: () => (
    <div className="p-4">
      <MobileSheet
        title="Right Sheet"
        description="Slides in from the right"
        side="right"
        trigger={<MobileButton>Open Right Sheet</MobileButton>}
      >
        <p>This sheet appears on the right edge.</p>
      </MobileSheet>
    </div>
  ),
};
