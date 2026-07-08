import type { Meta, StoryObj } from "@storybook/react";
import { List } from "@/components/ui/list";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],

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
