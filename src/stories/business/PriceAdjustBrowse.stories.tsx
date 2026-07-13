import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PriceAdjustBrowse } from "@/components/business/price-adjust-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/PriceAdjustBrowse",
  component: PriceAdjustBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof PriceAdjustBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  {
    id: "PA-1",
    no: "PA-1",
    product: "酱油 500ml",
    date: "2026-07-01",
    status: "生效",
  },
  {
    id: "PA-2",
    no: "PA-2",
    product: "醋 500ml",
    date: "2026-07-08",
    status: "草稿",
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
            <p className="text-sm font-semibold">
              业务选择 · PriceAdjustBrowse
            </p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <PriceAdjustBrowse
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
