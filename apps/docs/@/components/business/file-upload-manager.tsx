"use client";
import * as React from "react";
import { FileUpload, Button, Badge, Progress } from "@chaos_team/chaos-ui/ui";
import { Trash2Icon, GridIcon, ListIcon } from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";

type ManagedFile = {
  file?: File;
  name: string;
  size: number;
  type?: string;
  status?: string;
  progress?: number;
};

/**
 * @component FileUploadManager
 * @category business/ux
 * @since 0.2.0
 * @description File upload manager with list/grid views, progress tracking, and drag-and-drop support / 文件上传管理器，支持列表/网格视图、进度追踪及拖拽上传
 * @keywords file, upload, manager, progress, drag, drop
 * @example
 * <FileUploadManager files={files} onFilesChange={setFiles} />
 */
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
    <div data-slot="file-upload-manager" className={cn("space-y-4", className)}>
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
                <Trash2Icon className="text-destructive size-3.5" />
              </Button>
            </div>
          </div>

          {view === "list" ? (
            <div className="space-y-2">
              {files.map((file, i) => {
                const pct = formatProgress(file.progress);
                const isUploading =
                  file.status === "uploading" || (pct !== null && pct < 100);
                const isComplete =
                  pct === 100 ||
                  file.status === "done" ||
                  file.status === "complete";
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
                        <span className="truncate text-sm font-medium">
                          {file.name}
                        </span>
                        <span className="text-muted-foreground shrink-0 text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        {isUploading && pct !== null && (
                          <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                            {pct}%
                          </span>
                        )}
                        {isComplete && (
                          <Badge
                            variant="secondary"
                            className="shrink-0 px-1.5 py-0 text-[0.65rem]"
                          >
                            Done
                          </Badge>
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
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2Icon className="size-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {files.map((file, i) => {
                const pct = formatProgress(file.progress);
                const isUploading =
                  file.status === "uploading" || (pct !== null && pct < 100);
                const isComplete =
                  pct === 100 ||
                  file.status === "done" ||
                  file.status === "complete";
                return (
                  <div
                    key={i}
                    className={cn(
                      "group relative overflow-hidden rounded-lg border",
                      isComplete && "border-success/30",
                    )}
                  >
                    {file.type?.startsWith("image/") ? (
                      <div className="bg-muted text-muted-foreground flex aspect-square items-center justify-center text-xs">
                        Image
                      </div>
                    ) : (
                      <div className="bg-muted flex aspect-square items-center justify-center">
                        <span className="text-muted-foreground text-xs font-medium uppercase">
                          {file.name?.split(".").pop() || "File"}
                        </span>
                      </div>
                    )}
                    {/* Progress overlay for uploading files in grid view */}
                    {isUploading && pct !== null && (
                      <div className="bg-background/80 absolute inset-x-0 bottom-0 px-2 py-1.5 backdrop-blur-sm">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="tabular-nums">{pct}%</span>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    )}
                    {isComplete && (
                      <div className="absolute top-1 right-1">
                        <Badge
                          variant="secondary"
                          className="px-1 py-0 text-[0.6rem]"
                        >
                          Done
                        </Badge>
                      </div>
                    )}
                    <div className="p-2">
                      <p className="truncate text-xs font-medium">
                        {file.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemove(i)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/80 absolute top-1 right-1 size-5 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
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
