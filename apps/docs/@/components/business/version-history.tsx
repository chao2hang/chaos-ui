"use client";

import * as React from "react";
import { RotateCcwIcon } from "@chaos_team/chaos-ui/ui-icons";
import { useTranslation } from "react-i18next";

import { Badge } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface VersionHistoryItem {
  id: string;
  version: string;
  title: string;
  description?: string;
  author: string;
  timestamp: string;
  current?: boolean;
  changes?: string[];
}

export interface VersionHistoryProps extends React.ComponentProps<"div"> {
  versions: VersionHistoryItem[];
  onRestore?: (version: VersionHistoryItem) => void;
}

/**
 * @component VersionHistory
 * @category business/bill
 * @since 0.2.0
 * @description Vertical timeline displaying version history entries with restore action / 垂直时间线，展示版本历史条目并支持恢复操作
 * @keywords version, history, timeline, restore, audit, changelog
 * @example
 * <VersionHistory versions={items} onRestore={handleRestore} />
 */
export function VersionHistory({
  versions = [],
  onRestore,
  className,
  ...props
}: VersionHistoryProps) {
  const { t } = useTranslation("data");
  return (
    <div
      data-slot="version-history"
      className={cn("space-y-3", className)}
      {...props}
    >
      {versions.map((version, index) => (
        <div key={version.id} className="relative rounded-lg border p-4">
          {index < versions.length - 1 && (
            <span className="bg-border absolute top-[calc(1rem+0.25rem+0.375rem)] left-[calc(1rem+0.375rem)] h-[calc(100%+0.75rem+2px)] w-px" />
          )}
          <div className="flex items-start gap-3">
            <span className="border-background bg-primary relative z-10 mt-1 size-3 rounded-full border-2" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{version.title}</p>
                <Badge variant={version.current ? "default" : "outline"}>
                  {version.version}
                </Badge>
                {version.current && (
                  <Badge variant="secondary">
                    {t("versionHistory.current")}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {version.author} · {version.timestamp}
              </p>
              {version.description && (
                <p className="mt-2 text-sm">{version.description}</p>
              )}
              {version.changes && (
                <ul className="text-muted-foreground mt-2 list-disc space-y-1 pl-4 text-xs">
                  {version.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>
              )}
            </div>
            {!version.current && onRestore && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRestore(version)}
              >
                <RotateCcwIcon />
                {t("versionHistory.restore")}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
