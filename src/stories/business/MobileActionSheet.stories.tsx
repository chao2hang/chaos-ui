import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MobileActionSheet } from "@/components/business/mobile-action-sheet";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/Mobile/MobileActionSheet",
  component: MobileActionSheet,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: false,
    onOpenChange: () => {},
    actions: [],
  },
} satisfies Meta<typeof MobileActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const Harness = ({
  actions,
}: {
  actions: React.ComponentProps<typeof MobileActionSheet>["actions"];
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mx-auto max-w-sm">
      <Button onClick={() => setOpen(true)}>Open action sheet</Button>
      <MobileActionSheet open={open} onOpenChange={setOpen} actions={actions} />
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <Harness
      actions={[
        { label: "Share", onClick: () => {} },
        { label: "Copy link", onClick: () => {} },
        { label: "Report", onClick: () => {} },
      ]}
    />
  ),
};

export const WithDangerAction: Story = {
  render: () => (
    <Harness
      actions={[
        { label: "Edit", onClick: () => {} },
        { label: "Archive", onClick: () => {} },
        { label: "Delete", onClick: () => {}, danger: true },
      ]}
    />
  ),
};

export const SingleAction: Story = {
  render: () => (
    <Harness
      actions={[{ label: "Sign out", onClick: () => {}, danger: true }]}
    />
  ),
};
