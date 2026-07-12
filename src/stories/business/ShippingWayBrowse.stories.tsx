import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ShippingWayBrowse } from "@/components/business/shipping-way-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/ShippingWayBrowse",
  component: ShippingWayBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof ShippingWayBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { id: "1", name: "陆运", code: "LAND", carrier: "自营车队" },
  { id: "2", name: "快递", code: "EXP", carrier: "顺丰" },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              业务选择 · ShippingWayBrowse
            </p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <ShippingWayBrowse
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
