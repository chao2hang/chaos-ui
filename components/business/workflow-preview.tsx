"use client";

import { cn } from "@/lib/utils";

/**
 * @component WorkflowPreview
 * @category business/lowcode
 * @since 0.7.0
 * @description 工作流预览
 * @keywords workflow, preview
 * @example
 * <WorkflowPreview />
 */

interface WorkflowPreviewProps {
  nodes: Array<{ id: string; name: string; status?: string }>;
  edges: Array<{ from: string; to: string }>;
  className?: string;
}

function WorkflowPreview({ className }: WorkflowPreviewProps) {
  return <div data-slot="workflow-preview" className={cn("", className)} />;
}

export { WorkflowPreview };
export type { WorkflowPreviewProps };
