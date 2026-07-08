"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon, SparklesIcon } from "@/components/ui/icons";

/**
 * @component ChatModelSwitcher
 * @category business/chat
 * @since 0.7.0
 * @description 模型切换器（下拉选择当前 AI 模型）
 * @keywords chat, model, switcher
 * @example
 * <ChatModelSwitcher models={[{ id: "gpt-4", name: "GPT-4" }]} activeId="gpt-4" />
 */

interface ChatModelSwitcherProps {
  models: Array<{ id: string; name: string; description?: string }>;
  activeId?: string;
  onSwitch?: (id: string) => void;
  className?: string;
}

function ChatModelSwitcher({ models, activeId, onSwitch, className }: ChatModelSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const active = models.find((m) => m.id === activeId) ?? models[0];

  const select = React.useCallback(
    (id: string) => {
      onSwitch?.(id);
      setOpen(false);
    },
    [onSwitch],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
    },
    [],
  );

  return (
    <div data-slot="chat-model-switcher" className={cn("relative", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch AI model"
      >
        <SparklesIcon className="size-4 text-primary" aria-hidden />
        <span className="max-w-[12rem] truncate">{active?.name ?? "Select model"}</span>
        <ChevronDownIcon className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </Button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close model menu"
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label="Available models"
            className="absolute right-0 z-20 mt-1 max-h-72 w-64 overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-md"
          >
            {models.map((m) => {
              const isActive = m.id === active?.id;
              return (
                <li key={m.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => select(m.id)}
                    className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left hover:bg-muted"
                  >
                    <span className="mt-0.5 shrink-0">
                      {isActive ? <CheckIcon className="size-4 text-primary" aria-hidden /> : <span className="block size-4" />}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium text-foreground">{m.name}</span>
                      {m.description ? (
                        <span className="truncate text-xs text-muted-foreground">{m.description}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export { ChatModelSwitcher };
export type { ChatModelSwitcherProps };
