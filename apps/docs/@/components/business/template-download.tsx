import type * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { buttonVariants } from "@chaos_team/chaos-ui/ui";
import {
  DownloadIcon,
  FileTextIcon,
  FileIcon,
  FilePlusIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component TemplateDownload
 * @category business/print
 * @since 0.7.0
 * @description 模板下载列表 — renders an accessible list of downloadable
 * template links. Each item is rendered as an anchor with the `download`
 * attribute so the browser downloads the target file rather than navigating
 * to it, and a type-specific icon.
 * @keywords template, download
 * @param templates - the templates available for download (required)
 * @param onDownload - called with the selected template when a link is clicked
 * @param emptyLabel - text shown when the list is empty (defaults to "暂无可用模板")
 * @example
 * <TemplateDownload templates={[{ id: "1", name: "发票模板", url: "/tpl/invoice.docx", type: "docx" }]} />
 */

/** Supported template file types, used to pick an icon. */
export type TemplateDownloadType = "docx" | "xlsx" | "pdf" | "csv" | "other";

/** A single downloadable template entry. */
export interface TemplateDownloadItem {
  /** Stable identifier for the template. */
  id: string;
  /** Human-readable template name shown as the link label. */
  name: string;
  /** The template file URL to download. */
  url: string;
  /** File type of the template, used to pick an icon. */
  type: TemplateDownloadType;
}

interface TemplateDownloadProps {
  /** Templates available for download. */
  templates: TemplateDownloadItem[];
  /** Called with the selected template when a link is clicked. */
  onDownload?: (template: TemplateDownloadItem) => void;
  /** Text shown when the list is empty. Defaults to "暂无可用模板". */
  emptyLabel?: string;
  className?: string;
}

const typeIcon: Record<TemplateDownloadType, React.ReactNode> = {
  docx: (
    <FileTextIcon
      className="text-muted-foreground size-4 shrink-0"
      aria-hidden
    />
  ),
  xlsx: (
    <FilePlusIcon
      className="text-muted-foreground size-4 shrink-0"
      aria-hidden
    />
  ),
  pdf: (
    <FileTextIcon
      className="text-muted-foreground size-4 shrink-0"
      aria-hidden
    />
  ),
  csv: (
    <FileIcon className="text-muted-foreground size-4 shrink-0" aria-hidden />
  ),
  other: (
    <FileIcon className="text-muted-foreground size-4 shrink-0" aria-hidden />
  ),
};

const typeLabel: Record<TemplateDownloadType, string> = {
  docx: "Word",
  xlsx: "Excel",
  pdf: "PDF",
  csv: "CSV",
  other: "文件",
};

function TemplateDownload({
  templates = [],
  onDownload,
  emptyLabel = "暂无可用模板",
  className,
}: TemplateDownloadProps) {
  if (templates.length === 0) {
    return (
      <p
        data-slot="template-download"
        className={cn(
          "bg-muted/40 text-muted-foreground rounded-md border border-dashed px-3 py-6 text-center text-sm",
          className,
        )}
      >
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul
      data-slot="template-download"
      role="list"
      className={cn(
        "divide-border bg-card text-card-foreground flex flex-col divide-y rounded-lg border",
        className,
      )}
    >
      {templates.map((template) => (
        <li
          key={template.id}
          data-slot="template-download-item"
          className="flex items-center gap-3 p-2.5"
        >
          {typeIcon[template.type]}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{template.name}</p>
            <p className="text-muted-foreground text-xs">
              {typeLabel[template.type]}
            </p>
          </div>
          <a
            data-slot="template-download-link"
            href={template.url}
            download={template.name}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            onClick={() => onDownload?.(template)}
          >
            <DownloadIcon className="size-4" aria-hidden />
            下载
          </a>
        </li>
      ))}
    </ul>
  );
}

export { TemplateDownload };
export type { TemplateDownloadProps };
