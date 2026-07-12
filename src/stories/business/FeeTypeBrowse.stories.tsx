import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FeeTypeBrowse } from "@/components/business/fee-type-browse";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/FeeTypeBrowse",
  component: FeeTypeBrowse,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    open: true,
    onOpenChange: () => {},
    onSelect: () => {},
    items: [],
  },
} satisfies Meta<typeof FeeTypeBrowse>;
export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { id: "1", name: "差旅费", code: "TRV", direction: "expense" as const },
  { id: "2", name: "办公费", code: "OFF", direction: "expense" as const },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [picked, setPicked] = useState("");
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">业务选择 · FeeTypeBrowse</p>
            <p className="text-muted-foreground text-xs">
              已选：{picked || "无"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOpen(true)}>
            打开
          </Button>
        </div>
        <FeeTypeBrowse
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
