"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button, Card, CardContent, CardHeader, CardTitle, Textarea } from "@chaos_team/chaos-ui/ui";
import { CheckIcon, XIcon, ImageIcon, ChevronLeftIcon, ChevronRightIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component PhotoAudit
 * @category business/bill
 * @since 0.7.0
 * @description 照片审核组件。逐张展示待审照片，支持通过 / 驳回（带驳回理由）。
 * @keywords photo, audit
 * @param photos 待审核照片列表
 * @param onApprove 通过第 idx 张照片时回调
 * @param onReject 驳回第 idx 张照片时回调（携带驳回理由）
 * @example
 * <PhotoAudit photos={[{ src: "/a.jpg", alt: "收据" }]} />
 */

interface PhotoAuditProps {
  photos: Array<{ src: string; alt?: string }>;
  onApprove?: (idx: number) => void;
  onReject?: (idx: number, reason: string) => void;
  className?: string;
}

function PhotoAudit({ photos = [], onApprove, onReject, className }: PhotoAuditProps) {
  const [active, setActive] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [decisions, setDecisions] = React.useState<
    Array<{ status: "approved" | "rejected" | "pending"; reason?: string }>
  >(photos.map(() => ({ status: "pending" as const })));

  const current = photos[active];
  const safeIndex = current ? active : 0;

  const handleApprove = () => {
    if (!current) return;
    setDecisions((prev) => {
      const next = [...prev];
      next[safeIndex] = { status: "approved" };
      return next;
    });
    onApprove?.(safeIndex);
  };

  const handleReject = () => {
    if (!current) return;
    const trimmed = reason.trim() || "未通过审核";
    setDecisions((prev) => {
      const next = [...prev];
      next[safeIndex] = { status: "rejected", reason: trimmed };
      return next;
    });
    onReject?.(safeIndex, trimmed);
    setReason("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(0, photos.length - 1)));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
  };

  return (
    <Card
      data-slot="photo-audit"
      className={cn("w-full", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-label="照片审核"
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>照片审核</span>
          <span className="text-sm font-normal text-muted-foreground tabular-nums">
            {photos.length > 0 ? `${safeIndex + 1} / ${photos.length}` : "0 / 0"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {current ? (
          <figure className="overflow-hidden rounded-lg border bg-muted">
            <img
              src={current.src}
              alt={current.alt ?? `照片 ${safeIndex + 1}`}
              className="h-64 w-full object-cover"
              loading="lazy"
            />
            <figcaption className="flex items-center justify-between px-3 py-2 text-sm">
              <span className="truncate text-muted-foreground">
                {current.alt ?? `照片 ${safeIndex + 1}`}
              </span>
              {decisions[safeIndex]?.status === "approved" && (
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <CheckIcon /> 已通过
                </span>
              )}
              {decisions[safeIndex]?.status === "rejected" && (
                <span className="inline-flex items-center gap-1 text-destructive">
                  <XIcon /> 已驳回
                </span>
              )}
            </figcaption>
          </figure>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground">
            <ImageIcon className="size-8" />
            <span className="text-sm">暂无待审核照片</span>
          </div>
        )}

        {current && (
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="驳回理由（如需驳回请填写）"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              aria-label="驳回理由"
              rows={2}
            />
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={handleApprove}>
                <CheckIcon /> 通过
              </Button>
              <Button type="button" variant="destructive" onClick={handleReject}>
                <XIcon /> 驳回
              </Button>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="上一张"
                  disabled={safeIndex === 0}
                  onClick={() => setActive((i) => Math.max(i - 1, 0))}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="下一张"
                  disabled={safeIndex >= photos.length - 1}
                  onClick={() => setActive((i) => Math.min(i + 1, photos.length - 1))}
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { PhotoAudit };
export type { PhotoAuditProps };
