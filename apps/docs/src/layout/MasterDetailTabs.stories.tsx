import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailTabs } from "@/components/layout/master-detail-tabs";

const meta: Meta<typeof MasterDetailTabs> = {
  title: "Layouts/MasterDetailTabs",
  component: MasterDetailTabs,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  {
    key: "overview",
    label: "Overview",
    content: <div className="p-4">Overview content here.</div>,
  },
  {
    key: "details",
    label: "Details",
    content: <div className="p-4">Details content here.</div>,
  },
  {
    key: "settings",
    label: "Settings",
    content: <div className="p-4">Settings content here.</div>,
  },
];

export const Default: Story = {
  args: {
    master: <div className="p-4">Master panel content</div>,
    details: { overview: tabs[0], details: tabs[1], settings: tabs[2] },
    activeDetail: "overview",
  } as any,
};
