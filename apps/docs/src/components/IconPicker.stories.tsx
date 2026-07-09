import type { Meta, StoryObj } from "@storybook/react";
import { IconPicker } from "@/components/ui/icon-picker";

const meta: Meta<typeof IconPicker> = {
  title: "Components/IconPicker",
  component: IconPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icons: [
      { id: "smile", label: "😊" },
      { id: "heart", label: "❤️" },
      { id: "star", label: "⭐" },
      { id: "fire", label: "🔥" },
      { id: "thumbsUp", label: "👍" },
    ],
  } as any,
};
