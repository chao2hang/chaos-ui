import type { Meta, StoryObj } from "@storybook/react";
import { BackTop } from "@/components/ui/back-top";

const meta = {
  title: "Components/BackTop",
  component: BackTop,
  tags: ["autodocs"],
} satisfies Meta<typeof BackTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-64 overflow-auto rounded border p-4">
      <p className="text-muted-foreground text-sm">
        Scroll down to see the back-to-top button.
      </p>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="py-2 text-sm">
          Line {i + 1}
        </p>
      ))}
      <BackTop />
    </div>
  ),
};
