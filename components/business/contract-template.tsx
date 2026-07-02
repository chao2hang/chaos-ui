"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileTextIcon,
  EyeIcon,
  PencilIcon,
  SaveIcon,
  PlusIcon,
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  BoldIcon,
  ItalicIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TagIcon,
} from "@/components/ui/icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Describes a merge field that can be inserted into the contract template.
 * @category business/contract
 */
export interface ContractField {
  /** Field identifier (used in {{fieldName}} merge syntax) */
  name: string;
  /** Display label */
  label: string;
  /** Field category for grouping */
  category: "party" | "financial" | "date" | "terms" | "custom";
  /** Field type */
  type: "text" | "number" | "date" | "currency" | "select";
  /** Options for select type */
  options?: Array<{ label: string; value: string }>;
  /** Default value */
  defaultValue?: string;
  /** Description/help text */
  description?: string;
}

/**
 * Metadata associated with a contract document.
 * @category business/contract
 */
export interface ContractMetadata {
  /** Contract number */
  contractNo?: string;
  /** Contract type */
  contractType?: string;
  /** Effective date */
  effectiveDate?: string;
  /** Expiry date */
  expiryDate?: string;
  /** Party A name */
  partyA?: string;
  /** Party B name */
  partyB?: string;
  /** Total amount */
  amount?: number;
  /** Status */
  status?: "draft" | "review" | "signed" | "expired" | "cancelled";
}

/**
 * Props for the ContractTemplate component.
 * @category business/contract
 */
export interface ContractTemplateProps {
  /** Template content (plain text with {{fieldName}} merge tags) */
  template?: string;
  /** Template change handler */
  onTemplateChange?: (template: string) => void;
  /** Available merge fields */
  fields?: ContractField[];
  /** Contract metadata */
  metadata?: ContractMetadata;
  /** Metadata change handler */
  onMetadataChange?: (metadata: ContractMetadata) => void;
  /** Sample values for preview */
  sampleValues?: Record<string, string | number>;
  /** Save handler */
  onSave?: (data: { template: string; metadata: ContractMetadata }) => void;
  /** Read-only mode */
  readOnly?: boolean;
  /** Active tab (controlled) */
  activeTab?: "edit" | "preview" | "metadata";
  /** Tab change handler */
  onTabChange?: (tab: string) => void;
  /** Additional CSS class names */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Category labels for field grouping. */
export const CATEGORY_LABELS: Record<ContractField["category"], string> = {
  party: "Party Info",
  financial: "Financial",
  date: "Dates",
  terms: "Terms",
  custom: "Custom",
};

/** Status display configuration. */
export const STATUS_CONFIG: Record<
  NonNullable<ContractMetadata["status"]>,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  review: {
    label: "Under Review",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  signed: {
    label: "Signed",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  expired: {
    label: "Expired",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400",
  },
};

/** Contract type options for metadata select. */
const CONTRACT_TYPE_OPTIONS = [
  { label: "Sales", value: "sales" },
  { label: "Purchase", value: "purchase" },
  { label: "Service", value: "service" },
  { label: "Lease", value: "lease" },
  { label: "Other", value: "other" },
];

/** Status options for metadata select. */
const STATUS_OPTIONS: Array<{
  label: string;
  value: NonNullable<ContractMetadata["status"]>;
}> = [
  { label: "Draft", value: "draft" },
  { label: "Under Review", value: "review" },
  { label: "Signed", value: "signed" },
  { label: "Expired", value: "expired" },
  { label: "Cancelled", value: "cancelled" },
];

/** Regex to match merge field tags like {{fieldName}}. */
const MERGE_TAG_RE = /\{\{(\w+)\}\}/g;

/**
 * Groups an array of fields by their category.
 */
function groupFieldsByCategory(
  fields: ContractField[],
): Map<ContractField["category"], ContractField[]> {
  const groups = new Map<ContractField["category"], ContractField[]>();
  for (const field of fields) {
    const existing = groups.get(field.category);
    if (existing) {
      existing.push(field);
    } else {
      groups.set(field.category, [field]);
    }
  }
  return groups;
}

/**
 * Renders template text with merge tags replaced by values.
 * Returns an array of React nodes for rendering.
 */
function renderPreview(
  template: string,
  values: Record<string, string | number>,
  fields: ContractField[],
): React.ReactNode[] {
  if (!template) return [];

  const fieldDefaults: Record<string, string> = {};
  for (const f of fields) {
    if (f.defaultValue != null) {
      fieldDefaults[f.name] = f.defaultValue;
    }
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(MERGE_TAG_RE.source, "g");
  let key = 0;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push(template.slice(lastIndex, match.index));
    }

    const fieldName = match[1]!;
    const resolved = values[fieldName] ?? fieldDefaults[fieldName] ?? "";
    const displayValue =
      resolved !== "" ? String(resolved) : `{{${fieldName}}}`;
    const isResolved = resolved !== "";

    parts.push(
      <span
        key={`merge-${key++}`}
        className={cn(
          "inline rounded px-0.5",
          isResolved
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            : "bg-muted text-muted-foreground",
        )}
        data-slot="contract-template-merge-field"
        data-field-name={fieldName}
      >
        {displayValue}
      </span>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }

  return parts;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * @component ContractTemplate
 * @category business/contract
 * @since 0.8.0
 * @description Contract management page component with template editing, merge field insertion, and preview. Supports tab-based navigation between Edit, Preview, and Metadata views.
 * @keywords contract, template, merge-field, preview, metadata, document
 * @example
 * <ContractTemplate
 *   template="Agreement between {{partyA}} and {{partyB}}..."
 *   fields={[{ name: "partyA", label: "Party A", category: "party", type: "text" }]}
 *   metadata={{ contractNo: "C-001", status: "draft" }}
 * />
 */
function ContractTemplate({
  template: templateProp,
  onTemplateChange,
  fields = [],
  metadata: metadataProp,
  onMetadataChange,
  sampleValues = {},
  onSave,
  readOnly = false,
  activeTab: activeTabProp,
  onTabChange,
  className,
}: ContractTemplateProps) {
  const [internalTemplate, setInternalTemplate] = React.useState(
    templateProp ?? "",
  );
  const [internalMetadata, setInternalMetadata] =
    React.useState<ContractMetadata>(metadataProp ?? {});
  const [internalTab, setInternalTab] = React.useState<string>(
    activeTabProp ?? "edit",
  );
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Sync controlled props to internal state
  React.useEffect(() => {
    if (templateProp !== undefined) {
      setInternalTemplate(templateProp);
    }
  }, [templateProp]);

  React.useEffect(() => {
    if (metadataProp !== undefined) {
      setInternalMetadata(metadataProp);
    }
  }, [metadataProp]);

  React.useEffect(() => {
    if (activeTabProp !== undefined) {
      setInternalTab(activeTabProp);
    }
  }, [activeTabProp]);

  const currentTemplate = templateProp ?? internalTemplate;
  const currentMetadata = metadataProp ?? internalMetadata;
  const currentTab = activeTabProp ?? internalTab;

  const handleTemplateChange = React.useCallback(
    (value: string) => {
      setInternalTemplate(value);
      onTemplateChange?.(value);
    },
    [onTemplateChange],
  );

  const handleMetadataChange = React.useCallback(
    (patch: Partial<ContractMetadata>) => {
      const next = { ...currentMetadata, ...patch };
      setInternalMetadata(next);
      onMetadataChange?.(next);
    },
    [currentMetadata, onMetadataChange],
  );

  const handleTabChange = React.useCallback(
    (value: string | number | null) => {
      const tab = String(value);
      setInternalTab(tab);
      onTabChange?.(tab);
    },
    [onTabChange],
  );

  /** Insert a merge field tag at the current cursor position. */
  const insertField = React.useCallback(
    (fieldName: string) => {
      if (readOnly) return;
      const textarea = textareaRef.current;
      const tag = `{{${fieldName}}}`;

      if (textarea) {
        const start = textarea.selectionStart ?? currentTemplate.length;
        const end = textarea.selectionEnd ?? start;
        const before = currentTemplate.slice(0, start);
        const after = currentTemplate.slice(end);
        const newValue = before + tag + after;
        handleTemplateChange(newValue);

        requestAnimationFrame(() => {
          textarea.focus();
          const pos = start + tag.length;
          textarea.setSelectionRange(pos, pos);
        });
      } else {
        handleTemplateChange(currentTemplate + tag);
      }
    },
    [readOnly, currentTemplate, handleTemplateChange],
  );

  /** Wrap selected text with markers (bold/italic). */
  const wrapSelection = React.useCallback(
    (marker: string) => {
      if (readOnly) return;
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart ?? 0;
      const end = textarea.selectionEnd ?? 0;
      const selected = currentTemplate.slice(start, end);
      const wrapped = `${marker}${selected}${marker}`;
      const newValue =
        currentTemplate.slice(0, start) +
        wrapped +
        currentTemplate.slice(end);
      handleTemplateChange(newValue);

      requestAnimationFrame(() => {
        textarea.focus();
        const pos = start + marker.length + selected.length + marker.length;
        textarea.setSelectionRange(pos, pos);
      });
    },
    [readOnly, currentTemplate, handleTemplateChange],
  );

  const handleSave = React.useCallback(() => {
    onSave?.({ template: currentTemplate, metadata: currentMetadata });
  }, [onSave, currentTemplate, currentMetadata]);

  const groupedFields = React.useMemo(
    () => groupFieldsByCategory(fields),
    [fields],
  );

  const statusConfig = currentMetadata.status
    ? STATUS_CONFIG[currentMetadata.status]
    : null;

  return (
    <div
      data-slot="contract-template"
      className={cn(
        "flex flex-col gap-4 rounded-lg border bg-card p-4",
        className,
      )}
      role="region"
      aria-label="Contract Template"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileTextIcon className="text-muted-foreground size-5" />
          <CardTitle className="text-base">Contract Template</CardTitle>
          {statusConfig && (
            <Badge
              variant="secondary"
              className={cn("text-xs", statusConfig.className)}
              data-slot="contract-template-status"
            >
              {statusConfig.label}
            </Badge>
          )}
          {currentMetadata.contractNo && (
            <span className="text-muted-foreground font-mono text-xs">
              {currentMetadata.contractNo}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTabChange("preview")}
            aria-label="Preview contract"
          >
            <EyeIcon className="size-4" />
            Preview
          </Button>
          {!readOnly && (
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              aria-label="Save contract"
            >
              <SaveIcon className="size-4" />
              Save
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        data-slot="contract-template-tabs"
      >
        <TabsList>
          <TabsTrigger value="edit" disabled={readOnly}>
            <PencilIcon className="size-3.5" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview">
            <EyeIcon className="size-3.5" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="metadata">
            <TagIcon className="size-3.5" />
            Metadata
          </TabsTrigger>
        </TabsList>

        {/* Edit Tab */}
        <TabsContent value="edit" className="mt-3">
          <div className="flex gap-3">
            {/* Main editor area */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {/* Toolbar */}
              <div
                className="flex items-center gap-1 rounded-md border bg-muted/50 px-2 py-1"
                role="toolbar"
                aria-label="Text formatting"
              >
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => wrapSelection("**")}
                  aria-label="Bold"
                  type="button"
                >
                  <BoldIcon className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => wrapSelection("*")}
                  aria-label="Italic"
                  type="button"
                >
                  <ItalicIcon className="size-4" />
                </Button>
                <Separator orientation="vertical" className="mx-1 h-4" />
                <span className="text-muted-foreground text-xs">
                  Use {"{{fieldName}}"} for merge fields
                </span>
              </div>

              {/* Textarea */}
              <Textarea
                ref={textareaRef}
                value={currentTemplate}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleTemplateChange(e.target.value)
                }
                placeholder="Enter contract template text. Use {{fieldName}} syntax for merge fields..."
                className="min-h-[400px] font-mono text-sm"
                readOnly={readOnly}
                disabled={readOnly}
                aria-label="Contract template editor"
                data-slot="contract-template-textarea"
              />
            </div>

            {/* Field sidebar */}
            <div
              className={cn(
                "flex flex-col border-l pl-3 transition-all",
                sidebarOpen ? "w-56" : "w-8",
              )}
              data-slot="contract-template-sidebar"
            >
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={
                  sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                }
                className="self-end"
                type="button"
              >
                {sidebarOpen ? (
                  <ChevronRightIcon className="size-4" />
                ) : (
                  <ChevronLeftIcon className="size-4" />
                )}
              </Button>

              {sidebarOpen && (
                <ScrollArea className="max-h-[450px]">
                  <div className="flex flex-col gap-3 pr-2">
                    <span className="text-muted-foreground text-xs font-semibold">
                      Merge Fields
                    </span>
                    {Array.from(groupedFields.entries()).map(
                      ([category, categoryFields]) => (
                        <div
                          key={category}
                          className="flex flex-col gap-1.5"
                        >
                          <span className="text-muted-foreground/80 text-xs font-medium">
                            {CATEGORY_LABELS[category] ?? category}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {categoryFields.map((field) => (
                              <button
                                key={field.name}
                                type="button"
                                onClick={() => insertField(field.name)}
                                className={cn(
                                  "inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-0.5 text-xs",
                                  "bg-background transition-colors hover:bg-muted",
                                  "text-foreground/80 hover:text-foreground",
                                  readOnly &&
                                    "pointer-events-none opacity-50",
                                )}
                                title={field.description ?? field.label}
                                aria-label={`Insert ${field.label} field`}
                                data-slot="contract-template-field-chip"
                                data-field-name={field.name}
                              >
                                <PlusIcon className="size-3" />
                                {field.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                    {fields.length === 0 && (
                      <span className="text-muted-foreground text-xs">
                        No fields available
                      </span>
                    )}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Document Preview</CardTitle>
                {currentMetadata.contractNo && (
                  <span className="text-muted-foreground font-mono text-xs">
                    {currentMetadata.contractNo}
                  </span>
                )}
              </div>
              {currentMetadata.partyA && currentMetadata.partyB && (
                <div className="text-muted-foreground flex gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <BuildingIcon className="size-3" />
                    {currentMetadata.partyA}
                  </span>
                  <span>&</span>
                  <span className="flex items-center gap-1">
                    <BuildingIcon className="size-3" />
                    {currentMetadata.partyB}
                  </span>
                </div>
              )}
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              {currentTemplate ? (
                <div
                  className="whitespace-pre-wrap text-sm leading-relaxed"
                  data-slot="contract-template-preview-content"
                >
                  {renderPreview(currentTemplate, sampleValues, fields)}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  No template content to preview.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metadata Tab */}
        <TabsContent value="metadata" className="mt-3">
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            data-slot="contract-template-metadata"
          >
            {/* Contract No */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-contract-no"
                className="text-muted-foreground text-xs font-medium"
              >
                Contract No
              </label>
              <Input
                id="ct-contract-no"
                value={currentMetadata.contractNo ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMetadataChange({ contractNo: e.target.value })
                }
                placeholder="e.g. C-2025-001"
                disabled={readOnly}
                data-slot="contract-template-field-contractNo"
              />
            </div>

            {/* Contract Type */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-contract-type"
                className="text-muted-foreground text-xs font-medium"
              >
                Contract Type
              </label>
              <Select
                value={currentMetadata.contractType ?? ""}
                onValueChange={(value) =>
                  handleMetadataChange({ contractType: value ?? "" })
                }
                disabled={readOnly}
              >
                <SelectTrigger
                  className="w-full"
                  id="ct-contract-type"
                  data-slot="contract-template-field-contractType"
                >
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Effective Date */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-effective-date"
                className="text-muted-foreground text-xs font-medium"
              >
                <CalendarIcon className="mr-1 inline size-3" />
                Effective Date
              </label>
              <Input
                id="ct-effective-date"
                type="date"
                value={currentMetadata.effectiveDate ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMetadataChange({ effectiveDate: e.target.value })
                }
                disabled={readOnly}
                data-slot="contract-template-field-effectiveDate"
              />
            </div>

            {/* Expiry Date */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-expiry-date"
                className="text-muted-foreground text-xs font-medium"
              >
                <CalendarIcon className="mr-1 inline size-3" />
                Expiry Date
              </label>
              <Input
                id="ct-expiry-date"
                type="date"
                value={currentMetadata.expiryDate ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMetadataChange({ expiryDate: e.target.value })
                }
                disabled={readOnly}
                data-slot="contract-template-field-expiryDate"
              />
            </div>

            {/* Party A */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-party-a"
                className="text-muted-foreground text-xs font-medium"
              >
                <UserIcon className="mr-1 inline size-3" />
                Party A
              </label>
              <Input
                id="ct-party-a"
                value={currentMetadata.partyA ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMetadataChange({ partyA: e.target.value })
                }
                placeholder="Company or individual name"
                disabled={readOnly}
                data-slot="contract-template-field-partyA"
              />
            </div>

            {/* Party B */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-party-b"
                className="text-muted-foreground text-xs font-medium"
              >
                <UserIcon className="mr-1 inline size-3" />
                Party B
              </label>
              <Input
                id="ct-party-b"
                value={currentMetadata.partyB ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMetadataChange({ partyB: e.target.value })
                }
                placeholder="Company or individual name"
                disabled={readOnly}
                data-slot="contract-template-field-partyB"
              />
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-amount"
                className="text-muted-foreground text-xs font-medium"
              >
                <DollarSignIcon className="mr-1 inline size-3" />
                Amount
              </label>
              <Input
                id="ct-amount"
                type="number"
                value={currentMetadata.amount ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleMetadataChange({
                    ...(e.target.value ? { amount: Number(e.target.value) } : {}),
                  })
                }
                placeholder="0.00"
                disabled={readOnly}
                data-slot="contract-template-field-amount"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ct-status"
                className="text-muted-foreground text-xs font-medium"
              >
                Status
              </label>
              <div className="flex items-center gap-2">
                <Select
                  value={currentMetadata.status ?? ""}
                  onValueChange={(value) => {
                    if (value) {
                      handleMetadataChange({ status: value as ContractMetadata["status"] });
                    }
                  }}
                  disabled={readOnly}
                >
                  <SelectTrigger
                    className="w-full"
                    id="ct-status"
                    data-slot="contract-template-field-status"
                  >
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {currentMetadata.status &&
                  STATUS_CONFIG[currentMetadata.status] && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        STATUS_CONFIG[currentMetadata.status].className,
                      )}
                      data-slot="contract-template-status-badge"
                    >
                      {STATUS_CONFIG[currentMetadata.status].label}
                    </Badge>
                  )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { ContractTemplate };
