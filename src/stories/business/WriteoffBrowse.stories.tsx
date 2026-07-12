import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { WriteoffBrowse } from "@/components/business/writeoff-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/WriteoffBrowse",
  component: WriteoffBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof WriteoffBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  {
    id: "WO-1",
    no: "WO-1",
    counterparty: "示例客户",
    amount: 500,
    date: "2026-07-01",
    status: "已核销",
  },
  {
    id: "WO-2",
    no: "WO-2",
    counterparty: "示例供应商",
    amount: 300,
    date: "2026-07-03",
    status: "待核销",
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
            <p className="text-sm font-semibold">业务选择 · WriteoffBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <WriteoffBrowse
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
