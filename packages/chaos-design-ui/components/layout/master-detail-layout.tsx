"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MasterDetailLayoutProps extends React.ComponentProps<"div"> {
  master?: React.ReactNode;
  detail?: React.ReactNode;
  masterWidth?: number;
  defaultMasterWidth?: number;
  minMasterWidth?: number;
  maxMasterWidth?: number;
  resizable?: boolean;
}

export function MasterDetailLayout({
  master,
  detail,
  masterWidth: controlledWidth,
  defaultMasterWidth = 320,
  minMasterWidth = 240,
  maxMasterWidth = 480,
  resizable = true,
  className,
  ...props
}: MasterDetailLayoutProps) {
  const [internalWidth, setInternalWidth] = React.useState(defaultMasterWidth);
  const [dragging, setDragging] = React.useState(false);
  const width = controlledWidth ?? internalWidth;

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  React.useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(
        Math.max(e.clientX, minMasterWidth),
        maxMasterWidth,
      );
      setInternalWidth(newWidth);
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, minMasterWidth, maxMasterWidth]);

  return (
    <div
      data-slot="master-detail-layout"
      className={cn(
        "flex h-full overflow-hidden",
        dragging && "select-none",
        className,
      )}
      {...props}
    >
      <div
        className="bg-background shrink-0 overflow-y-auto border-r"
        style={{ width }}
      >
        {master}
      </div>
      {resizable && (
        <div
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "w-1 shrink-0 cursor-col-resize transition-colors",
            dragging ? "bg-primary" : "bg-border hover:bg-primary/50",
          )}
          onMouseDown={handleMouseDown}
        />
      )}
      <div className="bg-background flex-1 overflow-y-auto">{detail}</div>
    </div>
  );
}
