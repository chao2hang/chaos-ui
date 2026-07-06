import type { Meta, StoryObj } from "@storybook/react";
import { Popconfirm } from "@/components/ui/popconfirm";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Popconfirm",
  component: Popconfirm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default confirm dialog. */
export const Default: Story = {
  args: {
    title: "Are you sure?",
    description: "This action cannot be undone.",
    onConfirm: noop,
    onCancel: noop,
    children: <Button variant="outline">Delete item</Button>,
  },
};

/** Destructive variant (red confirm button). */
export const Destructive: Story = {
  args: {
    title: "Delete this project?",
    description: "All associated data will be permanently removed.",
    okVariant: "destructive",
    okText: "Delete",
    onConfirm: noop,
    onCancel: noop,
    children: <Button variant="destructive">Delete project</Button>,
  },
};

/** Without cancel button. */
export const NoCancel: Story = {
  args: {
    title: "Got it?",
    showCancel: false,
    okText: "OK",
    onConfirm: noop,
    children: <Button>Acknowledge</Button>,
  },
};

/** Placed to the right of the trigger. */
export const RightPlacement: Story = {
  args: {
    title: "Confirm?",
    side: "right",
    onConfirm: noop,
    onCancel: noop,
    children: <Button variant="outline">Trigger →</Button>,
  },
};

/** Trigger disabled — click does nothing. */
export const Disabled: Story = {
  args: {
    title: "You should never see this",
    disabled: true,
    children: <Button variant="outline">Disabled trigger</Button>,
  },
};
