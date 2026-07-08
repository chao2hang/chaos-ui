import type { Meta, StoryObj } from "@storybook/react";
import { ImageViewer } from "@/components/ui/image-viewer";

const meta: Meta<typeof ImageViewer> = {
  title: "Components/ImageViewer",
  component: ImageViewer,
  tags: ["autodocs"],

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/800/600",
    alt: "Sample image",
  },
};

export const WithThumbnails: Story = {
  args: {
    images: [
      { src: "https://picsum.photos/800/600?random=1", alt: "Image 1" },
      { src: "https://picsum.photos/800/600?random=2", alt: "Image 2" },
      { src: "https://picsum.photos/800/600?random=3", alt: "Image 3" },
    ],
  },
};
