"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";

interface InlineEditProps extends React.ComponentProps<"span"> {
  value: string;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  as?: "input" | "textarea";
  placeholder?: string;
  className?: string;
}

function InlineEdit({
  value,
  onChange,
  onSave,
  as = "input",
  placeholder = "点击编辑",
  className,
  ...props
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);

  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = () => {
    setEditing(false);
    onChange?.(draft);
    onSave?.(draft);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") handleCancel();
  };

  if (!editing) {
    return (
      <span
        data-slot="inline-edit"
        className={cn(
          "group hover:bg-muted/50 -mx-1 inline-flex min-w-[2rem] cursor-pointer items-center gap-1 rounded px-1",
          !value && "text-muted-foreground italic",
          className,
        )}
        onClick={() => setEditing(true)}
        {...props}
      >
        <span>{value || placeholder}</span>
        <PencilIcon className="size-3 shrink-0 opacity-0 group-hover:opacity-50" />
      </span>
    );
  }

  return (
    <span
      data-slot="inline-edit"
      className={cn("inline-flex items-center gap-1", className)}
    >
      {as === "textarea" ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-background min-w-[120px] resize-none rounded border px-2 py-1 text-sm"
          rows={2}
          autoFocus
        />
      ) : (
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          className="inline h-7 w-auto min-w-[80px]"
          autoFocus
        />
      )}
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={handleSave}
        className="shrink-0"
      >
        <CheckIcon className="text-success size-3" />
      </Button>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={handleCancel}
        className="shrink-0"
      >
        <XIcon className="text-muted-foreground size-3" />
      </Button>
    </span>
  );
}

export { InlineEdit };
export type { InlineEditProps };
