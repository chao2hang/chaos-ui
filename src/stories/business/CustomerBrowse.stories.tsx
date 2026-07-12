import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CustomerBrowse } from "@/components/business/customer-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/CustomerBrowse",
  component: CustomerBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof CustomerBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { id: "1", name: "张三商贸", contact: "张三", phone: "13800000000" },
  { id: "2", name: "李四科技", contact: "李四", phone: "13900000000" },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">业务选择 · CustomerBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <CustomerBrowse
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
