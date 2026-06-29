"use client";

import * as React from "react";
import { RotateCcwIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

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

export function VersionHistory({
  versions,
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
            <span className="absolute left-[calc(1rem+0.375rem)] top-[calc(1rem+0.25rem+0.375rem)] h-[calc(100%+0.75rem+2px)] w-px bg-border" />
          )}
          <div className="flex items-start gap-3">
            <span className="relative z-10 mt-1 size-3 rounded-full border-2 border-background bg-primary" />
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
              <p className="mt-1 text-xs text-muted-foreground">
                {version.author} · {version.timestamp}
              </p>
              {version.description && (
                <p className="mt-2 text-sm">{version.description}</p>
              )}
              {version.changes && (
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
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
