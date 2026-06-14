"use client";
import * as React from "react";
import { FileUpload, FileList, Button, Badge } from "@/components/ui";
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
      })),
    ]);
  };

  const handleRemove = (index: number): void => {
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  const handleClearAll = () => onFilesChange?.([]);

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
            <FileList files={files} onRemove={handleRemove} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="group relative rounded-lg border overflow-hidden"
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { FileUploadManager };
