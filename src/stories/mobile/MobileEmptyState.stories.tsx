import type { Meta, StoryObj } from "@storybook/react";
import { MobileEmptyState } from "@/components/mobile/mobile-empty-state";
import { MobileButton } from "@/components/mobile/mobile-button";

const meta = {
  title: "Mobile/MobileEmptyState",
  component: MobileEmptyState,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof MobileEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Search: Story = {
  args: {
    variant: "search",
    action: (
      <MobileButton size="sm" variant="outline">
        Clear Filters
      </MobileButton>
    ),
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    action: <MobileButton size="sm">Retry</MobileButton>,
  },
};

export const WithAction: Story = {
  args: {
    variant: "default",
    action: <MobileButton size="sm">Create Item</MobileButton>,
  },
};

export const Stack: Story = {
  render: () => (
    <div className="max-w-sm space-y-8 p-4">
      <MobileEmptyState
        variant="default"
        action={<MobileButton size="sm">Create Item</MobileButton>}
      />
      <MobileEmptyState
        variant="search"
        action={
          <MobileButton size="sm" variant="outline">
            Clear Filters
          </MobileButton>
        }
      />
      <MobileEmptyState
        variant="error"
        action={<MobileButton size="sm">Retry</MobileButton>}
      />
    </div>
  ),
};
