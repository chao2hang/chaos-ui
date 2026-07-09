"use client";
import { useTranslation } from "react-i18next";

import * as React from "react";
import {
  CheckCircle2Icon,
  FileSpreadsheetIcon,
  UploadIcon,
} from "@/components/ui/icons";

import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Progress } from "@/components/ui";
import { Step, Stepper } from "@/components/ui";
import { cn } from "@/lib/utils";

export type BulkImportStep = "upload" | "mapping" | "validation" | "complete";

export interface BulkImportValidationRow {
  row: number;
  status: "valid" | "warning" | "error";
  message: string;
}

export interface BulkImportWizardProps extends React.ComponentProps<"div"> {
  step?: BulkImportStep;
  filename?: string;
  progress?: number;
  mappings?: Array<{ source: string; target: string }>;
  validationRows?: BulkImportValidationRow[];
  importedCount?: number;
  onUpload?: () => void;
  onContinue?: () => void;
}

const stepIndex: Record<BulkImportStep, number> = {
  upload: 0,
  mapping: 1,
  validation: 2,
  complete: 3,
};

/**
 * @component BulkImportWizard
 * @category business/ux
 * @since 0.2.0
 * @description Multi-step import wizard with upload, field mapping, validation preview, and completion steps / 多步骤批量导入向导，包含上传、字段映射、校验和完成步骤
 * @keywords import, bulk, wizard, upload, mapping, validation
 * @example
 * <BulkImportWizard step="upload" onUpload={() => {}} onContinue={() => {}} />
 */
export function BulkImportWizard({
  step = "upload",
  filename,
  progress = 0,
  mappings = [],
  validationRows = [],
  importedCount,
  onUpload,
  onContinue,
  className,
  ...props
}: BulkImportWizardProps) {
  const { t } = useTranslation("upload");
  return (
    <div
      data-slot="bulk-import-wizard"
      className={cn("space-y-6 rounded-lg border p-6", className)}
      {...props}
    >
      <Stepper activeStep={stepIndex[step]}>
        <Step>{t("bulkImportWizard.upload")}</Step>
        <Step>{t("bulkImportWizard.mapFields")}</Step>
        <Step>{t("bulkImportWizard.validate")}</Step>
        <Step>{t("bulkImportWizard.complete")}</Step>
      </Stepper>

      {step === "upload" && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center">
          <UploadIcon className="text-muted-foreground size-8" />
          <div>
            <p className="text-sm font-medium">
              {t("bulkImportWizard.uploadTitle")}
            </p>
            <p className="text-muted-foreground text-xs">
              {t("bulkImportWizard.uploadDescription")}
            </p>
          </div>
          <Button type="button" onClick={onUpload}>
            {t("bulkImportWizard.selectFile")}
          </Button>
        </div>
      )}

      {step === "mapping" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <FileSpreadsheetIcon className="text-muted-foreground size-4" />
            <span>{filename ?? "audience-import.csv"}</span>
          </div>
          <div className="grid gap-2">
            {mappings.map((mapping) => (
              <div
                key={`${mapping.source}-${mapping.target}`}
                className="flex items-center justify-between rounded-md border p-3 text-sm"
              >
                <span>{mapping.source}</span>
                <span className="text-muted-foreground">
                  {t("bulkImportWizard.mapsTo")}
                </span>
                <Badge variant="outline">{mapping.target}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "validation" && (
        <div className="space-y-3">
          <Progress value={progress} />
          <div className="divide-y rounded-lg border">
            {validationRows.map((row) => (
              <div
                key={`${row.row}-${row.message}`}
                className="flex items-center justify-between gap-3 p-3 text-sm"
              >
                <span>Row {row.row}</span>
                <span className="text-muted-foreground flex-1">
                  {row.message}
                </span>
                <Badge
                  variant={
                    row.status === "error"
                      ? "destructive"
                      : row.status === "warning"
                        ? "secondary"
                        : "default"
                  }
                >
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "complete" && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border p-8 text-center">
          <CheckCircle2Icon className="text-success size-10" />
          <div>
            <p className="text-sm font-medium">
              {t("bulkImportWizard.importComplete")}
            </p>
            <p className="text-muted-foreground text-xs">
              {t("bulkImportWizard.recordsImported", {
                count: importedCount ?? 0,
              })}
            </p>
          </div>
        </div>
      )}

      {step !== "complete" && (
        <div className="flex justify-end">
          <Button type="button" onClick={onContinue}>
            {t("bulkImportWizard.continue")}
          </Button>
        </div>
      )}
    </div>
  );
}
