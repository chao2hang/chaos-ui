"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PreviewScene = { id: string; label: string };

export type PreviewChromeProps = {
  scenes: PreviewScene[];
  activeScene: string;
  onSceneChange: (id: string) => void;
  onReset?: () => void;
  allowFullscreen?: boolean;
  fullscreenLabel?: string;
  exitFullscreenLabel?: string;
  resetLabel?: string;
  children: React.ReactNode;
  className?: string;
};

export function PreviewChrome({
  scenes,
  activeScene,
  onSceneChange,
  onReset,
  allowFullscreen = true,
  fullscreenLabel = "Fullscreen",
  exitFullscreenLabel = "Exit",
  resetLabel = "Reset",
  children,
  className,
}: PreviewChromeProps) {
  const [fullscreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border",
        fullscreen
          ? "bg-background fixed inset-0 z-50 rounded-none"
          : "bg-background",
        className,
      )}
    >
      <div className="bg-muted/40 flex items-center justify-between gap-2 border-b px-3 py-2">
        <div role="tablist" className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
          {scenes.map((scene) => {
            const selected = scene.id === activeScene;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "rounded-md px-2.5 py-1 text-sm transition-colors",
                  selected
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => onSceneChange(scene.id)}
              >
                {scene.label}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {onReset ? (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground rounded-md px-2.5 py-1 text-sm"
              onClick={onReset}
            >
              {resetLabel}
            </button>
          ) : null}
          {allowFullscreen ? (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground rounded-md px-2.5 py-1 text-sm"
              onClick={() => setFullscreen((v) => !v)}
            >
              {fullscreen ? exitFullscreenLabel : fullscreenLabel}
            </button>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          "min-h-[70vh] h-[calc(100vh-12rem)] max-h-[900px] overflow-hidden bg-background",
          fullscreen && "min-h-0 h-full max-h-none flex-1",
        )}
      >
        <div className="h-full min-h-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
