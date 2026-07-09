import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "@chaos_team/chaos-ui/ui";
import { ChevronDownIcon } from "lucide-react";

const meta: Meta<typeof SplitButton> = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Save",
    actions: [
      { key: "save", label: "Save" },
      { key: "save-as", label: "Save As..." },
      { key: "save-all", label: "Save All" },
    ] as any,
  },
};

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Publish",
    actions: [
      { key: "publish", label: "Publish Now" },
      { key: "schedule", label: "Schedule..." },
    ] as any,
  },
};
