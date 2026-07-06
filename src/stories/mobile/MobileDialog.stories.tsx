import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MobileDialog } from "@/components/mobile/mobile-dialog";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileDialog",
  component: MobileDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof MobileDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <MobileDialog
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        trigger={<MobileButton>Open Dialog</MobileButton>}
        actions={
          <>
            <MobileButton variant="outline">Cancel</MobileButton>
            <MobileButton>Confirm</MobileButton>
          </>
        }
      >
        <p>
          This is a mobile-optimized dialog that takes full screen on mobile
          devices.
        </p>
      </MobileDialog>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4 space-y-3">
        <MobileButton variant="outline" onClick={() => setOpen(true)}>
          Open controlled dialog
        </MobileButton>
        <MobileDialog
          open={open}
          onOpenChange={setOpen}
          title="Controlled dialog"
          description="Driven by external state"
          actions={<MobileButton onClick={() => setOpen(false)}>Close</MobileButton>}
        >
          <p>The open state is controlled externally.</p>
        </MobileDialog>
      </div>
    );
  },
};

export const NoActions: Story = {
  render: () => (
    <div className="p-4">
      <MobileDialog
        title="Information"
        description="Read-only notice"
        trigger={<MobileButton variant="ghost">Open info dialog</MobileButton>}
      >
        <p>This dialog has no action buttons in the footer.</p>
      </MobileDialog>
    </div>
  ),
};
