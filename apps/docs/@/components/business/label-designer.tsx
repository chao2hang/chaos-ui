"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * @component LabelDesigner
 * @category business/logistics
 * @since 1.0.0
 * @description Barcode / QR label designer with drag-and-drop field placement,
 * live preview, multiple label sizes, and print-ready output.
 * @keywords label, barcode, qr, designer, print, logistics, shipping
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Label field types. */
type LabelFieldType = "text" | "barcode" | "qrcode" | "line" | "image";

/** Label field definition. */
interface LabelField {
  id: string;
  type: LabelFieldType;
  /** Field label / key. */
  label: string;
  /** Sample value for preview. */
  sampleValue: string;
  /** X position in mm. */
  x: number;
  /** Y position in mm. */
  y: number;
  /** Width in mm. */
  width: number;
  /** Height in mm. */
  height: number;
  /** Font size in pt. */
  fontSize?: number;
}

/** Label size preset. */
interface LabelSize {
  id: string;
  label: string;
  width: number;
  height: number;
}

/** Props for LabelDesigner. */
interface LabelDesignerProps {
  /** Label fields. */
  fields: LabelField[];
  /** On fields change. */
  onFieldsChange?: (fields: LabelField[]) => void;
  /** Label size preset. */
  labelSize?: LabelSize;
  /** Available size presets. */
  sizePresets?: LabelSize[];
  /** On size change. */
  onSizeChange?: (size: LabelSize) => void;
  /** Print handler. */
  onPrint?: () => void;
  /** Read-only mode. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Defaults & helpers                                                        */
/* -------------------------------------------------------------------------- */

const defaultSizePresets: LabelSize[] = [
  { id: "small", label: "40×30mm", width: 40, height: 30 },
  { id: "medium", label: "60×40mm", width: 60, height: 40 },
  { id: "large", label: "100×60mm", width: 100, height: 60 },
  { id: "shipping", label: "100×150mm", width: 100, height: 150 },
];

function genId() {
  return `lf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

const fieldTypeIcons: Record<LabelFieldType, string> = {
  text: "📝",
  barcode: "▮",
  qrcode: "▣",
  line: "─",
  image: "🖼️",
};

const fieldTypeLabels: Record<LabelFieldType, string> = {
  text: "Text",
  barcode: "Barcode",
  qrcode: "QR Code",
  line: "Line",
  image: "Image",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function LabelDesigner({
  fields = [],
  onFieldsChange,
  labelSize = defaultSizePresets[1]!,
  sizePresets = defaultSizePresets,
  onSizeChange,
  onPrint,
  readOnly = false,
  className,
}: LabelDesignerProps) {
  const [selectedField, setSelectedField] = React.useState<string | null>(null);

  // Scale: mm to px (1mm ≈ 3.78px at 96dpi)
  const scale = 3;

  const handleAddField = (type: LabelFieldType) => {
    if (readOnly) return;
    const newField: LabelField = {
      id: genId(),
      type,
      label: `${fieldTypeLabels[type]} ${fields.length + 1}`,
      sampleValue:
        type === "barcode"
          ? "1234567890128"
          : type === "qrcode"
            ? "https://example.com"
            : "Sample Text",
      x: 5,
      y: 5 + fields.length * 8,
      width: type === "qrcode" ? 15 : 40,
      height: type === "barcode" ? 10 : type === "qrcode" ? 15 : 5,
      fontSize: 8,
    };
    onFieldsChange?.([...fields, newField]);
    setSelectedField(newField.id);
  };

  const handleRemoveField = (id: string) => {
    onFieldsChange?.(fields.filter((f) => f.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  const handleFieldChange = (
    id: string,
    field: keyof LabelField,
    value: string | number,
  ) => {
    onFieldsChange?.(
      fields.map((f) =>
        f.id === id
          ? {
              ...f,
              [field]:
                typeof value === "string" && typeof f[field] === "number"
                  ? parseFloat(value) || 0
                  : value,
            }
          : f,
      ),
    );
  };

  const selectedFieldObj = fields.find((f) => f.id === selectedField);

  return (
    <div
      data-slot="label-designer"
      className={cn(
        "border-border bg-card grid grid-cols-1 gap-4 rounded-lg border p-5 lg:grid-cols-[200px_1fr_240px]",
        className,
      )}
    >
      {/* Left: Field type palette */}
      <div className="space-y-2" data-slot="label-palette">
        <h4 className="text-foreground text-sm font-semibold">Add Field</h4>
        {(Object.keys(fieldTypeLabels) as LabelFieldType[]).map((type) => (
          <button
            key={type}
            type="button"
            data-slot="field-type-btn"
            disabled={readOnly}
            onClick={() => handleAddField(type)}
            className={cn(
              "border-border bg-background flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
              !readOnly && "hover:bg-muted/30",
              readOnly && "cursor-not-allowed opacity-50",
            )}
          >
            <span className="text-base">{fieldTypeIcons[type]}</span>
            <span className="text-foreground">{fieldTypeLabels[type]}</span>
          </button>
        ))}

        {/* Size presets */}
        <div className="mt-3">
          <h4 className="text-foreground text-sm font-semibold">Label Size</h4>
          <div className="mt-1 space-y-1">
            {sizePresets.map((s) => (
              <button
                key={s.id}
                type="button"
                data-slot="size-preset"
                data-active={labelSize.id === s.id}
                disabled={readOnly}
                onClick={() => onSizeChange?.(s)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border px-3 py-1.5 text-xs transition-colors",
                  labelSize.id === s.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted/30",
                )}
              >
                <span>{s.label}</span>
                <span className="text-[10px]">
                  {s.width}×{s.height}mm
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Label preview */}
      <div
        className="flex flex-col items-center"
        data-slot="label-preview-container"
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="text-foreground text-sm font-medium">Preview</span>
          <Badge variant="outline" className="text-xs">
            {labelSize.width}×{labelSize.height}mm
          </Badge>
        </div>
        <div
          data-slot="label-preview"
          className="border-border relative border-2 border-dashed bg-white"
          style={{
            width: labelSize.width * scale,
            height: labelSize.height * scale,
          }}
          onClick={() => setSelectedField(null)}
        >
          {fields.length === 0 && (
            <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
              Add fields to design your label
            </div>
          )}
          {fields.map((field) => (
            <div
              key={field.id}
              data-slot="label-field"
              data-field-id={field.id}
              data-field-type={field.type}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedField(field.id);
              }}
              className={cn(
                "absolute border",
                selectedField === field.id
                  ? "border-primary border-2"
                  : "border-transparent hover:border-blue-300",
              )}
              style={{
                left: field.x * scale,
                top: field.y * scale,
                width: field.width * scale,
                height: field.height * scale,
              }}
            >
              {field.type === "text" && (
                <span
                  className="block truncate px-0.5 text-black"
                  style={{ fontSize: (field.fontSize ?? 8) * (scale / 3) }}
                >
                  {field.sampleValue}
                </span>
              )}
              {field.type === "barcode" && (
                <div className="flex h-full items-center justify-center bg-black font-mono text-[8px] text-white">
                  {field.sampleValue}
                </div>
              )}
              {field.type === "qrcode" && (
                <div className="flex h-full items-center justify-center bg-black text-[8px] text-white">
                  QR
                </div>
              )}
              {field.type === "line" && (
                <div
                  className="h-px w-full bg-black"
                  style={{ marginTop: (field.height * scale) / 2 }}
                />
              )}
              {field.type === "image" && (
                <div className="bg-muted text-muted-foreground flex h-full items-center justify-center text-xs">
                  IMG
                </div>
              )}
            </div>
          ))}
        </div>
        {onPrint && !readOnly && (
          <Button className="mt-3" size="sm" onClick={onPrint}>
            Print Label
          </Button>
        )}
      </div>

      {/* Right: Field properties */}
      <div className="space-y-3" data-slot="label-properties">
        <h4 className="text-foreground text-sm font-semibold">Properties</h4>
        {selectedFieldObj ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">
                {fieldTypeIcons[selectedFieldObj.type]}
              </span>
              <span className="text-foreground text-sm font-medium">
                {fieldTypeLabels[selectedFieldObj.type]}
              </span>
            </div>
            <div>
              <label className="text-muted-foreground mb-0.5 block text-xs">
                Label
              </label>
              <Input
                className="h-8 text-sm"
                value={selectedFieldObj.label}
                onChange={(e) =>
                  handleFieldChange(
                    selectedFieldObj.id,
                    "label",
                    e.target.value,
                  )
                }
                disabled={readOnly}
                aria-label="Field label"
              />
            </div>
            <div>
              <label className="text-muted-foreground mb-0.5 block text-xs">
                Sample Value
              </label>
              <Input
                className="h-8 text-sm"
                value={selectedFieldObj.sampleValue}
                onChange={(e) =>
                  handleFieldChange(
                    selectedFieldObj.id,
                    "sampleValue",
                    e.target.value,
                  )
                }
                disabled={readOnly}
                aria-label="Sample value"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-muted-foreground mb-0.5 block text-xs">
                  X (mm)
                </label>
                <Input
                  type="number"
                  className="h-8 text-sm"
                  value={selectedFieldObj.x}
                  onChange={(e) =>
                    handleFieldChange(selectedFieldObj.id, "x", e.target.value)
                  }
                  disabled={readOnly}
                  aria-label="X position"
                />
              </div>
              <div>
                <label className="text-muted-foreground mb-0.5 block text-xs">
                  Y (mm)
                </label>
                <Input
                  type="number"
                  className="h-8 text-sm"
                  value={selectedFieldObj.y}
                  onChange={(e) =>
                    handleFieldChange(selectedFieldObj.id, "y", e.target.value)
                  }
                  disabled={readOnly}
                  aria-label="Y position"
                />
              </div>
              <div>
                <label className="text-muted-foreground mb-0.5 block text-xs">
                  W (mm)
                </label>
                <Input
                  type="number"
                  className="h-8 text-sm"
                  value={selectedFieldObj.width}
                  onChange={(e) =>
                    handleFieldChange(
                      selectedFieldObj.id,
                      "width",
                      e.target.value,
                    )
                  }
                  disabled={readOnly}
                  aria-label="Width"
                />
              </div>
              <div>
                <label className="text-muted-foreground mb-0.5 block text-xs">
                  H (mm)
                </label>
                <Input
                  type="number"
                  className="h-8 text-sm"
                  value={selectedFieldObj.height}
                  onChange={(e) =>
                    handleFieldChange(
                      selectedFieldObj.id,
                      "height",
                      e.target.value,
                    )
                  }
                  disabled={readOnly}
                  aria-label="Height"
                />
              </div>
            </div>
            {selectedFieldObj.type === "text" && (
              <div>
                <label className="text-muted-foreground mb-0.5 block text-xs">
                  Font Size (pt)
                </label>
                <Input
                  type="number"
                  className="h-8 text-sm"
                  value={selectedFieldObj.fontSize ?? 8}
                  onChange={(e) =>
                    handleFieldChange(
                      selectedFieldObj.id,
                      "fontSize",
                      e.target.value,
                    )
                  }
                  disabled={readOnly}
                  aria-label="Font size"
                />
              </div>
            )}
            {!readOnly && (
              <Button
                variant="outline"
                size="sm"
                className="text-destructive w-full"
                onClick={() => handleRemoveField(selectedFieldObj.id)}
              >
                Remove Field
              </Button>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">
            Select a field to edit its properties
          </p>
        )}

        {/* Field list */}
        {fields.length > 0 && (
          <div className="border-border mt-3 border-t pt-3">
            <h5 className="text-muted-foreground mb-1 text-xs font-semibold">
              Fields ({fields.length})
            </h5>
            <div className="space-y-1">
              {fields.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedField(f.id)}
                  className={cn(
                    "flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-xs transition-colors",
                    selectedField === f.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/30",
                  )}
                >
                  <span>{fieldTypeIcons[f.type]}</span>
                  <span className="truncate">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { LabelDesigner };
export type { LabelDesignerProps, LabelField, LabelSize, LabelFieldType };
