"use client";

import { cn } from "@/lib/utils";

/**
 * @component RuleEditor
 * @category business/lowcode
 * @since 0.7.0
 * @description 规则编辑器
 * @keywords rule, editor
 * @example
 * <RuleEditor />
 */

interface RuleEditorProps {
  rules: Array<{
    id: string;
    field: string;
    operator: string;
    value: unknown;
    action: string;
  }>;
  onChange?: (rules: unknown[]) => void;
  className?: string;
}

function RuleEditor({ className }: RuleEditorProps) {
  return <div data-slot="rule-editor" className={cn("", className)} />;
}

export { RuleEditor };
export type { RuleEditorProps };
