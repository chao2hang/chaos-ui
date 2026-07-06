import type { Meta, StoryObj } from "@storybook/react";
import { TabCrudPage } from "@/components/business/tab-crud-page";

const meta = {
  title: "Business/CRUD/TabCrudPage",
  component: TabCrudPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TabCrudPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { id: "active", label: "Active" },
      { id: "draft", label: "Drafts" },
      { id: "archived", label: "Archived" },
    ],
    defaultActive: "active",
    onCreate: () => {},
    children: <div className="p-4 text-sm text-muted-foreground">Tab content area</div>,
  },
};

export const SingleTab: Story = {
  args: {
    tabs: [{ id: "all", label: "All items" }],
  },
};
