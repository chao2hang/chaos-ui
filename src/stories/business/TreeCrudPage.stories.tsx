import type { Meta, StoryObj } from "@storybook/react";
import { TreeCrudPage } from "@/components/business/tree-crud-page";

const meta = {
  title: "Business/CRUD/TreeCrudPage",
  component: TreeCrudPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TreeCrudPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tree: [
      {
        id: "1",
        label: "Categories",
        children: [
          { id: "1-1", label: "Electronics" },
          { id: "1-2", label: "Books" },
        ],
      },
      { id: "2", label: "Vendors" },
    ],
    defaultSelected: "1",
    onSelect: (id) => { void id; },
    onCreate: () => {},
    children: <div className="p-4 text-sm text-muted-foreground">Table or detail content</div>,
  },
};

export const Minimal: Story = {
  args: {
    tree: [{ id: "root", label: "All" }],
  },
};
