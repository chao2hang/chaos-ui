"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadIcon, FileTextIcon } from "lucide-react";

interface ImportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onImport?: (data: Record<string, string>[]) => void;
  title?: string;
  description?: string;
  accept?: string;
  className?: string;
}

const SAMPLE_ROWS = [
  { name: "示例数据1", value: "100" },
  { name: "示例数据2", value: "200" },
];

function ImportDialog({
  open,
  onOpenChange,
  onImport,
  title = "导入数据",
  description = "上传文件并预览后再确认导入",
  accept = ".xlsx,.csv",
  className,
}: ImportDialogProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<Record<string, string>[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(SAMPLE_ROWS);
    }
  };

  const handleImport = () => {
    onImport?.(preview);
    onOpenChange?.(false);
    setFile(null);
    setPreview([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <UploadIcon /> {title}
        </Button>
      </DialogTrigger>
      <DialogContent data-slot="import-dialog" className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-dashed p-4">
            <FileTextIcon className="text-muted-foreground size-8" />
            <div className="flex-1">
              <p className="text-sm font-medium">
                {file ? file.name : "选择文件"}
              </p>
              <p className="text-muted-foreground text-xs">
                支持 {accept} 格式
              </p>
            </div>
            <Input
              type="file"
              accept={accept}
              onChange={handleFile}
              className="max-w-[180px]"
            />
          </div>
          {preview.length > 0 && (
            <div className="max-h-60 overflow-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(preview[0]).map((k) => (
                      <TableHead key={k}>{k}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.map((row, i) => (
                    <TableRow key={i}>
                      {Object.values(row).map((v, j) => (
                        <TableCell key={j}>{v}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            取消
          </Button>
          <Button onClick={handleImport} disabled={preview.length === 0}>
            确认导入
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ImportDialog };
export type { ImportDialogProps };
