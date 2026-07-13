"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { KeepAliveTabs } from "@/components/layout/keep-alive-tabs";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Layout/KeepAliveTabs",
  component: KeepAliveTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "NavigationTabsBar + KeepAlive composition. Inactive panes stay mounted so local state survives tab switches; closing a tab clears its cache.",
      },
    },
  },
} satisfies Meta<typeof KeepAliveTabs>;

export default meta;
type Story = StoryObj;

function StatefulForm({ title }: { title: string }) {
  const [value, setValue] = React.useState("");
  return (
    <div className="space-y-2 p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm">
        切换标签后输入应保留（KeepAlive）。
      </p>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="在此输入…"
      />
      <p className="text-xs">当前值：{value || "（空）"}</p>
    </div>
  );
}

function ControlledDemo() {
  const [active, setActive] = React.useState("dashboard");
  const [keys, setKeys] = React.useState(["dashboard", "orders", "settings"]);

  const labels: Record<string, string> = {
    dashboard: "仪表盘",
    orders: "订单",
    settings: "设置",
  };

  return (
    <div className="border-border flex h-[420px] flex-col border">
      <KeepAliveTabs
        activeKey={active}
        onChange={setActive}
        onClose={(key) => {
          setKeys((prev) => prev.filter((k) => k !== key));
          if (active === key) {
            setActive((prev) => {
              const rest = keys.filter((k) => k !== key);
              return rest[0] ?? prev;
            });
          }
        }}
        panes={keys.map((key) => ({
          key,
          label: labels[key] ?? key,
          closable: key !== "dashboard",
          children: <StatefulForm title={labels[key] ?? key} />,
        }))}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ControlledDemo />,
};
