import type { Meta, StoryObj } from "@storybook/react";
import { FullscreenToggle } from "@/components/ui/fullscreen-toggle";

const meta = {
  title: "Components/FullscreenToggle",
  component: FullscreenToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof FullscreenToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-48 w-64 items-center justify-center rounded border">
      <FullscreenToggle />
    </div>
  ),
};
