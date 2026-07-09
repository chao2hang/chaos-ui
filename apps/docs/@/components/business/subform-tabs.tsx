"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component SubformTabs
 * @category Business
 * @since 1.0.0-beta.0
 * @description 子表单 tab — organizes related form sections under a tabbed layout.
 * @param tabs Tab definitions, each rendering an editable sub-form.
 * @param value Current field values keyed by field name across all tabs.
 * @param onChange Callback fired whenever any field value changes.
 * @example
 * ```tsx
 * <SubformTabs />
 * ```
 * 子表单 tab
 */

interface SubformTabField {
  name: string;
  label: string;
  /** "text" renders a single-line input; "textarea" renders a multi-line input. */
  type?: "text" | "textarea";
}

interface SubformTab {
  id: string;
  label: string;
  fields: SubformTabField[];
}

interface SubformTabsProps {
  /** Tab sections to render. Defaults to a basic info / contact layout. */
  tabs?: SubformTab[];
  /** Field values keyed by name. */
  value?: Record<string, unknown>;
  /** Called with the merged values whenever a field changes. */
  onChange?: (val: Record<string, unknown>) => void;
  className?: string;
}

const DEFAULT_TABS: SubformTab[] = [
  {
    id: "basic",
    label: "基本信息",
    fields: [
      { name: "code", label: "编码" },
      { name: "name", label: "名称" },
    ],
  },
  {
    id: "contact",
    label: "联系方式",
    fields: [
      { name: "phone", label: "电话" },
      { name: "address", label: "地址", type: "textarea" },
    ],
  },
];

function SubformTabs({
  tabs = DEFAULT_TABS,
  value,
  onChange,
  className,
}: SubformTabsProps) {
  const valuesRef = React.useRef<Record<string, unknown>>(value ?? {});
  React.useEffect(() => {
    if (value) {
      valuesRef.current = value;
    }
  }, [value]);

  const update = React.useCallback(
    (name: string, next: unknown) => {
      const merged = { ...valuesRef.current, [name]: next };
      valuesRef.current = merged;
      onChange?.(merged);
    },
    [onChange],
  );

  return (
    <div
      data-slot="subform-tabs"
      className={cn("flex flex-col gap-3", className)}
    >
      <Tabs defaultValue={tabs[0]?.id}>
        <TabsList aria-label="子表单分区">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <div className="flex flex-col gap-4 py-2">
              {tab.fields.length === 0 ? (
                <p className="text-sm text-muted-foreground">该分区暂无字段</p>
              ) : (
                tab.fields.map((field) => {
                  const id = `sft-${tab.id}-${field.name}`;
                  const current = valuesRef.current[field.name];
                  if (field.type === "textarea") {
                    return (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <Label htmlFor={id}>{field.label}</Label>
                        <Textarea
                          id={id}
                          value={typeof current === "string" ? current : ""}
                          onChange={(e) => update(field.name, e.target.value)}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <Label htmlFor={id}>{field.label}</Label>
                      <Input
                        id={id}
                        value={
                          current === undefined || current === null
                            ? ""
                            : String(current)
                        }
                        onChange={(e) => update(field.name, e.target.value)}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export { SubformTabs };
export type { SubformTabsProps };
