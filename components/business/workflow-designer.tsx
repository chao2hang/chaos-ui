"use client";

import { cn } from "@/lib/utils";

/**
 * @component WorkflowDesigner
 * @category business/lowcode
 * @since 0.7.0
 * @description 工作流设计器
 * @keywords workflow, designer
 * @example
 * <WorkflowDesigner />
 */

interface WorkflowDesignerProps {
  nodes: Array<{ id: string; type: string; name: string }>;
  edges: Array<{ from: string; to: string }>;
  onChange?: (config: unknown) => void;
  className?: string;
}

function WorkflowDesigner({ className }: WorkflowDesignerProps) {
  return <div data-slot="workflow-designer" className={cn("", className)} />;
}

export { WorkflowDesigner };
export type { WorkflowDesignerProps };
