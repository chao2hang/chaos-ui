"use client";
/* eslint-disable @next/next/no-img-element -- Watermarks accept arbitrary image sources without Next image sizing/domain constraints. */
import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";

interface WatermarkProps {
  text?: string;
  image?: string;
  rotate?: number;
  gap?: [number, number];
  fontSize?: number;
  className?: string;
  fullPage?: boolean;
  zIndex?: number;
  opacity?: number;
  color?: string;
}

/**
 * @component Watermark
 * @category ui/feedback
 * @since 0.2.0
 * @description Tiled watermark overlay with text or image, supporting full-page and container modes / 平铺水印覆盖层，支持文本或图片，可全页面或容器内显示
 * @keywords watermark, overlay, tiled, security, 水印
 * @example
 * <Watermark text="Confidential" />
 * <Watermark image="/logo.png" fullPage={false} />
 */
export function Watermark({
  text,
  image,
  rotate = -22,
  gap = [120, 100],
  fontSize = 14,
  className,
  fullPage = true,
  // Stay below modals/dialogs (token --z-index-modal is typically 1050).
  zIndex = 10,
  opacity = 0.08,
  color = "var(--foreground)",
}: WatermarkProps) {
  const { t } = useTranslation("data");
  const resolvedText = text ?? t("watermark.default");
  const [tiles, setTiles] = React.useState<{ x: number; y: number }[]>([]);

  // Destructure gap into stable primitives so the effect doesn't re-run when
  // the caller passes an inline array (new reference every render → recompute
  // tiles + rebind resize listener every render).
  const [gapX, gapY] = gap;

  React.useEffect(() => {
    if (!fullPage) return;
    const compute = () => {
      const cols = Math.ceil(window.innerWidth / gapX) + 1;
      const rows = Math.ceil(window.innerHeight / gapY) + 1;
      const next: { x: number; y: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          next.push({ x: c * gapX, y: r * gapY });
        }
      }
      setTiles(next);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [fullPage, gapX, gapY]);

  if (!fullPage) {
    return (
      <div
        data-slot="watermark"
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
        style={{ zIndex }}
      >
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {image ? (
            <img src={image} alt="" style={{ opacity, maxWidth: "60%" }} />
          ) : (
            <span
              className="font-medium whitespace-nowrap select-none"
              style={{ color, fontSize, opacity }}
            >
              {resolvedText}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="watermark"
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 overflow-hidden",
        className,
      )}
      style={{ zIndex }}
    >
      {tiles.map((t, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: t.x,
            top: t.y,
            width: gapX,
            height: gapY,
            transform: `rotate(${rotate}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <img src={image} alt="" style={{ opacity, maxHeight: "60%" }} />
          ) : (
            <span
              className="font-medium whitespace-nowrap select-none"
              style={{ color, fontSize, opacity }}
            >
              {resolvedText}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
