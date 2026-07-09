import type { Meta, StoryObj } from "@storybook/react";
import { RegionLayout } from "@/components/layout/region-layout";

const meta: Meta<typeof RegionLayout> = {
  title: "Layouts/RegionLayout",
  component: RegionLayout,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    top: <div className="bg-muted p-4 text-center text-sm">Header</div>,
    left: <div className="bg-muted p-4 text-sm">Sidebar</div>,
    main: <div className="p-4 text-sm">Main Content</div>,
    right: <div className="bg-muted p-4 text-sm">Info Panel</div>,
    bottom: <div className="bg-muted p-4 text-center text-sm">Footer</div>,
  },
};

export const ContentOnly: Story = {
  args: {
    main: <div className="p-4 text-sm">Main Content</div>,
  },
};
