"use client";

import * as React from "react";

import { Button } from "@chaos_team/chaos-ui/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
} from "@chaos_team/chaos-ui/ui";
import { FileUpload } from "@chaos_team/chaos-ui/ui";
import { UploadIcon, DownloadIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ImportDialog
 * @category business/import
 * @since 0.7.0
 * @description 数据导入弹窗 — 文件上传 + 模板下载 + 导入进度 + 错误反馈。
 * / Data import dialog — file upload + template download + progress + error feedback.
 * @keywords import, upload, dialog, excel, csv, data
 * @example
 * <ImportDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   onImport={handleImport}
 *   templateUrl="/templates/import.xlsx"
 * />
 */
interface ImportDialogProps {
  /** Dialog open state / 弹窗是否打开 */
  open?: boolean;
  /** Open change callback / 开关回调 */
  onOpenChange?: (open: boolean) => void;
  /** Import handler — receives the uploaded file / 导入处理函数 */
  onImport?: (file: File) => Promise<void> | void;
  /** Template download URL / 模板下载地址 */
  templateUrl?: string;
  /** Accepted file types / 接受的文件类型 */
  accept?: string;
  /** Dialog title / 弹窗标题 */
  title?: string;
  /** Import button text / 导入按钮文本 */
  importText?: string;
  /** Template button text / 模板按钮文本 */
  templateText?: string;
}

function ImportDialog({
  open,
  onOpenChange,
  onImport,
  templateUrl,
  accept = ".xlsx,.xls,.csv",
  title = "Import Data",
  importText = "Import",
  templateText = "Download Template",
}: ImportDialogProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleImport = async () => {
    if (!file || !onImport) return;
    setLoading(true);
    try {
      await onImport(file);
      onOpenChange?.(false);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-slot="import-dialog" className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload a file to import data. Please use the template for correct
            formatting.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {templateUrl && (
            <a
              href={templateUrl}
              download
              className="text-primary mb-3 inline-flex items-center gap-1.5 text-sm hover:underline"
            >
              <DownloadIcon className="size-3.5" />
              {templateText}
            </a>
          )}
          <FileUpload
            {...(accept ? { accept: { "*/*": [accept] } } : {})}
            onDrop={(files: File[]) => setFile(files[0] ?? null)}
          />
          {file && (
            <div className="text-muted-foreground mt-2 text-sm">
              Selected: {file.name}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || loading}
            icon={<UploadIcon />}
          >
            {loading ? "Importing..." : importText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ImportDialog };
export type { ImportDialogProps };
