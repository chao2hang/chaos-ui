import { cn } from "@/lib/utils";

/**
 * @component TemplateDownload
 * @category business/print
 * @since 0.7.0
 * @description 模板下载按钮
 * @keywords template, download
 * @example
 * <TemplateDownload />
 */

interface TemplateDownloadProps {
  url: string;
  label?: string;
  className?: string;
}

function TemplateDownload({ className }: TemplateDownloadProps) {
  return (
    <div data-slot="template-download" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TemplateDownload };
export type { TemplateDownloadProps };
