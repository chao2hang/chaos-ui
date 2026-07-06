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

export interface ExpenseLine {
  id: string;
  category: string;
  description: string;
  amount: number;
}

interface ExpenseLineEditorProps extends React.ComponentProps<"div"> {
  lines: ExpenseLine[];
  onChange?: (lines: ExpenseLine[]) => void;
  categories?: string[];
  className?: string;
}

let lineCounter = 0;

function ExpenseLineEditor({
  lines,
  onChange,
  categories = ["差旅费", "办公费", "招待费", "交通费", "其他"],
  className,
  ...props
}: ExpenseLineEditorProps) {
  const handleAdd = () => {
    onChange?.([
      ...lines,
      {
        id: `line_${++lineCounter}`,
        category: categories[0],
        description: "",
        amount: 0,
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange?.(lines.filter((l) => l.id !== id));
  };

  const handleChange = (id: string, patch: Partial<ExpenseLine>) => {
    onChange?.(lines.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  return (
    <div
      data-slot="expense-line-editor"
      className={cn("space-y-2", className)}
      {...props}
    >
      {lines.map((line) => (
        <div key={line.id} className="flex items-center gap-2">
          <Select
            value={line.category}
            onValueChange={(v) => handleChange(line.id, { category: v })}
          >
            <SelectTrigger className="h-9 w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={line.description}
            onChange={(e) =>
              handleChange(line.id, { description: e.target.value })
            }
            className="h-9 flex-1"
            placeholder="费用描述"
          />
          <Input
            type="number"
            value={line.amount || ""}
            onChange={(e) =>
              handleChange(line.id, { amount: Number(e.target.value) })
            }
            className="h-9 w-[130px]"
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
          <PlusIcon /> 添加费用项
        </Button>
        <span className="text-sm">
          合计:{" "}
          <span className="font-semibold">
            ¥{total.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
          </span>
        </span>
      </div>
    </div>
  );
}

export { ExpenseLineEditor };
export type { ExpenseLineEditorProps, ExpenseLine };
