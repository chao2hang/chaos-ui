import type { Meta, StoryObj } from "@storybook/react";
import { Result } from "@/components/ui/result";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Result",
  component: Result,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Result>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Success state. */
export const Success: Story = {
  args: {
    status: "success",
    title: "Payment successful",
    subtitle: "Your order #A2B3-C4D5 has been confirmed.",
    extra: <Button>Back to home</Button>,
  },
};

/** Error state. */
export const Error: Story = {
  args: {
    status: "error",
    title: "Submission failed",
    subtitle: "Please review the form and try again.",
    extra: <Button variant="outline">Try again</Button>,
  },
};

/** Warning state. */
export const Warning: Story = {
  args: {
    status: "warning",
    title: "Session expiring soon",
    subtitle: "You will be logged out in 5 minutes.",
    extra: <Button>Extend session</Button>,
  },
};

/** 404 not-found. */
export const NotFound: Story = {
  args: {
    status: "404",
    title: "Page not found",
    subtitle: "The page you're looking for doesn't exist or was moved.",
    extra: <Button variant="outline">Go home</Button>,
  },
};

/** 403 forbidden. */
export const Forbidden: Story = {
  args: {
    status: "403",
    title: "Access denied",
    subtitle: "You don't have permission to view this resource.",
  },
};

/** 500 server error. */
export const ServerError: Story = {
  args: {
    status: "500",
    title: "Internal server error",
    subtitle: "Something went wrong on our end. Please try again shortly.",
    extra: <Button>Reload</Button>,
  },
};
