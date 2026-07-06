import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "@/components/business/image-gallery";

const meta = { title: "Business/Files/ImageGallery", component: ImageGallery, tags: ["autodocs"], parameters: { layout: "padded" }, args: { images: [] } } satisfies Meta<typeof ImageGallery>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { images: [{ src: "https://picsum.photos/seed/a/300/200", alt: "Image A" }, { src: "https://picsum.photos/seed/b/300/200", alt: "Image B" }, { src: "https://picsum.photos/seed/c/300/200" }] } };
export const Single: Story = { args: { images: [{ src: "https://picsum.photos/seed/single/400/300", alt: "Single image" }] } };
