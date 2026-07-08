import type * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { DownloadIcon, FileTextIcon, FileIcon, FilePlusIcon } from "@/components/ui/icons";

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
  docx: <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
  xlsx: <FilePlusIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
  pdf: <FileTextIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
  csv: <FileIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
  other: <FileIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />,
};

const typeLabel: Record<TemplateDownloadType, string> = {
  docx: "Word",
  xlsx: "Excel",
  pdf: "PDF",
  csv: "CSV",
  other: "文件",
};

function TemplateDownload({
  templates,
  onDownload,
  emptyLabel = "暂无可用模板",
  className,
}: TemplateDownloadProps) {
  if (templates.length === 0) {
    return (
      <p
        data-slot="template-download"
        className={cn(
          "rounded-md border border-dashed bg-muted/40 px-3 py-6 text-center text-sm text-muted-foreground",
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
        "flex flex-col divide-y divide-border rounded-lg border bg-card text-card-foreground",
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
            <p className="text-xs text-muted-foreground">{typeLabel[template.type]}</p>
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
