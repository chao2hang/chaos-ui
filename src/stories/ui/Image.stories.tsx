import type { Meta, StoryObj } from "@storybook/react";
import { Image, ImageGroup } from "@/components/ui/image";

const meta = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default 4:3 image with preview enabled. */
export const Default: Story = {
  args: {
    src: "https://placehold.co/400x300/3b82f6/ffffff?text=Chaos+UI",
    alt: "Chaos UI placeholder",
    preview: true,
    rounded: "md",
    aspectRatio: "4/3",
    fit: "cover",
  },
};

/** Square avatar-style image. */
export const Square: Story = {
  args: {
    src: "https://placehold.co/200x200/8b5cf6/ffffff?text=AB",
    alt: "Square avatar",
    rounded: "full",
    aspectRatio: "1/1",
    fit: "cover",
  },
};

/** 16:9 hero image. */
export const Hero: Story = {
  args: {
    src: "https://placehold.co/640x360/10b981/ffffff?text=Hero+Banner",
    alt: "Hero banner",
    rounded: "lg",
    aspectRatio: "16/9",
    fit: "cover",
  },
};

/** Failed load shows fallback content. */
export const WithFallback: Story = {
  args: {
    src: "https://invalid.host.example/does-not-exist.png",
    alt: "Missing image",
    rounded: "md",
    aspectRatio: "4/3",
    fit: "cover",
    fallback: (
      <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center rounded-md text-sm">
        Image unavailable
      </div>
    ),
  },
};

/** Placeholder src (low-quality preview) before the main image loads. */
export const WithPlaceholder: Story = {
  args: {
    src: "https://placehold.co/640x480/6366f1/ffffff?text=Full+Image",
    placeholder: "https://placehold.co/40x30/6366f1/ffffff?text=…",
    alt: "Lazy-loaded image",
    rounded: "md",
    aspectRatio: "4/3",
    fit: "cover",
  },
};

/** ImageGroup — gallery of related images. */
export const Gallery: Story = {
  render: () => (
    <ImageGroup className="grid max-w-md grid-cols-3 gap-2">
      <Image
        src="https://placehold.co/150x150/ef4444/ffffff?text=1"
        alt="gallery 1"
        aspectRatio="1/1"
        fit="cover"
        rounded="sm"
      />
      <Image
        src="https://placehold.co/150x150/f59e0b/ffffff?text=2"
        alt="gallery 2"
        aspectRatio="1/1"
        fit="cover"
        rounded="sm"
      />
      <Image
        src="https://placehold.co/150x150/10b981/ffffff?text=3"
        alt="gallery 3"
        aspectRatio="1/1"
        fit="cover"
        rounded="sm"
      />
    </ImageGroup>
  ),
};
