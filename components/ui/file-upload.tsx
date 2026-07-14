"use client";
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
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

/**
 * @component FileUpload
 * @category ui/data-entry
 * @since 0.2.0
 * @description Drag-and-drop file upload area with accept and max size constraints / 拖放文件上传区域，支持文件类型和大小限制
 * @keywords file, upload, drag, drop, dropzone
 * @example
 * <FileUpload onDrop={(files) => console.log(files)} maxFiles={5} />
 */
function FileUpload({
  onDrop,
  accept,
  maxFiles = 5,
  maxSize,
  disabled,
  className,
  labels,
}: {
  onDrop?: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  /** Override i18n copy (issue #19) / 覆盖上传区文案 */
  labels?: {
    dropActive?: string;
    hint?: string;
    maxFiles?: string;
    singleFile?: string;
    maxSize?: string;
  };
}) {
  const { t } = useTranslation("ui");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...(onDrop !== undefined ? { onDrop } : {}),
    ...(accept !== undefined ? { accept } : {}),
    maxFiles,
    ...(maxSize !== undefined ? { maxSize } : {}),
    ...(disabled !== undefined ? { disabled } : {}),
  });

  const dropActive =
    labels?.dropActive ??
    t("fileUpload.dropActive", { defaultValue: "松开以上传文件…" });
  const hint =
    labels?.hint ??
    t("fileUpload.hint", {
      defaultValue: "拖拽文件到此处，或点击选择",
    });
  const maxFilesText =
    labels?.maxFiles ??
    t("fileUpload.maxFiles", {
      count: maxFiles,
      defaultValue: `最多 ${maxFiles} 个文件`,
    });
  const singleFileText =
    labels?.singleFile ??
    t("fileUpload.singleFile", { defaultValue: "单个文件" });
  const maxSizeSuffix =
    maxSize != null
      ? (labels?.maxSize ??
        t("fileUpload.maxSize", {
          size: Math.round(maxSize / 1024 / 1024),
          defaultValue: `（每个最大 ${Math.round(maxSize / 1024 / 1024)}MB）`,
        }))
      : "";

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input {...getInputProps()} />
      <UploadIcon
        className={cn(
          "mb-2 size-8",
          isDragActive ? "text-primary" : "text-muted-foreground",
        )}
      />
      {isDragActive ? (
        <p className="text-primary text-sm font-medium">{dropActive}</p>
      ) : (
        <div className="space-y-1">
          <p className="text-sm font-medium">{hint}</p>
          <p className="text-muted-foreground text-xs">
            {maxFiles > 1 ? maxFilesText : singleFileText}
            {maxSizeSuffix}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * @component FileList
 * @category ui/data-entry
 * @since 0.2.0
 * @description Displays a list of uploaded files with status, progress, and remove action / 显示已上传文件列表，含状态、进度和移除操作
 * @keywords file, list, upload, status, progress
 * @example
 * <FileList files={files} onRemove={(i) => removeFile(i)} />
 */
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
          <FileIcon className="text-muted-foreground size-4 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-muted-foreground text-xs">
              {formatSize(file.size)}
            </p>
          </div>
          {file.status === "success" && (
            <CheckCircleIcon className="text-success size-4" />
          )}
          {file.status === "error" && (
            <AlertCircleIcon className="text-destructive size-4" />
          )}
          {file.progress !== undefined && (
            <div className="bg-muted h-1.5 w-16 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all"
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

// ─── PictureWall / PictureCard ────────────────────────────────────────

/**
 * @component PictureWall
 * @category ui/data-entry
 * @since 0.2.0
 * @description Image upload grid showing thumbnails with upload progress and remove actions / 图片上传网格，展示缩略图及上传进度和删除操作
 * @keywords picture, upload, image, grid, gallery, thumbnail
 * @example
 * <PictureWall fileList={images} onChange={setImages} maxCount={8} />
 */
export interface UploadFile {
  uid: string;
  name: string;
  url?: string;
  thumbUrl?: string;
  status?: "uploading" | "done" | "error";
  percent?: number;
}

interface PictureWallProps {
  fileList?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  /** Custom upload handler. Return a promise that resolves with the uploaded URL. / 自定义上传处理 */
  customUpload?: (file: File) => Promise<{ url: string; thumbUrl?: string }>;
  maxCount?: number;
  accept?: string;
  disabled?: boolean;
  className?: string;
}

let _uid = 0;
function nextUid() {
  return `upload-${++_uid}-${Date.now()}`;
}

/**
 * @component PictureWall
 * @category ui/data-entry
 * @since 0.2.0
 * @description Image upload grid showing thumbnails with upload progress and remove actions / 图片上传网格，展示缩略图及上传进度和删除操作
 * @keywords picture, upload, image, grid, gallery, thumbnail
 * @example
 * <PictureWall fileList={images} onChange={setImages} maxCount={8} />
 */
function PictureWall({
  fileList = [],
  onChange,
  onPreview,
  onRemove,
  customUpload,
  maxCount = 8,
  accept = "image/*",
  disabled,
  className,
}: PictureWallProps) {
  const handleFiles = async (files: FileList | null) => {
    if (!files || disabled) return;
    const remaining = maxCount - fileList.length;
    const toAdd = Array.from(files).slice(0, remaining);

    for (const file of toAdd) {
      const uid = nextUid();
      const uploading: UploadFile = {
        uid,
        name: file.name,
        status: "uploading",
        percent: 0,
      };
      const next = [...fileList, uploading];
      onChange?.(next);

      if (customUpload) {
        try {
          const result = await customUpload(file);
          onChange?.(
            next.map((f) =>
              f.uid === uid ? { ...f, ...result, status: "done" } : f,
            ),
          );
        } catch {
          onChange?.(
            next.map((f) => (f.uid === uid ? { ...f, status: "error" } : f)),
          );
        }
      } else {
        // No customUpload — mark as done with object URL for preview
        const url = URL.createObjectURL(file);
        onChange?.(
          next.map((f) => (f.uid === uid ? { ...f, url, status: "done" } : f)),
        );
      }
    }
  };

  const handleRemove = (file: UploadFile, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = fileList.filter((f) => f.uid !== file.uid);
    onChange?.(next);
    onRemove?.(file);
  };

  const showUploadTrigger = fileList.length < maxCount;

  return (
    <div
      data-slot="picture-wall"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {fileList.map((file) => (
        <div
          key={file.uid}
          className="group relative size-20 cursor-pointer overflow-hidden rounded-md border"
          onClick={() => onPreview?.(file)}
        >
          {file.url || file.thumbUrl ? (
            <img
              src={file.thumbUrl ?? file.url}
              alt={file.name}
              className="size-full object-cover"
            />
          ) : (
            <div className="bg-muted flex size-full items-center justify-center">
              <FileIcon className="text-muted-foreground size-6" />
            </div>
          )}
          {/* Progress / status overlay */}
          {file.status === "uploading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-xs font-medium text-white">
                {file.percent ?? 0}%
              </span>
            </div>
          )}
          {file.status === "error" && (
            <div className="bg-destructive/20 absolute inset-0 flex items-center justify-center">
              <AlertCircleIcon className="text-destructive size-5" />
            </div>
          )}
          {/* Remove button */}
          {!disabled && (
            <button
              type="button"
              className="bg-background absolute -top-1 -right-1 rounded-full border p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => handleRemove(file, e)}
              aria-label={`Remove ${file.name}`}
            >
              <XIcon className="size-3" />
            </button>
          )}
        </div>
      ))}
      {showUploadTrigger && !disabled && (
        <label className="border-muted-foreground/25 hover:border-primary/50 flex size-20 cursor-pointer items-center justify-center rounded-md border-2 border-dashed transition-colors">
          <UploadIcon className="text-muted-foreground size-5" />
          <input
            type="file"
            accept={accept}
            multiple={maxCount - fileList.length > 1}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}

/**
 * @component PictureCard
 * @category ui/data-entry
 * @since 0.2.0
 * @description Single-image upload card with preview, hover actions, and upload progress / 单图上传卡片，支持预览、悬停操作和上传进度
 * @keywords picture, card, upload, image, single, preview
 * @example
 * <PictureCard fileList={images} onChange={setImages} />
 */
// PictureCard reuses PictureWallProps directly — no additional props yet
function PictureCard({
  fileList = [],
  onChange,
  onPreview,
  onRemove,
  customUpload,
  maxCount = 1,
  accept = "image/*",
  disabled,
  className,
}: PictureWallProps) {
  const handleFiles = async (files: FileList | null) => {
    if (!files || disabled) return;
    const toAdd = Array.from(files).slice(0, maxCount - fileList.length);

    for (const file of toAdd) {
      const uid = nextUid();
      const uploading: UploadFile = {
        uid,
        name: file.name,
        status: "uploading",
      };
      const next = [...fileList, uploading];
      onChange?.(next);

      if (customUpload) {
        try {
          const result = await customUpload(file);
          onChange?.(
            next.map((f: UploadFile) =>
              f.uid === uid ? { ...f, ...result, status: "done" as const } : f,
            ),
          );
        } catch {
          onChange?.(
            next.map((f: UploadFile) =>
              f.uid === uid ? { ...f, status: "error" as const } : f,
            ),
          );
        }
      } else {
        const url = URL.createObjectURL(file);
        onChange?.(
          next.map((f: UploadFile) =>
            f.uid === uid ? { ...f, url, status: "done" as const } : f,
          ),
        );
      }
    }
  };

  const handleRemove = (file: UploadFile, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = fileList.filter((f) => f.uid !== file.uid);
    onChange?.(next);
    onRemove?.(file);
  };

  const showTrigger = fileList.length < maxCount;

  return (
    <div
      data-slot="picture-card"
      className={cn("flex flex-wrap gap-3", className)}
    >
      {fileList.map((file) => (
        <div
          key={file.uid}
          className="group bg-muted/30 relative size-40 overflow-hidden rounded-lg border"
        >
          {file.url || file.thumbUrl ? (
            <img
              src={file.thumbUrl ?? file.url}
              alt={file.name}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-1">
              <FileIcon className="text-muted-foreground size-8" />
              <span className="text-muted-foreground max-w-full truncate px-2 text-xs">
                {file.name}
              </span>
            </div>
          )}
          {file.status === "uploading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-sm font-medium text-white">
                Uploading...
              </span>
            </div>
          )}
          {/* Hover actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            {onPreview && file.url && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-white hover:bg-white/20"
                onClick={() => onPreview(file)}
              >
                <UploadIcon className="size-4" />
              </Button>
            )}
            {!disabled && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-white hover:bg-white/20"
                onClick={(e) => handleRemove(file, e)}
              >
                <XIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
      {showTrigger && !disabled && (
        <label className="border-muted-foreground/25 hover:border-primary/50 flex size-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors">
          <UploadIcon className="text-muted-foreground size-6" />
          <span className="text-muted-foreground text-xs">Upload</span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}

export { PictureWall, PictureCard };
