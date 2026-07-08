import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminTabs } from "@/components/layout/admin-tabs";

const meta: Meta<typeof AdminTabs> = {
  title: "Layouts/AdminTabs",
  component: AdminTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = React.useState("overview");
    return (
      <AdminTabs
        items={[
          { key: "overview", label: "Overview" },
          { key: "analytics", label: "Analytics" },
          { key: "settings", label: "Settings" },
        ]}
        activeKey={tab}
        onChange={setTab}
      />
    );
  },
};
