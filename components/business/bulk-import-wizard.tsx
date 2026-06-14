"use client"

import * as React from "react"
import { CheckCircle2Icon, FileSpreadsheetIcon, UploadIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Step, Stepper } from "@/components/ui/stepper"
import { cn } from "@/lib/utils"

export type BulkImportStep = "upload" | "mapping" | "validation" | "complete"

export interface BulkImportValidationRow {
  row: number
  status: "valid" | "warning" | "error"
  message: string
}

export interface BulkImportWizardProps extends React.ComponentProps<"div"> {
  step?: BulkImportStep
  filename?: string
  progress?: number
  mappings?: Array<{ source: string; target: string }>
  validationRows?: BulkImportValidationRow[]
  importedCount?: number
  onUpload?: () => void
  onContinue?: () => void
}

const stepIndex: Record<BulkImportStep, number> = {
  upload: 0,
  mapping: 1,
  validation: 2,
  complete: 3,
}

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
  return (
    <div data-slot="bulk-import-wizard" className={cn("space-y-6 rounded-lg border p-6", className)} {...props}>
      <Stepper activeStep={stepIndex[step]}>
        <Step>Upload</Step>
        <Step>Map fields</Step>
        <Step>Validate</Step>
        <Step>Complete</Step>
      </Stepper>

      {step === "upload" && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center">
          <UploadIcon className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Upload a CSV or spreadsheet</p>
            <p className="text-xs text-muted-foreground">Import contacts, products, or campaign records in bulk.</p>
          </div>
          <Button type="button" onClick={onUpload}>
            Select file
          </Button>
        </div>
      )}

      {step === "mapping" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <FileSpreadsheetIcon className="size-4 text-muted-foreground" />
            <span>{filename ?? "audience-import.csv"}</span>
          </div>
          <div className="grid gap-2">
            {mappings.map((mapping) => (
              <div key={`${mapping.source}-${mapping.target}`} className="flex items-center justify-between rounded-md border p-3 text-sm">
                <span>{mapping.source}</span>
                <span className="text-muted-foreground">maps to</span>
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
              <div key={`${row.row}-${row.message}`} className="flex items-center justify-between gap-3 p-3 text-sm">
                <span>Row {row.row}</span>
                <span className="flex-1 text-muted-foreground">{row.message}</span>
                <Badge variant={row.status === "error" ? "destructive" : row.status === "warning" ? "secondary" : "default"}>
                  {row.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "complete" && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border p-8 text-center">
          <CheckCircle2Icon className="size-10 text-success" />
          <div>
            <p className="text-sm font-medium">Import complete</p>
            <p className="text-xs text-muted-foreground">{importedCount ?? 0} records were imported successfully.</p>
          </div>
        </div>
      )}

      {step !== "complete" && (
        <div className="flex justify-end">
          <Button type="button" onClick={onContinue}>Continue</Button>
        </div>
      )}
    </div>
  )
}
