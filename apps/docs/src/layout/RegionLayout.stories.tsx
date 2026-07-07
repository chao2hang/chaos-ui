import type { Meta, StoryObj } from "@storybook/react";
import { RegionLayout } from "@/components/layout/region-layout";

const meta = {
  title: "Layouts/RegionLayout",
  component: RegionLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RegionLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    regions: [
      {
        key: "north",
        content: (
          <div className="bg-muted p-4 text-center text-sm">Header Region</div>
        ),
      },
      {
        key: "center",
        content: (
          <div className="bg-background p-8 text-center text-sm">
            Main Content Region
          </div>
        ),
      },
      {
        key: "south",
        content: (
          <div className="bg-muted p-4 text-center text-sm">Footer Region</div>
        ),
      },
    ],
  },
};

export const WithSidebar: Story = {
  args: {
    regions: [
      {
        key: "west",
        content: <div className="bg-muted p-4 text-sm">Sidebar</div>,
      },
      {
        key: "center",
        content: <div className="bg-background p-8 text-sm">Content</div>,
      },
    ],
  },
};
