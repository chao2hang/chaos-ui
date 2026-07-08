import type { Meta, StoryObj } from "@storybook/react";
import { IconPicker } from "@/components/ui/icon-picker";

const meta: Meta<typeof IconPicker> = {
  title: "Components/IconPicker",
  component: IconPicker,
  tags: ["autodocs"],

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
