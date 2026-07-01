import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "@/components/ui/message";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Message> = {
  title: "Components/InlineMessage",
  component: Message,
  tags: ["autodocs", "a11y"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Info: Story = {
  args: {
    variant: "info",
    children: "Your changes will be auto-saved.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "File uploaded successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Your session will expire in 5 minutes.",
  },
};

export const ErrorStory: Story = {
  name: "Error",
  args: {
    variant: "error",
    children: "Failed to save changes. Please try again.",
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="space-y-3">
      <Message
        variant="success"
        action={
          <Button variant="link" size="sm" className="h-auto p-0 text-current">
            Undo
          </Button>
        }
      >
        Item deleted.
      </Message>
      <Message
        variant="error"
        action={
          <Button variant="link" size="sm" className="h-auto p-0 text-current">
            Retry
          </Button>
        }
      >
        Upload failed.
      </Message>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Message variant="info">Info: Contextual hint for the user.</Message>
      <Message variant="success">Success: Operation completed.</Message>
      <Message variant="warning">Warning: Proceed with caution.</Message>
      <Message variant="error">Error: Something went wrong.</Message>
    </div>
  ),
};
