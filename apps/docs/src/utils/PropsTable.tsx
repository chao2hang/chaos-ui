import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description?: string;
}

interface PropsTableProps {
  props: PropDefinition[];
  className?: string;
}

function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors">
            <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Prop
            </th>
            <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Type
            </th>
            <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Default
            </th>
            <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="hover:bg-muted/50 border-b transition-colors"
            >
              <td className="p-2 align-middle whitespace-nowrap">
                <code className="bg-muted rounded-sm px-1.5 py-0.5 font-mono text-xs">
                  {prop.name}
                  {prop.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </code>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <code className="bg-muted text-muted-foreground rounded-sm px-1.5 py-0.5 font-mono text-xs">
                  {prop.type}
                </code>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                {prop.defaultValue ? (
                  <code className="bg-muted rounded-sm px-1.5 py-0.5 font-mono text-xs">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="text-muted-foreground p-2 align-middle text-sm">
                {prop.description || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { PropsTable };
export type { PropDefinition, PropsTableProps };
