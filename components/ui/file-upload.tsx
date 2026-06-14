"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  UploadIcon,
  FileIcon,
  XIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "@/components/ui/icons";

function FileUpload({
  onDrop,
  accept,
  maxFiles = 5,
  maxSize,
  disabled,
  className,
}: {
  onDrop?: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...(onDrop !== undefined ? { onDrop } : {}),
    ...(accept !== undefined ? { accept } : {}),
    maxFiles,
    ...(maxSize !== undefined ? { maxSize } : {}),
    ...(disabled !== undefined ? { disabled } : {}),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <input {...getInputProps()} />
      <UploadIcon
        className={cn(
          "size-8 mb-2",
          isDragActive ? "text-primary" : "text-muted-foreground",
        )}
      />
      {isDragActive ? (
        <p className="text-sm font-medium text-primary">Drop files here...</p>
      ) : (
        <div className="space-y-1">
          <p className="text-sm font-medium">
            Drag & drop files here, or click to select
          </p>
          <p className="text-xs text-muted-foreground">
            {maxFiles > 1 ? `Up to ${maxFiles} files` : "Single file"}
            {maxSize && ` (max ${Math.round(maxSize / 1024 / 1024)}MB each)`}
          </p>
        </div>
      )}
    </div>
  );
}

function FileList({
  files = [],
  onRemove,
  className,
}: {
  files?: { name: string; size: number; status?: string; progress?: number }[];
  onRemove?: (index: number) => void;
  className?: string;
}) {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className={cn("space-y-2", className)}>
      {files.map((file, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm"
        >
          <FileIcon className="size-4 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatSize(file.size)}
            </p>
          </div>
          {file.status === "success" && (
            <CheckCircleIcon className="size-4 text-success" />
          )}
          {file.status === "error" && (
            <AlertCircleIcon className="size-4 text-destructive" />
          )}
          {file.progress !== undefined && (
            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: file.progress + "%" }}
              />
            </div>
          )}
          {onRemove && (
            <Button variant="ghost" size="icon-xs" onClick={() => onRemove(i)}>
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export { FileUpload, FileList };
