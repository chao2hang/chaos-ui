"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash2Icon, GripVerticalIcon } from "lucide-react";

export interface LineItem {
  id: string;
  [key: string]: string;
}

interface LineEditorProps extends React.ComponentProps<"div"> {
  lines: LineItem[];
  columns: Array<{ key: string; placeholder?: string; width?: string }>;
  onChange?: (lines: LineItem[]) => void;
  className?: string;
}

let lid = 0;

function LineEditor({
  lines,
  columns,
  onChange,
  className,
  ...props
}: LineEditorProps) {
  const handleAdd = () => {
    const newLine: LineItem = { id: `line_${++lid}` };
    columns.forEach((col) => {
      newLine[col.key] = "";
    });
    onChange?.([...lines, newLine]);
  };

  const handleRemove = (id: string) => {
    onChange?.(lines.filter((l) => l.id !== id));
  };

  const handleChange = (id: string, key: string, value: string) => {
    onChange?.(lines.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  return (
    <div
      data-slot="line-editor"
      className={cn("space-y-1", className)}
      {...props}
    >
      {lines.map((line) => (
        <div key={line.id} className="flex items-center gap-1">
          <GripVerticalIcon className="text-muted-foreground size-4 shrink-0" />
          {columns.map((col) => (
            <Input
              key={col.key}
              value={line[col.key] ?? ""}
              onChange={(e) => handleChange(line.id, col.key, e.target.value)}
              placeholder={col.placeholder}
              className="h-8"
              style={{ width: col.width ?? "120px" }}
            />
          ))}
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => handleRemove(line.id)}
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={handleAdd} className="mt-2">
        <PlusIcon /> 添加行
      </Button>
    </div>
  );
}

export { LineEditor };
export type { LineEditorProps, LineItem };
