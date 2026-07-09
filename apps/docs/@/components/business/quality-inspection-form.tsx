"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@chaos_team/chaos-ui/ui";
import { InputNumber } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { RadioGroup, RadioGroupItem } from "@chaos_team/chaos-ui/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@chaos_team/chaos-ui/ui";
import { Separator } from "@chaos_team/chaos-ui/ui";
import {
  CheckCircleIcon,
  XCircleIcon,
  CameraIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Supported field types in a quality inspection template. */
export type InspectionFieldType =
  "measurement" | "passfail" | "select" | "text" | "photo";

/** A single field definition inside an inspection template. */
export interface InspectionField {
  /** Field identifier */
  id: string;
  /** Field label */
  label: string;
  /** Field type */
  type: InspectionFieldType;
  /** Unit for measurements (mm, C, kg, etc.) */
  unit?: string;
  /** Minimum spec value for measurement */
  specMin?: number;
  /** Maximum spec value for measurement */
  specMax?: number;
  /** Options for select type */
  options?: Array<{ label: string; value: string }>;
  /** Whether field is required */
  required?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Group name for organizing fields */
  group?: string;
}

/** A reusable inspection template (IQC / IPQC / OQC). */
export interface InspectionTemplate {
  /** Template name */
  name: string;
  /** Template description */
  description?: string;
  /** Inspection type label */
  type?: "IQC" | "IPQC" | "OQC" | "custom";
  /** Field definitions */
  fields: InspectionField[];
}

/** The result payload submitted after completing an inspection. */
export interface InspectionResult {
  /** Field values keyed by field id */
  values: Record<string, string | number | boolean | null>;
  /** Auto-computed result: pass if all measurements in spec + no failures */
  result: "pass" | "fail" | "pending";
  /** Inspector name */
  inspector?: string;
  /** Inspection date */
  date?: string;
  /** Notes */
  notes?: string;
}

/** Props for the QualityInspectionForm component. */
export interface QualityInspectionFormProps {
  /** Inspection template defining the form fields */
  template: InspectionTemplate;
  /** Pre-filled values (for editing existing inspection) */
  values?: Record<string, string | number | boolean | null>;
  /** Inspector info */
  inspector?: string;
  /** Submit handler */
  onSubmit?: (result: InspectionResult) => void;
  /** Read-only mode (viewing completed inspection) */
  readOnly?: boolean;
  /** Show auto-computed result */
  showResult?: boolean;
  /** Additional CSS class names on the root element */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Auto-compute the inspection result based on field values and spec limits.
 * - "pass" when all measurement fields are within spec AND all passfail fields are "pass"
 * - "fail" when any field is out of spec or "fail"
 * - "pending" otherwise (incomplete data)
 */
export function computeResult(
  template: InspectionTemplate,
  values: Record<string, string | number | boolean | null>,
): "pass" | "fail" | "pending" {
  let allFilled = true;

  for (const field of template.fields) {
    const val = values[field.id];

    if (field.type === "measurement") {
      if (val == null || val === "") {
        allFilled = false;
        continue;
      }
      const num = Number(val);
      if (!Number.isFinite(num)) {
        allFilled = false;
        continue;
      }
      if (field.specMin != null && num < field.specMin) return "fail";
      if (field.specMax != null && num > field.specMax) return "fail";
    }

    if (field.type === "passfail") {
      if (val == null || val === "") {
        allFilled = false;
        continue;
      }
      if (val === false || val === "fail") return "fail";
    }
  }

  return allFilled ? "pass" : "pending";
}

/**
 * Check whether a single measurement value is out of spec.
 */
function isOutOfSpec(
  field: InspectionField,
  val: string | number | boolean | null | undefined,
): boolean {
  if (field.type !== "measurement") return false;
  if (val == null || val === "") return false;
  const num = Number(val);
  if (!Number.isFinite(num)) return false;
  if (field.specMin != null && num < field.specMin) return true;
  if (field.specMax != null && num > field.specMax) return true;
  return false;
}

const resultColors: Record<string, string> = {
  pass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  fail: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  pending:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};

const resultLabels: Record<string, string> = {
  pass: "PASS",
  fail: "FAIL",
  pending: "PENDING",
};

/* -------------------------------------------------------------------------- */
/*  Grouping helper                                                           */
/* -------------------------------------------------------------------------- */

interface FieldGroup {
  name: string | null;
  fields: InspectionField[];
}

function groupFields(fields: InspectionField[]): FieldGroup[] {
  const hasGroups = fields.some((f) => f.group);
  if (!hasGroups) return [{ name: null, fields }];

  const map = new Map<string, InspectionField[]>();
  const order: string[] = [];

  for (const field of fields) {
    const key = field.group ?? "__ungrouped__";
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(field);
  }

  return order.map((key) => ({
    name: key === "__ungrouped__" ? null : key,
    fields: map.get(key)!,
  }));
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Configurable quality inspection form for manufacturing QC workflows.
 * Renders fields dynamically from a declarative template, auto-computes
 * pass/fail/pending results, supports field grouping, and provides a
 * read-only review mode.
 */
function QualityInspectionForm({
  template,
  values: preFilledValues,
  inspector,
  onSubmit,
  readOnly = false,
  showResult = true,
  className,
}: QualityInspectionFormProps) {
  const defaultValues = React.useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const f of template.fields) {
      defaults[f.id] = preFilledValues?.[f.id] ?? "";
    }
    return defaults;
  }, [template, preFilledValues]);

  const form = useForm({ defaultValues });
  const watchedValues = form.watch();

  const computedResult = React.useMemo(
    () =>
      computeResult(
        template,
        watchedValues as Record<string, string | number | boolean | null>,
      ),
    [template, watchedValues],
  );

  const handleSubmit = form.handleSubmit((vals) => {
    const values = vals as Record<string, string | number | boolean | null>;
    onSubmit?.({
      values,
      result: computeResult(template, values),
      ...(inspector ? { inspector } : {}),
      date: new Date().toISOString(),
    });
  });

  const groups = React.useMemo(
    () => groupFields(template.fields),
    [template.fields],
  );

  /* ---------- read-only renderer ---------- */
  if (readOnly) {
    return (
      <div
        data-slot="quality-inspection-form"
        className={cn("space-y-4", className)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">{template.name}</h3>
            {template.description && (
              <p className="text-muted-foreground text-sm">
                {template.description}
              </p>
            )}
          </div>
          {showResult && (
            <span
              data-testid="inspection-result-badge"
              className={cn(
                "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold",
                resultColors[computedResult],
              )}
            >
              {resultLabels[computedResult]}
            </span>
          )}
        </div>

        {inspector && (
          <p className="text-muted-foreground text-sm">
            Inspector: <span className="font-medium">{inspector}</span>
          </p>
        )}

        {groups.map((group, gi) => (
          <div key={group.name ?? `group-${gi}`} className="space-y-3">
            {group.name && (
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{group.name}</h4>
                <Separator />
              </div>
            )}
            <dl className="space-y-3">
              {group.fields.map((field) => {
                const val = (preFilledValues?.[field.id] ??
                  watchedValues[field.id]) as
                  string | number | boolean | null | undefined;
                const oos = isOutOfSpec(field, val);
                return (
                  <div key={field.id} className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground text-sm font-medium">
                      {field.label}
                      {field.unit && (
                        <span className="ml-1 text-xs">({field.unit})</span>
                      )}
                    </dt>
                    <dd
                      className="text-sm"
                      data-testid={`readonly-${field.id}`}
                    >
                      {field.type === "passfail" ? (
                        <span className="inline-flex items-center gap-1">
                          {val === true || val === "pass" ? (
                            <>
                              <CheckCircleIcon className="size-4 text-emerald-600" />
                              <span className="text-emerald-700 dark:text-emerald-400">
                                Pass
                              </span>
                            </>
                          ) : val === false || val === "fail" ? (
                            <>
                              <XCircleIcon className="size-4 text-red-600" />
                              <span className="text-red-700 dark:text-red-400">
                                Fail
                              </span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">
                              {"\u2014"}
                            </span>
                          )}
                        </span>
                      ) : val != null && val !== "" ? (
                        <span
                          className={cn(
                            oos &&
                              "font-semibold text-red-600 dark:text-red-400",
                          )}
                        >
                          {String(val)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          {"\u2014"}
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>
    );
  }

  /* ---------- editable form ---------- */
  return (
    <Form {...form}>
      <form
        data-slot="quality-inspection-form"
        className={cn("space-y-5", className)}
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">{template.name}</h3>
            {template.description && (
              <p className="text-muted-foreground text-sm">
                {template.description}
              </p>
            )}
          </div>
          {showResult && (
            <span
              data-testid="inspection-result-badge"
              className={cn(
                "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold",
                resultColors[computedResult],
              )}
            >
              {resultLabels[computedResult]}
            </span>
          )}
        </div>

        {inspector && (
          <p className="text-muted-foreground text-sm">
            Inspector: <span className="font-medium">{inspector}</span>
          </p>
        )}

        {groups.map((group, gi) => (
          <div key={group.name ?? `group-${gi}`} className="space-y-4">
            {group.name && (
              <div className="space-y-1">
                <h4
                  className="text-sm font-semibold"
                  data-testid={`group-header-${group.name}`}
                >
                  {group.name}
                </h4>
                <Separator />
              </div>
            )}
            {group.fields.map((field) => (
              <FormField
                key={field.id}
                control={form.control}
                name={field.id}
                rules={{
                  ...(field.required
                    ? { required: `${field.label} is required` }
                    : {}),
                  ...(field.type === "measurement"
                    ? {
                        validate: (v: unknown) => {
                          if (v == null || v === "") return true;
                          const num = Number(v);
                          if (!Number.isFinite(num)) return "Must be a number";
                          if (field.specMin != null && num < field.specMin)
                            return `Must be >= ${field.specMin}`;
                          if (field.specMax != null && num > field.specMax)
                            return `Must be <= ${field.specMax}`;
                          return true;
                        },
                      }
                    : {}),
                }}
                render={({ field: rhfField }) => {
                  const oos = isOutOfSpec(
                    field,
                    rhfField.value as string | number | boolean | null,
                  );
                  return (
                    <FormItem>
                      <FormLabel required={!!field.required}>
                        {field.label}
                        {field.unit && (
                          <span className="text-muted-foreground ml-1 text-xs font-normal">
                            ({field.unit})
                          </span>
                        )}
                      </FormLabel>

                      <FormControl>
                        {renderFieldInput(field, rhfField, oos)}
                      </FormControl>

                      {field.type === "measurement" &&
                        (field.specMin != null || field.specMax != null) && (
                          <p className="text-muted-foreground text-xs">
                            Spec:{" "}
                            {field.specMin != null ? field.specMin : "\u2014"}{" "}
                            &ndash;{" "}
                            {field.specMax != null ? field.specMax : "\u2014"}
                            {field.unit ? ` ${field.unit}` : ""}
                          </p>
                        )}

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        ))}

        <Button type="submit" className="w-full">
          Submit Inspection
        </Button>
      </form>
    </Form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Field renderers                                                            */
/* -------------------------------------------------------------------------- */

interface RHFField {
  value: unknown;
  onChange: (...args: unknown[]) => void;
  onBlur: () => void;
  name: string;
  ref: (...args: unknown[]) => void;
}

function renderFieldInput(
  field: InspectionField,
  rhf: RHFField,
  outOfSpec: boolean,
): React.ReactNode {
  switch (field.type) {
    case "measurement":
      return (
        <div className="flex items-center gap-2">
          <InputNumber
            value={
              rhf.value != null && rhf.value !== "" ? Number(rhf.value) : null
            }
            onChange={(v) => rhf.onChange(v != null ? v : "")}
            onBlur={rhf.onBlur}
            step={0.01}
            controls={false}
            placeholder={
              field.placeholder ?? `Enter ${field.label.toLowerCase()}`
            }
            className={cn(
              "flex-1",
              outOfSpec &&
                "[&_input]:border-red-500 [&_input]:ring-red-500/20 dark:[&_input]:border-red-400",
            )}
            data-testid={`measurement-${field.id}`}
          />
          {field.unit && (
            <span className="text-muted-foreground text-sm">{field.unit}</span>
          )}
        </div>
      );

    case "passfail":
      return (
        <RadioGroup
          value={String(rhf.value ?? "")}
          onValueChange={(v) => rhf.onChange(v ?? "")}
          className="flex flex-row gap-4"
        >
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="pass" />
            <CheckCircleIcon className="size-4 text-emerald-600" />
            Pass
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="fail" />
            <XCircleIcon className="size-4 text-red-600" />
            Fail
          </label>
        </RadioGroup>
      );

    case "select":
      return (
        <Select
          value={String(rhf.value ?? "")}
          onValueChange={(v) => rhf.onChange(v ?? "")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={field.placeholder ?? "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "text":
      return (
        <Textarea
          placeholder={
            field.placeholder ?? `Enter ${field.label.toLowerCase()}`
          }
          value={String(rhf.value ?? "")}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            rhf.onChange(e.target.value)
          }
          onBlur={rhf.onBlur}
        />
      );

    case "photo":
      return (
        <button
          type="button"
          data-testid="photo-upload-placeholder"
          className="border-muted-foreground/25 text-muted-foreground hover:border-muted-foreground/50 flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed transition-colors"
        >
          <div className="flex flex-col items-center gap-1 text-sm">
            <CameraIcon className="size-5" />
            <span>Upload Photo</span>
          </div>
        </button>
      );

    default:
      return null;
  }
}

export { QualityInspectionForm };
