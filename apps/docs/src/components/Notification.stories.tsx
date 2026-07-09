import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "info",
    title: "Information",
    description: "This is an info notification.",
  } as any,
};

export const Success: Story = {
  args: {
    type: "success",
    title: "Success",
    description: "Operation completed successfully.",
  } as any,
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning",
    description: "Please check your input.",
  } as any,
};

export const Error: Story = {
  args: {
    type: "error",
    title: "Error",
    description: "Something went wrong.",
  } as any,
};

export const Closable: Story = {
  args: {
    type: "info",
    title: "Closable",
    description: "Click X to dismiss.",
    onClose: () => {},
  } as any,
};
