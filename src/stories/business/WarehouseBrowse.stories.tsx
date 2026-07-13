import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { WarehouseBrowse } from "@/components/business/warehouse-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/WarehouseBrowse",
  component: WarehouseBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof WarehouseBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  {
    id: "1",
    name: "华东仓",
    code: "EC-01",
    address: "上海",
    manager: "王仓管",
  },
  {
    id: "2",
    name: "华南仓",
    code: "SC-01",
    address: "广州",
    manager: "李仓管",
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
            <p className="text-sm font-semibold">业务选择 · WarehouseBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <WarehouseBrowse
          open={open}
          onOpenChange={setOpen}
          items={demoItems}
          onSelect={(row) => {
            setPicked(String(row?.name ?? row?.id ?? ""));
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
