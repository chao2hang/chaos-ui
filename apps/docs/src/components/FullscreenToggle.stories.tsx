import type { Meta, StoryObj } from "@storybook/react";
import { FullscreenToggle } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof FullscreenToggle> = {
  title: "Components/FullscreenToggle",
  component: FullscreenToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-48 w-64 items-center justify-center rounded border">
      <FullscreenToggle />
    </div>
  ),
};
