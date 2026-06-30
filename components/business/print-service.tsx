import { cn } from "@/lib/utils";

/**
 * @component PrintService
 * @category business/print
 * @since 0.7.0
 * @description 打印服务
 * @keywords print, service
 * @example
 * <PrintService />
 */

interface PrintServiceProps {
  className?: string;
}

function PrintService({ className }: PrintServiceProps) {
  return (
    <div data-slot="print-service" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PrintService };
export type { PrintServiceProps };
