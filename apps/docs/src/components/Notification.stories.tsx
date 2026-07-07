import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "@/components/ui/notification";

const meta = {
  title: "Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "info",
    title: "Information",
    message: "This is an info notification.",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    title: "Success",
    message: "Operation completed successfully.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Warning",
    message: "Please check your input.",
  },
};

export const Error: Story = {
  args: { type: "error", title: "Error", message: "Something went wrong." },
};

export const Closable: Story = {
  args: {
    type: "info",
    title: "Closable",
    message: "Click X to dismiss.",
    closable: true,
  },
};
