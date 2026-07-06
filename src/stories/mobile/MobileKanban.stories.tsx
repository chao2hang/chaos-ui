import type { Meta, StoryObj } from "@storybook/react";
import { MobileKanban } from "@/components/mobile/mobile-kanban";

const meta = {
  title: "Mobile/MobileKanban",
  component: MobileKanban,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    columns: [
      {
        id: "todo",
        title: "To Do",
        items: [{ id: "1", title: "Approve brief" }],
      },
      {
        id: "doing",
        title: "Doing",
        items: [{ id: "2", title: "Review media plan" }],
      },
      {
        id: "done",
        title: "Done",
        items: [{ id: "3", title: "Upload assets" }],
      },
    ],
  },
} satisfies Meta<typeof MobileKanban>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyColumn: Story = {
  args: {
    columns: [
      { id: "todo", title: "To Do", items: [] },
      { id: "doing", title: "Doing", items: [{ id: "1", title: "Active task" }] },
      { id: "done", title: "Done", items: [] },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    columns: [
      {
        id: "backlog",
        title: "Backlog",
        items: [
          { id: "1", title: "Define persona" },
          { id: "2", title: "Draft wireframes" },
          { id: "3", title: "Plan Q3 roadmap" },
        ],
      },
      { id: "doing", title: "Doing", items: [{ id: "4", title: "Build onboarding" }] },
      { id: "done", title: "Done", items: [{ id: "5", title: "Ship login" }] },
    ],
  },
};
