"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@chaos_team/chaos-ui/ui";
import { Checkbox } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { PrinterIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component BatchPrintDialog
 * @category business/print
 * @since 0.7.0
 * @description 批量打印弹窗
 */
interface BatchPrintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Array<{ id: string; title: string }>;
  onPrint?: (ids: string[]) => void;
  className?: string;
}
function BatchPrintDialog({
  open,
  onOpenChange,
  items = [],
  onPrint,
  className,
}: BatchPrintDialogProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setSelected((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("max-w-md", className)}
        data-slot="batch-print-dialog"
      >
        <DialogHeader>
          <DialogTitle>批量打印</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {items.map((it) => (
            <label key={it.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selected.has(it.id)}
                onCheckedChange={() => toggle(it.id)}
              />
              {it.title}
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button
            onClick={() => onPrint?.(Array.from(selected))}
            disabled={selected.size === 0}
          >
            <PrinterIcon className="size-4" />
            打印 {selected.size || ""} 项
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export { BatchPrintDialog };
export type { BatchPrintDialogProps };
