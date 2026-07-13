import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SalesOrderBrowse } from "@/components/business/sales-order-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/SalesOrderBrowse",
  component: SalesOrderBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof SalesOrderBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  {
    id: "SO-1",
    no: "SO-1",
    customer: "示例客户",
    amount: 1200,
    date: "2026-07-01",
  },
  {
    id: "SO-2",
    no: "SO-2",
    customer: "示例客户 B",
    amount: 800,
    date: "2026-07-05",
  },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">业务选择 · SalesOrderBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <SalesOrderBrowse
          open={open}
          onOpenChange={setOpen}
          items={demoItems}
          onSelect={(row) => {
            setPicked(String(row?.no ?? row?.id ?? ""));
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
