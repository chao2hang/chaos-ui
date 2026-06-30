"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
/**
 * @component ApplicationForm
 * @category business/finance
 * @since 0.7.0
 * @description 申请表单
 */
interface ApplicationFormProps {
type: "open" | "close" | "change";
  onSubmit?: (data: unknown) => void;
  className?: string;
}
const TYPE_LABEL = { open: "开户", close: "销户", change: "变更" };
function ApplicationForm({ type, onSubmit, className }: ApplicationFormProps) {
  const [reason, setReason] = React.useState("");
  return (
    <form data-slot="application-form" className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)} onSubmit={(e) => { e.preventDefault(); onSubmit?.({ type, reason }); }}>
      <div className="text-sm font-medium">{TYPE_LABEL[type]}申请</div>
      <label className="text-sm">
        <span className="mb-1 block text-muted-foreground">申请事由</span>
        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="请输入申请事由" required />
      </label>
      <div className="flex justify-end">
        <Button type="submit">提交申请</Button>
      </div>
    </form>
  );
}
export { ApplicationForm };
export type { ApplicationFormProps };
