import type { Meta, StoryObj } from "@storybook/react";
import { ChatImageGallery } from "@/components/business/chat-image-gallery";

const meta = {
  title: "Business/Chat/ChatImageGallery",
  component: ChatImageGallery,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChatImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Single image (full-width grid). */
export const SingleImage: Story = {
  args: {
    images: [
      {
        src: "https://placehold.co/400x300/3b82f6/ffffff?text=Diagram",
        alt: "Architecture diagram",
      },
    ],
  },
};

/** Two images side-by-side. */
export const TwoImages: Story = {
  args: {
    images: [
      {
        src: "https://placehold.co/240x240/10b981/ffffff?text=Before",
        alt: "Before",
      },
      {
        src: "https://placehold.co/240x240/ef4444/ffffff?text=After",
        alt: "After",
      },
    ],
  },
};

/** Three images (3-column grid). */
export const ThreeImages: Story = {
  args: {
    images: [
      {
        src: "https://placehold.co/200x200/6366f1/ffffff?text=A",
        alt: "Chart A",
      },
      {
        src: "https://placehold.co/200x200/8b5cf6/ffffff?text=B",
        alt: "Chart B",
      },
      {
        src: "https://placehold.co/200x200/d946ef/ffffff?text=C",
        alt: "Chart C",
      },
    ],
  },
};

/** Large gallery (6+ images, wraps into multiple rows). */
export const Gallery: Story = {
  args: {
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `https://placehold.co/180x180/${["3b82f6", "10b981", "f59e0b", "ef4444", "8b5cf6", "06b6d4"][i]}/ffffff?text=${i + 1}`,
      alt: `Image ${i + 1}`,
    })),
  },
};

/** Empty gallery (renders hidden). */
export const Empty: Story = {
  args: { images: [] },
};
