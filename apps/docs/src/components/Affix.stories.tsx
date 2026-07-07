import type { Meta, StoryObj } from "@storybook/react";
import { Affix } from "@/components/ui/affix";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Affix",
  component: Affix,
  tags: ["autodocs"],
} satisfies Meta<typeof Affix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Fixed Button</Button>,
    offsetTop: 10,
  },
};

export const Bottom: Story = {
  args: {
    children: <Button>Bottom Affix</Button>,
    offsetBottom: 10,
  },
};
