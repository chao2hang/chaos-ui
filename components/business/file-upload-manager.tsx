"use client";
import * as React from "react";
import { FileUpload, Button, Badge, Progress } from "@/components/ui";
import { Trash2Icon, GridIcon, ListIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ManagedFile = {
  file?: File;
  name: string;
  size: number;
  type?: string;
  status?: string;
  progress?: number;
};

function FileUploadManager({
  files = [],
  onFilesChange,
  accept,
  maxFiles = 10,
  maxSize,
  className,
}: {
  files?: ManagedFile[];
  onFilesChange?: (files: ManagedFile[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  className?: string;
}) {
  const [view, setView] = React.useState("list");

  const handleDrop = (newFiles: File[]): void => {
    onFilesChange?.([
      ...files,
      ...newFiles.map((f) => ({
        file: f,
        name: f.name,
        size: f.size,
        type: f.type,
        status: "pending",
        progress: 0,
      })),
    ]);
  };

  const handleRemove = (index: number): void => {
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  const handleClearAll = () => onFilesChange?.([]);

  const formatProgress = (progress?: number) => {
    if (progress === undefined || progress === null) return null;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <FileUpload
        onDrop={handleDrop}
        {...(accept !== undefined ? { accept } : {})}
        maxFiles={maxFiles}
        {...(maxSize !== undefined ? { maxSize } : {})}
      />

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {files.length} file(s)
              </span>
              <Badge variant="secondary">
                {(files.reduce((a, f) => a + (f.size || 0), 0) / 1024).toFixed(
                  1,
                )}{" "}
                KB
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon-xs"
                onClick={() => setView("list")}
              >
                <ListIcon className="size-3.5" />
              </Button>
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon-xs"
                onClick={() => setView("grid")}
              >
                <GridIcon className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-xs" onClick={handleClearAll}>
                <Trash2Icon className="size-3.5 text-destructive" />
              </Button>
            </div>
          </div>

          {view === "list" ? (
            <div className="space-y-2">
              {files.map((file, i) => {
                const pct = formatProgress(file.progress);
                const isUploading = file.status === "uploading" || (pct !== null && pct < 100);
                const isComplete = pct === 100 || file.status === "done" || file.status === "complete";
                return (
                  <div
                    key={i}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border px-3 py-2",
                      isComplete && "bg-success/5",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        {isUploading && pct !== null && (
                          <span className="text-xs text-muted-foreground shrink-0 tabular-nums">{pct}%</span>
                        )}
                        {isComplete && (
                          <Badge variant="secondary" className="shrink-0 text-[0.65rem] px-1.5 py-0">Done</Badge>
                        )}
                      </div>
                      {/* Progress bar for uploading files */}
                      {isUploading && pct !== null && (
                        <Progress value={pct} className="mt-1.5 h-1.5" />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemove(i)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2Icon className="size-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((file, i) => {
                const pct = formatProgress(file.progress);
                const isUploading = file.status === "uploading" || (pct !== null && pct < 100);
                const isComplete = pct === 100 || file.status === "done" || file.status === "complete";
                return (
                  <div
                    key={i}
                    className={cn(
                      "group relative rounded-lg border overflow-hidden",
                      isComplete && "border-success/30",
                    )}
                  >
                    {file.type?.startsWith("image/") ? (
                      <div className="aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        Image
                      </div>
                    ) : (
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground uppercase font-medium">
                          {file.name?.split(".").pop() || "File"}
                        </span>
                      </div>
                    )}
                    {/* Progress overlay for uploading files in grid view */}
                    {isUploading && pct !== null && (
                      <div className="absolute inset-x-0 bottom-0 bg-background/80 backdrop-blur-sm px-2 py-1.5">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="tabular-nums">{pct}%</span>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    )}
                    {isComplete && (
                      <div className="absolute top-1 right-1">
                        <Badge variant="secondary" className="text-[0.6rem] px-1 py-0">Done</Badge>
                      </div>
                    )}
                    <div className="p-2">
                      <p className="text-xs truncate font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemove(i)}
                      className="absolute top-1 right-1 size-5 rounded-full bg-destructive p-0 text-destructive-foreground opacity-0 hover:bg-destructive/80 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2Icon className="size-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { FileUploadManager };