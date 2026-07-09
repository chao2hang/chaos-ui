"use client";

import { Button } from "@chaos_team/chaos-ui/ui";
import type { ButtonProps } from "@chaos_team/chaos-ui/ui";
import { PrinterIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component PrintButton
 * @category business/print
 * @since 0.7.0
 * @description 打印按钮 — 触发 window.print() 或自定义打印函数。
 * / Print button — triggers window.print() or a custom print handler.
 * @keywords print, button, export, output
 * @example
 * <PrintButton onClick={() => printElement(ref.current)} />
 */
interface PrintButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Custom print handler (defaults to window.print) / 自定义打印函数 */
  onPrint?: () => void;
  /** Button text / 按钮文本 */
  label?: string;
}

function PrintButton({
  onPrint,
  label = "Print",
  variant = "outline",
  size = "sm",
  icon,
  children,
  ...props
}: PrintButtonProps) {
  const handleClick = () => {
    if (onPrint) {
      onPrint();
    } else if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Button
      data-slot="print-button"
      variant={variant}
      size={size}
      icon={icon ?? <PrinterIcon />}
      onClick={handleClick}
      {...props}
    >
      {children ?? label}
    </Button>
  );
}

export { PrintButton };
export type { PrintButtonProps };
