import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "@/components/ui/split-button";
import { ChevronDownIcon } from "lucide-react";

const meta = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Save",
    menu: {
      items: [
        { key: "save", label: "Save" },
        { key: "save-as", label: "Save As..." },
        { key: "save-all", label: "Save All" },
      ],
    },
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Publish",
    menu: {
      items: [
        { key: "publish", label: "Publish Now" },
        { key: "schedule", label: "Schedule..." },
      ],
    },
  },
};
