import type { Meta, StoryObj } from "@storybook/react";
import { RefreshCwIcon } from "@/components/ui/icons";
import {
  FullPageLoader,
  LoadingPage,
} from "@/components/business/loading-page";

const meta = {
  title: "Business/LoadingPage",
  component: LoadingPage,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    title: "Loading campaign data",
    description: "Fetching the latest budget and delivery metrics.",
  },
};

export const Dots: Story = {
  args: {
    variant: "dots",
    title: "Preparing workspace",
  },
};

export const Pulse: Story = {
  args: {
    variant: "pulse",
    title: "Syncing changes",
    description: "This usually takes a few seconds.",
  },
};

export const Overlay: Story = {
  render: () => (
    <FullPageLoader>
      <div className="p-8">
        <div className="max-w-md rounded-lg border p-6">
          <RefreshCwIcon className="mb-3 size-5 text-muted-foreground" />
          <p className="text-sm font-medium">Report preview</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The background content is dimmed while a full page operation
            completes.
          </p>
        </div>
      </div>
    </FullPageLoader>
  ),
};
