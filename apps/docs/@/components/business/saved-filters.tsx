"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  BookmarkIcon,
  BookmarkCheckIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@chaos_team/chaos-ui/ui";

export interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, unknown>;
  createdAt?: number | string;
  isPinned?: boolean;
}

interface SavedFiltersProps {
  filters: SavedFilter[];
  activeId?: string;
  onApply?: (id: string) => void;
  onSave?: (name: string) => void;
  onDelete?: (id: string) => void;
  onPin?: (id: string) => void;
  className?: string;
  label?: string;
}

/**
 * @component SavedFilters
 * @category business/ux
 * @since 0.2.0
 * @description Dropdown menu to manage saved filter presets — apply, pin, delete, and save new filters / 管理已保存筛选预设的下拉菜单，支持应用、置顶、删除和保存新筛选
 * @keywords saved, filters, preset, dropdown, bookmark
 * @example
 * <SavedFilters filters={items} activeId={currentId} onApply={handleApply} onSave={handleSave} onDelete={handleDelete} />
 */
export function SavedFilters({
  filters,
  activeId,
  onApply,
  onSave,
  onDelete,
  onPin,
  className,
  label = "已保存的筛选",
}: SavedFiltersProps) {
  const { t } = useTranslation("data");
  const resolvedLabel =
    label === "已保存的筛选" ? t("savedFilters.label") : label;
  const [name, setName] = React.useState("");
  const [openSave, setOpenSave] = React.useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave?.(name.trim());
    setName("");
    setOpenSave(false);
  };

  return (
    <div
      data-slot="saved-filters"
      className={cn("flex items-center gap-2", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          <BookmarkIcon />
          {resolvedLabel}
          <ChevronDownIcon className="size-3.5 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{resolvedLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filters.length === 0 ? (
            <div className="px-2 py-6 text-center text-xs text-muted-foreground">
              {t("savedFilters.empty")}
            </div>
          ) : (
            filters.map((f) => (
              <DropdownMenuItem
                key={f.id}
                onClick={() => onApply?.(f.id)}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  {f.isPinned ? (
                    <BookmarkCheckIcon className="size-3.5 text-primary" />
                  ) : (
                    <BookmarkIcon className="size-3.5" />
                  )}
                  <span className="truncate">{f.name}</span>
                </span>
                <div className="flex items-center gap-1">
                  {f.id === activeId && (
                    <span className="rounded bg-primary/10 px-1 text-[0.65rem] text-primary">
                      {t("savedFilters.apply")}
                    </span>
                  )}
                  {onPin && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={t("savedFilters.pin")}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPin(f.id);
                      }}
                      className="opacity-50 hover:opacity-100"
                    >
                      <BookmarkIcon className="size-3" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={t("savedFilters.delete")}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(f.id);
                      }}
                      className="opacity-50 hover:opacity-100 hover:text-destructive"
                    >
                      <TrashIcon className="size-3" />
                    </Button>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {onSave && (
        <DropdownMenu open={openSave} onOpenChange={setOpenSave}>
          <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
            <BookmarkCheckIcon />
            {t("savedFilters.saveCurrent")}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-3">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                {t("savedFilters.nameAndSave")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <div className="flex flex-col gap-2 p-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("savedFilters.namePlaceholder")}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
              />
              <Button size="sm" onClick={handleSave} disabled={!name.trim()}>
                {t("savedFilters.save")}
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
