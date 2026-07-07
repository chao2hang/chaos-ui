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
    header: <div className="bg-muted p-4 text-center text-sm">Header</div>,
    left: <div className="bg-muted p-4 text-sm">Sidebar</div>,
    right: <div className="bg-muted p-4 text-sm">Info Panel</div>,
    footer: <div className="bg-muted p-4 text-center text-sm">Footer</div>,
  },
};

export const ContentOnly: Story = {
  args: {},
};
