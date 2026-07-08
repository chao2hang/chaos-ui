"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HistoryIcon, XIcon } from "lucide-react";

export interface AuditSidebarEntry {
  id: string;
  user: string;
  action: string;
  detail?: string;
  timestamp: string;
}

interface AuditSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: AuditSidebarEntry[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  className?: string;
}

function AuditSidebar({
  entries,
  open,
  onOpenChange,
  title = "操作记录",
  className,
  ...props
}: AuditSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger>
        <Button
          variant="outline"
          size="sm"
          className={className}
          {...(props as React.ComponentProps<"button">)}
        >
          <HistoryIcon />
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-[400px] sm:max-w-[400px]"
        data-slot="audit-sidebar"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="mt-4 h-[calc(100vh-100px)]">
          <div className="space-y-3">
            {entries.length === 0 && (
              <p className="text-muted-foreground py-8 text-center text-sm">
                暂无操作记录
              </p>
            )}
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 border-b pb-3 last:border-0"
              >
                <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full">
                  <span className="text-xs font-medium">{entry.user[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{entry.user}</span>
                    <span className="text-muted-foreground text-xs">
                      {entry.action}
                    </span>
                  </div>
                  {entry.detail && (
                    <p className="text-muted-foreground mt-0.5 truncate text-xs">
                      {entry.detail}
                    </p>
                  )}
                  <p className="text-muted-foreground mt-0.5 text-[11px]">
                    {entry.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export { AuditSidebar };
export type { AuditSidebarProps };
