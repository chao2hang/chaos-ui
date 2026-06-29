import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  className?: string
}

function CodeBlock({ code, language = "tsx", title, className }: CodeBlockProps) {
  return (
    <div className={cn("rounded-lg border bg-muted/50 overflow-hidden", className)}>
      {title && (
        <div className="border-b bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
