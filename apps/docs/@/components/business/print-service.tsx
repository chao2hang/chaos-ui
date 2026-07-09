"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Badge, Button } from "@chaos_team/chaos-ui/ui";
import {
  PrinterIcon,
  RefreshCwIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertTriangleIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component PrintService
 * @category business/print
 * @since 0.7.0
 * @description 打印服务 — renders a print queue panel that lists pending/active
 * print jobs and exposes print & refresh actions.
 * @keywords print, service
 * @param jobs - queued print jobs to display (defaults to an empty list)
 * @param onPrint - called when the user requests to print a job
 * @param onRefresh - called when the user refreshes the queue
 * @example
 * <PrintService jobs={[{ id: "1", title: "Invoice #12", status: "pending" }]} />
 */

/** A single entry in the print queue. */
export interface PrintServiceJob {
  /** Stable identifier for the job. */
  id: string;
  /** Human-readable document title. */
  title: string;
  /** Lifecycle status of the job. */
  status: "pending" | "printing" | "done" | "error";
  /** Optional page count for the document. */
  pages?: number;
}

interface PrintServiceProps {
  /** Queued print jobs. */
  jobs?: PrintServiceJob[];
  /** Invoked when a job's print action is triggered. */
  onPrint?: (job: PrintServiceJob) => void;
  /** Invoked when the user requests a queue refresh. */
  onRefresh?: () => void;
  className?: string;
}

const statusMeta: Record<
  PrintServiceJob["status"],
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    icon: React.ReactNode;
  }
> = {
  pending: { label: "待打印", variant: "secondary", icon: <ClockIcon /> },
  printing: { label: "打印中", variant: "default", icon: <PrinterIcon /> },
  done: { label: "已完成", variant: "outline", icon: <CheckCircle2Icon /> },
  error: { label: "失败", variant: "destructive", icon: <AlertTriangleIcon /> },
};

function PrintService({
  jobs = [],
  onPrint,
  onRefresh,
  className,
}: PrintServiceProps) {
  const pendingCount = jobs.filter(
    (j) => j.status === "pending" || j.status === "printing",
  ).length;

  return (
    <div
      data-slot="print-service"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-3 rounded-lg border p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PrinterIcon className="text-muted-foreground size-5" />
          <h3 className="text-sm font-semibold">打印服务</h3>
          {pendingCount > 0 && (
            <Badge variant="default">{pendingCount} 项待处理</Badge>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={<RefreshCwIcon />}
          onClick={onRefresh}
        >
          刷新
        </Button>
      </div>

      {jobs.length === 0 ? (
        <p className="bg-muted/40 text-muted-foreground rounded-md border border-dashed px-3 py-6 text-center text-sm">
          打印队列为空
        </p>
      ) : (
        <ul role="list" className="divide-border flex flex-col divide-y">
          {jobs.map((job) => {
            const meta = statusMeta[job.status];
            return (
              <li
                key={job.id}
                data-slot="print-service-job"
                className="flex items-center gap-3 py-2.5"
              >
                <FileTextIcon className="text-muted-foreground size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{job.title}</p>
                  {job.pages != null && (
                    <p className="text-muted-foreground text-xs">
                      {job.pages} 页
                    </p>
                  )}
                </div>
                <Badge variant={meta.variant}>
                  {meta.icon}
                  {meta.label}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={<PrinterIcon />}
                  onClick={() => onPrint?.(job)}
                  disabled={job.status === "done"}
                >
                  打印
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { PrintService };
export type { PrintServiceProps };
