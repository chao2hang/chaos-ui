import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

function CodeBlock({
  code,
  language = "tsx",
  title,
  className,
}: CodeBlockProps) {
  return (
    <div
      className={cn("bg-muted/50 overflow-hidden rounded-lg border", className)}
    >
      {title && (
        <div className="bg-muted text-muted-foreground border-b px-4 py-2 text-xs font-medium">
          {title}
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
