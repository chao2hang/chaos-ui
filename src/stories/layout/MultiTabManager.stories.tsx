import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiTabManager } from "@/components/layout/multi-tab-manager";

const meta = {
  title: "Layout/MultiTabManager",
  component: MultiTabManager,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MultiTabManager>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ConsoleTabs: Story = {
  render: () => {
    const [active, setActive] = useState("orders");
    const [tabs, setTabs] = useState([
      { key: "dashboard", label: "工作台", closable: false },
      { key: "orders", label: "订单列表", closable: true },
      { key: "so-88", label: "SO-20260088", closable: true },
      { key: "customers", label: "客户", closable: true },
    ] as any);
    return (
      <div className="flex h-[360px] flex-col border">
        <MultiTabManager
          tabs={tabs}
          activeKey={active}
          onTabClick={setActive}
          onTabClose={(key) => {
            setTabs((prev: any[]) => prev.filter((t) => t.key !== key));
            if (active === key) setActive("dashboard");
          }}
          onTabCloseOthers={(key) => {
            setTabs((prev: any[]) =>
              prev.filter((t) => !t.closable || t.key === key),
            );
            setActive(key);
          }}
          onTabCloseAll={() => {
            setTabs((prev: any[]) => prev.filter((t) => !t.closable));
            setActive("dashboard");
          }}
          onTabRefresh={() => {}}
        />
        <div className="text-muted-foreground flex-1 p-4 text-sm">
          当前页签：{active}
        </div>
      </div>
    );
  },
};
