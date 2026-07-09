"use client";
import * as React from "react";
import { DownloadIcon } from "lucide-react";
import { Button } from "@chaos_team/chaos-ui/ui";
import { toast } from "sonner";

interface ChartExportButtonProps {
  target: React.RefObject<HTMLElement | null>;
  filename?: string;
  format?: "png" | "svg";
}

export function ChartExportButton({
  target,
  filename = "chart",
  format = "png",
}: ChartExportButtonProps) {
  const handleExport = React.useCallback(async () => {
    const svg = target.current?.querySelector("svg");
    if (!svg) {
      toast.error("未找到图表元素");
      return;
    }
    if (format === "svg") {
      const serializer = new XMLSerializer();
      const blob = new Blob([serializer.serializeToString(svg)], {
        type: "image/svg+xml",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("已导出 SVG");
      return;
    }
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.clientWidth || 800;
      canvas.height = svg.clientHeight || 400;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("已导出 PNG");
      });
    };
    img.src = `data:image/svg+xml;base64,${svg64}`;
  }, [target, filename, format]);

  return (
    <Button
      data-slot="chart-export"
      variant="ghost"
      size="icon-xs"
      onClick={handleExport}
      aria-label="导出图表"
      title="导出图表"
    >
      <DownloadIcon />
    </Button>
  );
}
