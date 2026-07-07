import type { Meta, StoryObj } from "@storybook/react";
import { List } from "@/components/ui/list";

const meta = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = ["Item 1", "Item 2", "Item 3"];

export const Default: Story = {
  args: {
    children: items.map((item) => <li key={item}>{item}</li>),
  },
};

export const Ordered: Story = {
  args: {
    ordered: true,
    children: items.map((item) => <li key={item}>{item}</li>),
  },
};
