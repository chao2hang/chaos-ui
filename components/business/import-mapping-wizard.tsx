"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ArrowLeftIcon,
} from "@/components/ui/icons";

/**
 * @component ImportMappingWizard
 * @category business/data
 * @since 1.0.0
 * @description Column mapping step wizard for data import. Maps source file
 * columns to target system fields with auto-matching, data type preview,
 * and validation. Enhances bulk-import-wizard with dedicated mapping UI.
 * @keywords import, mapping, wizard, column, field, data, etl, transform
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** A source column from the imported file. */
interface SourceColumn {
  /** Column name from file header */
  name: string;
  /** Index in the source file */
  index: number;
  /** Sample data (first few rows) */
  samples?: string[];
  /** Detected data type */
  detectedType?: "string" | "number" | "date" | "boolean";
}

/** A target field in the destination system. */
interface TargetField {
  /** Field name */
  name: string;
  /** Field label for display */
  label: string;
  /** Expected data type */
  type: "string" | "number" | "date" | "boolean" | "enum";
  /** Is this field required? */
  required?: boolean;
  /** Enum values (for type "enum") */
  options?: string[];
  /** Default value if unmapped */
  defaultValue?: string;
}

/** A column mapping entry. */
interface ColumnMapping {
  /** Source column name (empty = unmapped) */
  source: string;
  /** Target field name */
  target: string;
  /** Is this auto-matched? */
  autoMatched?: boolean;
  /** Type compatibility status */
  typeMatch?: boolean;
}

/** Props for ImportMappingWizard. */
interface ImportMappingWizardProps {
  /** Source columns from the file */
  sourceColumns: SourceColumn[];
  /** Target fields in the system */
  targetFields: TargetField[];
  /** Current mappings */
  mappings: ColumnMapping[];
  /** Mapping change callback */
  onMappingsChange?: (mappings: ColumnMapping[]) => void;
  /** Show sample data preview */
  showSamples?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Continue/next button handler */
  onContinue?: () => void;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function checkTypeMatch(
  sourceType: string | undefined,
  targetType: string,
): boolean {
  if (!sourceType) return true; // Unknown source type → allow
  if (sourceType === targetType) return true;
  // Allow string → anything (conversion)
  if (sourceType === "string") return true;
  // Allow number → string
  if (sourceType === "number" && targetType === "string") return true;
  // Allow date → string
  if (sourceType === "date" && targetType === "string") return true;
  return false;
}

/** Auto-match source columns to target fields by name similarity. */
function autoMatch(
  sourceColumns: SourceColumn[],
  targetFields: TargetField[],
): ColumnMapping[] {
  const result: ColumnMapping[] = [];
  const usedSources = new Set<string>();

  for (const target of targetFields) {
    // Try exact match (case-insensitive)
    const exactMatch = sourceColumns.find(
      (s) =>
        s.name.toLowerCase() === target.name.toLowerCase() &&
        !usedSources.has(s.name),
    );
    if (exactMatch) {
      result.push({
        source: exactMatch.name,
        target: target.name,
        autoMatched: true,
        typeMatch: checkTypeMatch(exactMatch.detectedType, target.type),
      });
      usedSources.add(exactMatch.name);
      continue;
    }

    // Try partial match (target name contains source name or vice versa)
    const partialMatch = sourceColumns.find(
      (s) =>
        !usedSources.has(s.name) &&
        (s.name.toLowerCase().includes(target.name.toLowerCase()) ||
          target.name.toLowerCase().includes(s.name.toLowerCase())),
    );
    if (partialMatch) {
      result.push({
        source: partialMatch.name,
        target: target.name,
        autoMatched: true,
        typeMatch: checkTypeMatch(partialMatch.detectedType, target.type),
      });
      usedSources.add(partialMatch.name);
      continue;
    }

    // Unmapped
    result.push({
      source: "",
      target: target.name,
      autoMatched: false,
      typeMatch: true,
    });
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function ImportMappingWizard({
  sourceColumns,
  targetFields,
  mappings: controlledMappings,
  onMappingsChange,
  showSamples = true,
  onBack,
  onContinue,
  className,
}: ImportMappingWizardProps) {
  /* ---- internal mappings state (uncontrolled fallback) ---- */
  const [internalMappings, setInternalMappings] = React.useState<
    ColumnMapping[]
  >(() =>
    controlledMappings.length > 0
      ? controlledMappings
      : autoMatch(sourceColumns, targetFields),
  );

  const mappings =
    controlledMappings.length > 0 ? controlledMappings : internalMappings;

  const updateMapping = (target: string, source: string) => {
    const sourceCol = sourceColumns.find((s) => s.name === source);
    const targetField = targetFields.find((t) => t.name === target);
    const updated = mappings.map((m) =>
      m.target === target
        ? {
            ...m,
            source,
            autoMatched: false,
            typeMatch:
              sourceCol && targetField
                ? checkTypeMatch(sourceCol.detectedType, targetField.type)
                : true,
          }
        : m,
    );
    if (onMappingsChange) {
      onMappingsChange(updated);
    } else {
      setInternalMappings(updated);
    }
  };

  const handleAutoMatch = () => {
    const auto = autoMatch(sourceColumns, targetFields);
    if (onMappingsChange) {
      onMappingsChange(auto);
    } else {
      setInternalMappings(auto);
    }
  };

  /* ---- stats ---- */
  const stats = React.useMemo(() => {
    const mapped = mappings.filter((m) => m.source).length;
    const required = targetFields.filter((t) => t.required).length;
    const requiredMapped = mappings.filter(
      (m) =>
        m.source && targetFields.find((t) => t.name === m.target)?.required,
    ).length;
    const typeMismatches = mappings.filter(
      (m) => m.source && !m.typeMatch,
    ).length;
    return {
      mapped,
      total: mappings.length,
      required,
      requiredMapped,
      typeMismatches,
    };
  }, [mappings, targetFields]);

  const canContinue =
    stats.requiredMapped === stats.required && stats.typeMismatches === 0;

  /* ---- used sources for dropdown filtering ---- */
  const usedSources = new Set(
    mappings.filter((m) => m.source).map((m) => m.source),
  );

  return (
    <div
      data-slot="import-mapping-wizard"
      className={cn("space-y-4", className)}
    >
      {/* Summary bar */}
      <div className="border-border bg-muted/30 flex flex-wrap items-center gap-3 rounded-lg border px-4 py-2">
        <span className="text-foreground text-sm font-medium">
          Mapping Summary:
        </span>
        <Badge variant="default" className="text-xs">
          {stats.mapped}/{stats.total} mapped
        </Badge>
        <Badge
          variant={
            stats.requiredMapped === stats.required ? "default" : "destructive"
          }
          className="text-xs"
        >
          {stats.requiredMapped}/{stats.required} required
        </Badge>
        {stats.typeMismatches > 0 && (
          <Badge variant="destructive" className="text-xs">
            {stats.typeMismatches} type mismatch
          </Badge>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAutoMatch}
          className="ml-auto"
        >
          Auto-Match
        </Button>
      </div>

      {/* Mapping table */}
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="min-w-[180px]">Source Column</TableHead>
              <TableHead className="w-12 text-center">→</TableHead>
              <TableHead className="min-w-[180px]">Target Field</TableHead>
              <TableHead className="w-20">Type</TableHead>
              <TableHead className="w-16">Required</TableHead>
              <TableHead className="w-16">Status</TableHead>
              {showSamples && (
                <TableHead className="min-w-[200px]">Sample Data</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappings.map((mapping) => {
              const target = targetFields.find(
                (t) => t.name === mapping.target,
              );
              const sourceCol = sourceColumns.find(
                (s) => s.name === mapping.source,
              );
              const isUnmapped = !mapping.source;
              const hasTypeMismatch = mapping.source && !mapping.typeMatch;
              return (
                <TableRow
                  key={mapping.target}
                  data-slot="import-mapping-row"
                  data-status={
                    isUnmapped
                      ? "unmapped"
                      : hasTypeMismatch
                        ? "mismatch"
                        : "mapped"
                  }
                >
                  {/* Source column dropdown */}
                  <TableCell>
                    <NativeSelect
                      size="sm"
                      className="w-full"
                      value={mapping.source}
                      onChange={(e) =>
                        updateMapping(mapping.target, e.target.value)
                      }
                      aria-label={`Source column for ${mapping.target}`}
                      options={[
                        { value: "", label: "— Not mapped —" },
                        ...sourceColumns.map((s) => ({
                          value: s.name,
                          label: s.detectedType
                            ? `${s.name} (${s.detectedType})`
                            : s.name,
                          disabled:
                            usedSources.has(s.name) &&
                            s.name !== mapping.source,
                        })),
                      ]}
                    />
                  </TableCell>

                  {/* Arrow */}
                  <TableCell className="text-center">
                    <ArrowRightIcon className="text-muted-foreground mx-auto size-4" />
                  </TableCell>

                  {/* Target field */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm font-medium">
                        {target?.label ?? mapping.target}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {mapping.target}
                      </span>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {target?.type ?? "string"}
                    </Badge>
                  </TableCell>

                  {/* Required */}
                  <TableCell className="text-center">
                    {target?.required ? (
                      <span className="text-destructive">*</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    {isUnmapped ? (
                      target?.required ? (
                        <AlertCircleIcon className="text-destructive mx-auto size-4" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )
                    ) : hasTypeMismatch ? (
                      <AlertCircleIcon className="mx-auto size-4 text-yellow-500" />
                    ) : (
                      <CheckCircle2Icon className="mx-auto size-4 text-green-600" />
                    )}
                  </TableCell>

                  {/* Sample data */}
                  {showSamples && (
                    <TableCell>
                      {sourceCol?.samples ? (
                        <div className="text-muted-foreground flex flex-col gap-0.5 text-xs">
                          {sourceCol.samples.slice(0, 3).map((s, i) => (
                            <span key={i} className="truncate">
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="mr-1 size-4" />
          Back
        </Button>
        <Button onClick={onContinue} disabled={!canContinue}>
          Continue
          <ArrowRightIcon className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}

export { ImportMappingWizard };
export type {
  ImportMappingWizardProps,
  SourceColumn,
  TargetField,
  ColumnMapping,
};
