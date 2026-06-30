"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MegaphoneIcon, SendIcon } from "@/components/ui/icons";

/**
 * @component MarketingActivityForm
 * @category business/finance
 * @since 0.7.0
 * @description 营销活动表单 — captures a marketing activity's core attributes.
 * @keywords marketing, activity, form
 * @param initial Pre-filled values for the form fields.
 * @param onSubmit Callback fired with the collected activity data on submit.
 * @example
 * <MarketingActivityForm onSubmit={(d) => console.log(d)} />
 */

interface MarketingActivityFormProps {
  initial?: Record<string, unknown>;
  onSubmit?: (data: unknown) => void;
  className?: string;
}

function MarketingActivityForm({
  initial,
  onSubmit,
  className,
}: MarketingActivityFormProps) {
  const [name, setName] = React.useState(
    typeof initial?.name === "string" ? initial.name : "",
  );
  const [type, setType] = React.useState(
    typeof initial?.type === "string" ? initial.type : "discount",
  );
  const [budget, setBudget] = React.useState(
    typeof initial?.budget === "number" ? initial.budget : 0,
  );
  const [start, setStart] = React.useState(
    typeof initial?.start === "string" ? initial.start : "",
  );
  const [end, setEnd] = React.useState(
    typeof initial?.end === "string" ? initial.end : "",
  );
  const [enabled, setEnabled] = React.useState(
    initial?.enabled === true ? true : false,
  );
  const [note, setNote] = React.useState(
    typeof initial?.note === "string" ? initial.note : "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name,
      type,
      budget,
      start,
      end,
      enabled,
      note,
    });
  };

  return (
    <form
      data-slot="marketing-activity-form"
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-2">
        <MegaphoneIcon className="size-5 text-muted-foreground" aria-hidden />
        <h3 className="text-base font-medium">营销活动</h3>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="maf-name">活动名称</Label>
        <Input
          id="maf-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入活动名称"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="maf-type">活动类型</Label>
          <Select value={type} onValueChange={(v) => setType(v ?? "discount")}>
            <SelectTrigger id="maf-type">
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">满减优惠</SelectItem>
              <SelectItem value="coupon">领券</SelectItem>
              <SelectItem value="gift">赠品</SelectItem>
              <SelectItem value="flash">限时秒杀</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="maf-budget">预算（元）</Label>
          <Input
            id="maf-budget"
            type="number"
            value={Number.isFinite(budget) ? budget : 0}
            onChange={(e) => setBudget(e.target.valueAsNumber)}
          />
          <span className="text-xs text-muted-foreground tabular-nums">
            {formatCurrency(budget)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="maf-start">开始日期</Label>
          <Input
            id="maf-start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="maf-end">结束日期</Label>
          <Input
            id="maf-end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="maf-enabled">立即启用</Label>
        <Switch
          id="maf-enabled"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="maf-note">备注</Label>
        <Textarea
          id="maf-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="可选的活动说明"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          <SendIcon className="size-4" aria-hidden />
          提交
        </Button>
      </div>
    </form>
  );
}

export { MarketingActivityForm };
export type { MarketingActivityFormProps };
