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
    offset: 10,
  },
};

export const Top: Story = {
  args: {
    children: <Button>Top Affix</Button>,
    position: "top",
    offset: 10,
  },
};
