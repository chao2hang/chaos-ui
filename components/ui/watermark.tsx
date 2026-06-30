"use client";
/* eslint-disable @next/next/no-img-element -- Watermarks accept arbitrary image sources without Next image sizing/domain constraints. */
import * as React from "react";
import { useTranslation } from "react-i18next";
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

export function Watermark({
  text,
  image,
  rotate = -22,
  gap = [120, 100],
  fontSize = 14,
  className,
  fullPage = true,
  zIndex = 1000,
  opacity = 0.08,
  color = "#000",
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
              className="whitespace-nowrap font-medium select-none"
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
              className="whitespace-nowrap font-medium select-none"
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
