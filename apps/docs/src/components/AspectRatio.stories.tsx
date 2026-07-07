import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SixteenByNine: Story = {
  args: {
    ratio: 16 / 9,
    className: "bg-muted rounded-lg overflow-hidden",
    children: (
      <img
        src="https://picsum.photos/800/450"
        alt="16:9"
        className="h-full w-full object-cover"
      />
    ),
  },
};

export const Square: Story = {
  args: {
    ratio: 1,
    className: "bg-muted rounded-lg overflow-hidden",
    children: (
      <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
        1:1 Square
      </div>
    ),
  },
};
