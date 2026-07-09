import type { Meta, StoryObj } from "@storybook/react";
import { ErrorLayout } from "@chaos_team/chaos-ui/layout";
import { Button } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof ErrorLayout> = {
  title: "Layouts/ErrorLayout",
  component: ErrorLayout,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ErrorLayout>
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground text-6xl font-bold">404</p>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground text-sm">
          The page you are looking for has been moved or no longer exists.
        </p>
        <Button>Go back home</Button>
      </div>
    </ErrorLayout>
  ),
};

export const ServerError: Story = {
  render: () => (
    <ErrorLayout>
      <div className="space-y-4 text-center">
        <p className="text-destructive text-6xl font-bold">500</p>
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground text-sm">
          An unexpected error has occurred. Our team has been notified.
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="outline">Try again</Button>
          <Button>Contact support</Button>
        </div>
      </div>
    </ErrorLayout>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark">
      <ErrorLayout>
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground text-6xl font-bold">404</p>
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="text-muted-foreground text-sm">
            Dark theme preview of the error layout.
          </p>
          <Button>Go back home</Button>
        </div>
      </ErrorLayout>
    </div>
  ),
};
