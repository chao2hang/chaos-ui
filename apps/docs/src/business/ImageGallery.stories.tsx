import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "@chaos_team/chaos-ui/business";

const images = [
  {
    id: "1",
    src: "https://picsum.photos/seed/1/400/400",
    alt: "风景 1",
    caption: "山间小路",
  },
  {
    id: "2",
    src: "https://picsum.photos/seed/2/400/400",
    alt: "风景 2",
    caption: "海边日落",
  },
  {
    id: "3",
    src: "https://picsum.photos/seed/3/400/400",
    alt: "风景 3",
    caption: "森林晨雾",
  },
  { id: "4", src: "https://picsum.photos/seed/4/400/400", alt: "风景 4" },
  {
    id: "5",
    src: "https://picsum.photos/seed/5/400/400",
    alt: "风景 5",
    caption: "城市夜景",
  },
  { id: "6", src: "https://picsum.photos/seed/6/400/400", alt: "风景 6" },
];

const meta: Meta<typeof ImageGallery> = {
  title: "Business/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: images as any,
  },
};

export const TwoColumns: Story = {
  args: {
    images: images.slice(0, 4) as any,
  },
};

export const FourColumns: Story = {
  args: {
    images: images as any,
  },
};

export const Dark: Story = {
  args: {
    images: images as any,
  },
  parameters: { backgrounds: { default: "dark" } },
};
