import type { Meta, StoryObj } from "@storybook/react";
import { IconPicker } from "@/components/ui/icon-picker";

const meta = {
  title: "Components/IconPicker",
  component: IconPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof IconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchPlaceholder: "Select an icon",
    icons: {
      smile: "😊",
      heart: "❤️",
      star: "⭐",
      fire: "🔥",
      thumbsUp: "👍",
    },
  },
};
