"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, Trash2Icon } from "lucide-react";

export interface OrderLine {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

interface OrderLineEditorProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  lines: OrderLine[];
  onChange?: (lines: OrderLine[]) => void;
  className?: string;
}

let oid = 0;

function OrderLineEditor({
  lines,
  onChange,
  className,
  ...props
}: OrderLineEditorProps) {
  const handleAdd = () => {
    onChange?.([
      ...lines,
      {
        id: `order_${++oid}`,
        product: "",
        quantity: 1,
        unit: "个",
        unitPrice: 0,
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange?.(lines.filter((l) => l.id !== id));
  };

  const handleChange = (id: string, patch: Partial<OrderLine>) => {
    onChange?.(lines.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const total = lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);

  return (
    <div
      data-slot="order-line-editor"
      className={cn("space-y-2", className)}
      {...props}
    >
      <div className="text-muted-foreground hidden grid-cols-[1fr_80px_80px_100px_40px] gap-2 px-1 text-xs font-medium sm:grid">
        <span>产品</span>
        <span>数量</span>
        <span>单位</span>
        <span className="text-right">单价</span>
        <span />
      </div>
      {lines.map((line) => (
        <div
          key={line.id}
          className="grid grid-cols-[1fr_80px_80px_100px_40px] items-center gap-2"
        >
          <Input
            value={line.product}
            onChange={(e) => handleChange(line.id, { product: e.target.value })}
            className="h-9"
            placeholder="产品名称"
          />
          <Input
            type="number"
            value={line.quantity || ""}
            onChange={(e) =>
              handleChange(line.id, { quantity: Number(e.target.value) })
            }
            className="h-9"
            min={1}
          />
          <Select
            value={line.unit}
            onValueChange={(v) => handleChange(line.id, { unit: v })}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["个", "箱", "kg", "升", "套"].map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={line.unitPrice || ""}
            onChange={(e) =>
              handleChange(line.id, { unitPrice: Number(e.target.value) })
            }
            className="h-9 text-right"
            placeholder="0.00"
          />
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => handleRemove(line.id)}
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      ))}
      <div className="flex items-center justify-between border-t pt-2">
        <Button size="sm" variant="outline" onClick={handleAdd}>
          <PlusIcon /> 添加行
        </Button>
        <span className="text-sm font-semibold">
          合计: ¥{total.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}

export { OrderLineEditor };
export type { OrderLineEditorProps };
