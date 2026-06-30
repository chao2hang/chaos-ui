import { cn } from "@/lib/utils";

/**
 * @component SignActionButton
 * @category business/finance
 * @since 0.7.0
 * @description 签收操作按钮
 * @keywords sign, action, button
 * @example
 * <SignActionButton />
 */

interface SignActionButtonProps {
  onSign?: () => void;
  signed?: boolean;
  label?: string;
  className?: string;
}

function SignActionButton({ className }: SignActionButtonProps) {
  return (
    <div data-slot="sign-action-button" className={cn("", className)}>
      {null}
    </div>
  );
}

export { SignActionButton };
export type { SignActionButtonProps };
