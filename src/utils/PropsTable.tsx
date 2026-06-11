import * as React from "react"
import { cn } from "@/lib/utils"

interface PropDefinition {
  name: string
  type: string
  defaultValue?: string
  required?: boolean
  description?: string
}

interface PropsTableProps {
  props: PropDefinition[]
  className?: string
}

function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground">Prop</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground">Type</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground">Default</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground">Description</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {props.map((prop) => (
            <tr key={prop.name} className="border-b transition-colors hover:bg-muted/50">
              <td className="p-2 align-middle whitespace-nowrap">
                <code className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-mono">
                  {prop.name}
                  {prop.required && <span className="text-destructive ml-1">*</span>}
                </code>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <code className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                {prop.defaultValue ? (
                  <code className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-mono">{prop.defaultValue}</code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="p-2 align-middle text-sm text-muted-foreground">{prop.description || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { PropsTable }
export type { PropDefinition, PropsTableProps }
