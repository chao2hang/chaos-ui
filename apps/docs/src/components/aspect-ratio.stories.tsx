import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The width/height ratio applied via CSS aspect-ratio",
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[420px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Placeholder"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted rounded-md">
        <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
          1:1 square
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={3 / 4} className="bg-muted rounded-md">
        <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
          3:4 portrait
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Ultrawide: Story = {
  render: () => (
    <div className="w-[420px]">
      <AspectRatio ratio={21 / 9} className="bg-muted rounded-md">
        <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
          21:9 ultrawide
        </div>
      </AspectRatio>
    </div>
  ),
};

export const AllRatios: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <AspectRatio
        ratio={1}
        className="bg-muted text-muted-foreground flex items-center justify-center rounded-md text-xs"
      >
        1:1
      </AspectRatio>
      <AspectRatio
        ratio={4 / 3}
        className="bg-muted text-muted-foreground flex items-center justify-center rounded-md text-xs"
      >
        4:3
      </AspectRatio>
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted text-muted-foreground flex items-center justify-center rounded-md text-xs"
      >
        16:9
      </AspectRatio>
      <AspectRatio
        ratio={21 / 9}
        className="bg-muted text-muted-foreground flex items-center justify-center rounded-md text-xs"
      >
        21:9
      </AspectRatio>
    </div>
  ),
};

export const Dark: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark w-[420px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Placeholder"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
