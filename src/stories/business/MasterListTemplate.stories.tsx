import type { Meta, StoryObj } from "@storybook/react";
import { MasterListTemplate } from "@/components/business/master-list-template";

const meta = {
  title: "Business/CRUD/MasterListTemplate",
  component: MasterListTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MasterListTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Products",
    searchPlaceholder: "Search products...",
    onCreate: () => {},
    children: <div className="p-4 text-sm text-muted-foreground">List content rendered here.</div>,
  },
};

export const WithoutCreate: Story = {
  args: {
    title: "Read-only list",
    children: <div className="p-4 text-sm text-muted-foreground">No create action available.</div>,
  },
};
