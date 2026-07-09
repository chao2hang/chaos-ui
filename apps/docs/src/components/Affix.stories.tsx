import type { Meta, StoryObj } from "@storybook/react";
import { Affix } from "@/components/ui/affix";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Affix> = {
  title: "Components/Affix",
  component: Affix,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Fixed Button</Button>,
    offsetTop: 10,
  },
};

export const Top: Story = {
  args: {
    children: <Button>Top Affix</Button>,
    offsetTop: 10,
  },
};
