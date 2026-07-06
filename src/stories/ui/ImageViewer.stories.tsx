import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ImageViewer } from "@/components/ui/image-viewer";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/ImageViewer",
  component: ImageViewer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: false,
    onOpenChange: () => {},
    images: [],
  },
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ImageViewer is a fullscreen overlay driven by an `open` prop. Each story uses
 * a small local wrapper so the docs page can toggle it.
 */
function ViewerHarness({
  images,
  index,
}: {
  images: { src: string; alt?: string }[];
  index?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const props =
    index === undefined
      ? { open, onOpenChange: setOpen, images }
      : { open, onOpenChange: setOpen, images, index };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open viewer</Button>
      <ImageViewer {...props} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Single image — no next/prev controls. */
export const SingleImage: Story = {
  render: () => (
    <ViewerHarness
      images={[
        {
          src: "https://placehold.co/1200x800/3b82f6/ffffff?text=Chaos+UI",
          alt: "Chaos UI banner",
        },
      ]}
    />
  ),
};

/** Gallery of three images with navigation. */
export const Gallery: Story = {
  render: () => (
    <ViewerHarness
      images={[
        {
          src: "https://placehold.co/1200x800/ef4444/ffffff?text=1",
          alt: "Slide 1",
        },
        {
          src: "https://placehold.co/1200x800/f59e0b/ffffff?text=2",
          alt: "Slide 2",
        },
        {
          src: "https://placehold.co/1200x800/10b981/ffffff?text=3",
          alt: "Slide 3",
        },
      ]}
    />
  ),
};

/** Opens at a specific starting index (2 of 4). */
export const StartAtIndex: Story = {
  render: () => (
    <ViewerHarness
      index={1}
      images={[
        {
          src: "https://placehold.co/1200x800/8b5cf6/ffffff?text=A",
          alt: "A",
        },
        {
          src: "https://placehold.co/1200x800/6366f1/ffffff?text=B+(start)",
          alt: "B",
        },
        {
          src: "https://placehold.co/1200x800/06b6d4/ffffff?text=C",
          alt: "C",
        },
        {
          src: "https://placehold.co/1200x800/0ea5e9/ffffff?text=D",
          alt: "D",
        },
      ]}
    />
  ),
};

/** Empty gallery — viewer stays closed. */
export const Empty: Story = {
  render: () => <ViewerHarness images={[]} />,
};
