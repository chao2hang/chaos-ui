"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FunctionSquareIcon } from "lucide-react";

interface FormulaEditorProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const QUICK_FORMULAS = [
  { label: "SUM", insert: "SUM()" },
  { label: "AVG", insert: "AVG()" },
  { label: "COUNT", insert: "COUNT()" },
  { label: "MAX", insert: "MAX()" },
  { label: "MIN", insert: "MIN()" },
  { label: "IF", insert: "IF(, , )" },
];

function FormulaEditor({
  value = "",
  onChange,
  placeholder = "输入公式...",
  className,
  ...props
}: FormulaEditorProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const insertFormula = (formula: string) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const newValue = value.slice(0, start) + formula + value.slice(end);
    onChange?.(newValue);
    setTimeout(() => {
      input.setSelectionRange(start + 1, start + formula.length - 1);
      input.focus();
    }, 0);
  };

  return (
    <div
      data-slot="formula-editor"
      className={cn("space-y-2", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <FunctionSquareIcon className="text-muted-foreground absolute top-2 left-2.5 size-4" />
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="pl-8 font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {QUICK_FORMULAS.map((f) => (
          <Button
            key={f.label}
            size="sm"
            variant="outline"
            className="h-7 font-mono text-xs"
            onClick={() => insertFormula(f.insert)}
          >
            {f.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { FormulaEditor };
export type { FormulaEditorProps };
