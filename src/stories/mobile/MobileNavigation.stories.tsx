import type { Meta, StoryObj } from "@storybook/react";
import { MobileNavigation } from "@/components/mobile/mobile-navigation";

const meta = {
  title: "Mobile/MobileNavigation",
  component: MobileNavigation,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { items: [] },
} satisfies Meta<typeof MobileNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "All", active: true },
      { label: "Active" },
      { label: "Completed" },
      { label: "Pending" },
      { label: "Archived" },
    ],
  },
};

export const FewItems: Story = {
  args: {
    items: [
      { label: "Today", active: true },
      { label: "Week" },
      { label: "Month" },
    ],
  },
};

export const WithOnClick: Story = {
  render: () => (
    <div className="max-w-sm p-4">
      <MobileNavigation
        items={[
          { label: "Inbox", onClick: () => {} },
          { label: "Sent", onClick: () => {} },
          { label: "Drafts", onClick: () => {}, active: true },
        ]}
      />
    </div>
  ),
};
