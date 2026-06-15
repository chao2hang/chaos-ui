"use client"
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface JsonViewerProps {
  data: unknown
  defaultCollapsedDepth?: number
  className?: string
  rootClassName?: string
  showCopy?: boolean
  indentSize?: number
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function KeyName({ name }: { name: string }) {
  return <span className="text-primary">&quot;{name}&quot;: </span>
}

function JsonNode({
  value,
  keyName,
  depth = 0,
  defaultCollapsedDepth = 3,
  isLast = true,
}: {
  value: unknown
  keyName?: string
  depth?: number
  defaultCollapsedDepth?: number
  isLast?: boolean
}) {
  const [open, setOpen] = React.useState(depth < defaultCollapsedDepth)

  if (value === null) {
    return (
      <span>
        {keyName !== undefined && <KeyName name={keyName} />}
        <span className="text-muted-foreground">null</span>
        {!isLast && " "}
      </span>
    )
  }

  if (typeof value === "string") {
    return (
      <span>
        {keyName !== undefined && <KeyName name={keyName} />}
        <span className="text-success">&quot;{value}&quot;</span>
        {!isLast && " "}
      </span>
    )
  }

  if (typeof value === "number") {
    return (
      <span>
        {keyName !== undefined && <KeyName name={keyName} />}
        <span className="text-info">{String(value)}</span>
        {!isLast && " "}
      </span>
    )
  }

  if (typeof value === "boolean") {
    return (
      <span>
        {keyName !== undefined && <KeyName name={keyName} />}
        <span className="text-warning">{String(value)}</span>
        {!isLast && " "}
      </span>
    )
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <span>
          {keyName !== undefined && <KeyName name={keyName} />}
          <span className="text-muted-foreground">[]</span>
          {!isLast && " "}
        </span>
      )
    }
    return (
      <div>
        {keyName !== undefined && <KeyName name={keyName} />}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
        >
          {open ? "▼" : "▶"} [{value.length}]
        </button>
        {open && (
          <div className="ml-4 border-l pl-3">
            {value.map((v, i) => (
              <div key={i}>
                <JsonNode
                  value={v}
                  keyName={String(i)}
                  depth={depth + 1}
                  defaultCollapsedDepth={defaultCollapsedDepth}
                  isLast={i === value.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (isObject(value)) {
    const keys = Object.keys(value)
    if (keys.length === 0) {
      return (
        <span>
          {keyName !== undefined && <KeyName name={keyName} />}
          <span className="text-muted-foreground">&#123;&#125;</span>
          {!isLast && " "}
        </span>
      )
    }
    return (
      <div>
        {keyName !== undefined && <KeyName name={keyName} />}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
        >
          {open ? "▼" : "▶"} &#123;{keys.length}&#125;
        </button>
        {open && (
          <div className="ml-4 border-l pl-3">
            {keys.map((k, i) => (
              <div key={k}>
                <JsonNode
                  value={value[k]}
                  keyName={k}
                  depth={depth + 1}
                  defaultCollapsedDepth={defaultCollapsedDepth}
                  isLast={i === keys.length - 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <span>
      {keyName !== undefined && <KeyName name={keyName} />}
      {String(value)}
      {!isLast && " "}
    </span>
  )
}

export function JsonViewer({
  data,
  defaultCollapsedDepth = 3,
  className,
  rootClassName,
  showCopy = true,
  indentSize = 2,
}: JsonViewerProps) {
  const [copied, copy] = useCopyToClipboard()
  const text = React.useMemo(() => JSON.stringify(data, null, indentSize), [data, indentSize])

  return (
    <div className={cn("group relative", rootClassName)}>
      {showCopy && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => copy(text)}
          aria-label="复制 JSON"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      )}
      <div
        data-slot="json-viewer"
        className={cn(
          "overflow-auto rounded-md border bg-muted/30 p-3 text-xs font-mono leading-relaxed",
          className
        )}
      >
        <JsonNode value={data} defaultCollapsedDepth={defaultCollapsedDepth} />
      </div>
    </div>
  )
}
