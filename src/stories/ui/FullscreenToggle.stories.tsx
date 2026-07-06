import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FullscreenToggle } from "@/components/ui/fullscreen-toggle";

const meta = {
  title: "Components/FullscreenToggle",
  component: FullscreenToggle,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof FullscreenToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const SmallIcon: Story = {
  args: { size: "icon-sm", variant: "outline" },
};

/** Targeted at a specific container ref instead of document.body. */
export const TargetedContainer: Story = {
  render: () => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <div
        ref={ref}
        className="bg-muted/30 flex h-64 items-center justify-center rounded-lg border"
      >
        <div className="text-center">
          <p className="text-muted-foreground mb-3 text-sm">
            Fullscreen this container only:
          </p>
          <FullscreenToggle targetRef={ref} variant="outline" />
        </div>
      </div>
    );
  },
};
