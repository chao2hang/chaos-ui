"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  BookmarkIcon,
  SaveIcon,
  Trash2Icon,
  CheckIcon,
  ChevronDownIcon,
} from "./icons";
import { Button } from "./button";

interface SavedView {
  /** Unique identifier / 唯一标识 */
  id: string;
  /** View name / 视图名称 */
  name: string;
  /** Whether this is the default view / 是否为默认视图 */
  isDefault?: boolean;
}

interface SavedViewProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  /** Saved views list / 保存的视图列表 */
  views?: SavedView[];
  /** Current selected view id / 当前选中的视图 id */
  currentViewId?: string;
  /** Select a view / 选择视图 */
  onSelect?: (id: string) => void;
  /** Save current view as new / 保存当前视图 */
  onSave?: (name: string) => void;
  /** Delete a view / 删除视图 */
  onDelete?: (id: string) => void;
}

function SavedViewSwitcher({
  className,
  views = [],
  currentViewId,
  onSelect,
  onSave,
  onDelete,
  ...props
}: SavedViewProps) {
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saveName, setSaveName] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSaving(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const currentView = views.find((v) => v.id === currentViewId);

  const handleSave = () => {
    if (saveName.trim() && onSave) {
      onSave(saveName.trim());
      setSaveName("");
      setSaving(false);
    }
  };

  return (
    <div
      ref={containerRef}
      data-slot="saved-view"
      className={cn("relative inline-block", className)}
      {...props}
    >
      <Button
        variant="outline"
        size="sm"
        icon={<BookmarkIcon />}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {currentView?.name ?? "Saved Views"}
        <ChevronDownIcon className="text-muted-foreground ml-1 size-3.5" />
      </Button>

      {open && (
        <div className="bg-popover text-popover-foreground ring-foreground/10 absolute top-full right-0 z-50 mt-1 w-64 rounded-lg p-1.5 shadow-md ring-1">
          {/* Views list */}
          <div className="max-h-60 overflow-y-auto">
            {views.length === 0 ? (
              <div className="text-muted-foreground px-2 py-3 text-center text-xs">
                No saved views
              </div>
            ) : (
              views.map((view) => (
                <div
                  key={view.id}
                  className={cn(
                    "hover:bg-accent flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                    view.id === currentViewId && "bg-accent",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelect?.(view.id);
                      setOpen(false);
                    }}
                    className="flex flex-1 items-center gap-1.5 text-left"
                  >
                    {view.id === currentViewId && (
                      <CheckIcon className="text-primary size-3.5 shrink-0" />
                    )}
                    <span
                      className={cn(view.id === currentViewId && "font-medium")}
                    >
                      {view.name}
                    </span>
                    {view.isDefault && (
                      <span className="text-muted-foreground ml-1 text-xs">
                        (default)
                      </span>
                    )}
                  </button>
                  {onDelete && !view.isDefault && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(view.id);
                      }}
                      className="text-muted-foreground hover:text-destructive rounded-sm p-0.5 transition-colors"
                      aria-label={`Delete ${view.name}`}
                    >
                      <Trash2Icon className="size-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Save current view */}
          {onSave && (
            <div className="border-border mt-1 border-t pt-1.5">
              {saving ? (
                <div className="flex gap-1">
                  <input
                    autoFocus
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                      if (e.key === "Escape") {
                        setSaving(false);
                        setSaveName("");
                      }
                    }}
                    placeholder="View name..."
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-7 flex-1 rounded-md border bg-transparent px-2 text-sm outline-none focus-visible:ring-3"
                  />
                  <Button
                    size="xs"
                    onClick={handleSave}
                    disabled={!saveName.trim()}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSaving(true)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors"
                >
                  <SaveIcon className="size-3.5" />
                  Save current view
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { SavedViewSwitcher };
export type { SavedView, SavedViewProps };
