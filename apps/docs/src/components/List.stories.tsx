import type { Meta, StoryObj } from "@storybook/react";
import { List } from "@/components/ui/list";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

const items = ["Item 1", "Item 2", "Item 3"];

export const Default: Story = {
  render: () => (
    <List {...({} as any)}>
      {items.map((item) => (
        <li key={item} className="text-sm">{item}</li>
      ))}
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List {...({ ordered: true } as any)}>
      {items.map((item) => (
        <li key={item} className="text-sm">{item}</li>
      ))}
    </List>
  ),
};
