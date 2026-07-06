"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardCheckIcon } from "lucide-react";

export interface InspectionItem {
  id: string;
  name: string;
  standard: string;
  result: "pass" | "fail" | "pending";
  note: string;
}

interface QualityInspectionFormProps extends React.ComponentProps<"div"> {
  items: InspectionItem[];
  onChange?: (items: InspectionItem[]) => void;
  onSubmit?: (items: InspectionItem[]) => void;
  className?: string;
}

function QualityInspectionForm({
  items,
  onChange,
  onSubmit,
  className,
  ...props
}: QualityInspectionFormProps) {
  const handleResult = (id: string, result: "pass" | "fail" | "pending") => {
    onChange?.(
      items.map((item) => (item.id === id ? { ...item, result } : item)),
    );
  };

  const handleNote = (id: string, note: string) => {
    onChange?.(
      items.map((item) => (item.id === id ? { ...item, note } : item)),
    );
  };

  const passCount = items.filter((i) => i.result === "pass").length;
  const failCount = items.filter((i) => i.result === "fail").length;

  return (
    <div
      data-slot="quality-inspection-form"
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-green-500" /> 通过:{" "}
          {passCount}
        </span>
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-red-500" /> 未通过:{" "}
          {failCount}
        </span>
        <span className="text-muted-foreground">共 {items.length} 项</span>
      </div>
      {items.map((item) => (
        <div key={item.id} className="space-y-2 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{item.name}</span>
            <Select
              value={item.result}
              onValueChange={(v) =>
                handleResult(item.id, v as "pass" | "fail" | "pending")
              }
            >
              <SelectTrigger className="h-8 w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pass">✓ 通过</SelectItem>
                <SelectItem value="fail">✗ 未通过</SelectItem>
                <SelectItem value="pending">待检</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-muted-foreground text-xs">标准: {item.standard}</p>
          <Input
            value={item.note}
            onChange={(e) => handleNote(item.id, e.target.value)}
            placeholder="备注说明"
            className="h-8 text-sm"
          />
        </div>
      ))}
      {onSubmit && (
        <div className="flex justify-end">
          <Button
            onClick={() => onSubmit(items)}
            disabled={items.some((i) => i.result === "pending")}
          >
            <ClipboardCheckIcon /> 提交质检结果
          </Button>
        </div>
      )}
    </div>
  );
}

export { QualityInspectionForm };
export type { QualityInspectionFormProps, InspectionItem };
