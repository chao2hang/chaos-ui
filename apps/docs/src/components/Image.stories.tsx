import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Sample image",
    width: 400,
    height: 300,
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid.url/image.jpg",
    alt: "Broken image",
    fallback: "https://picsum.photos/400/300",
    width: 400,
    height: 300,
  },
};

export const Rounded: Story = {
  args: {
    src: "https://picsum.photos/200/200",
    alt: "Rounded image",
    width: 200,
    height: 200,
    className: "rounded-full",
  },
};
