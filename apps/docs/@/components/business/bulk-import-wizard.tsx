"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stepper } from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UploadIcon,
  FileSpreadsheetIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";

interface BulkImportWizardProps extends React.HTMLAttributes<HTMLDivElement> {
  onImport?: (data: Record<string, string>[]) => void;
  onCancel?: () => void;
  className?: string;
}

const SAMPLE_DATA = [
  { name: "张三", email: "zhangsan@example.com", department: "技术部" },
  { name: "李四", email: "lisi@example.com", department: "市场部" },
];

function BulkImportWizard({
  onImport,
  onCancel,
  className,
  ...props
}: BulkImportWizardProps) {
  const [step, setStep] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<Record<string, string>[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(SAMPLE_DATA);
      setStep(1);
    }
  };

  return (
    <div
      data-slot="bulk-import-wizard"
      className={cn("space-y-6", className)}
      {...props}
    >
      <Stepper
        steps={["上传文件", "预览数据", "确认导入"]}
        current={step}
        className="mx-auto w-full max-w-lg"
      />
      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">上传文件</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <div className="bg-muted flex size-20 items-center justify-center rounded-full">
              <UploadIcon className="text-muted-foreground size-8" />
            </div>
            <p className="text-muted-foreground text-sm">
              拖拽文件到此处，或点击选择文件
            </p>
            <p className="text-muted-foreground text-xs">
              支持 .xlsx, .csv 格式
            </p>
            <Input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
              className="max-w-xs"
            />
          </CardContent>
        </Card>
      )}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              预览数据 ({preview.length} 条记录)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(preview[0] ?? {}).map((k) => (
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
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <div className="bg-success/10 flex size-16 items-center justify-center rounded-full">
              <CheckIcon className="text-success size-8" />
            </div>
            <p className="text-lg font-medium">导入完成</p>
            <p className="text-muted-foreground text-sm">
              共导入 {preview.length} 条记录
            </p>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-end gap-3">
        {step > 0 && step < 2 && (
          <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
            上一步
          </Button>
        )}
        {step === 0 && (
          <Button variant="outline" onClick={onCancel}>
            取消
          </Button>
        )}
        {step === 1 && (
          <Button
            onClick={() => {
              setStep(2);
              onImport?.(preview);
            }}
          >
            确认导入
          </Button>
        )}
        {step === 2 && (
          <Button variant="outline" onClick={onCancel}>
            关闭
          </Button>
        )}
      </div>
    </div>
  );
}

export { BulkImportWizard };
export type { BulkImportWizardProps };
