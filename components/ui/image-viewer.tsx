"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/ui/icons";

/**
 * @component ImageViewer
 * @category ui/display
 * @since 0.7.0
 * @description 图片查看器 — 全屏遮罩 + 缩放 + 旋转 + 上一张/下一张。
 * / Image viewer — fullscreen overlay with zoom, rotate, and navigation.
 * @keywords image, viewer, gallery, zoom, rotate, lightbox
 * @example
 * <ImageViewer
 *   open={open}
 *   onOpenChange={setOpen}
 *   images={[{ src: "/img1.jpg", alt: "Image 1" }]}
 *   index={0}
 * />
 */
interface ImageViewerImage {
  src: string;
  alt?: string;
}

interface ImageViewerProps {
  /** Open state / 是否打开 */
  open: boolean;
  /** Open change callback / 开关回调 */
  onOpenChange: (open: boolean) => void;
  /** Image list / 图片列表 */
  images: ImageViewerImage[];
  /** Initial image index / 初始索引 */
  index?: number;
}

function ImageViewer({
  open,
  onOpenChange,
  images,
  index = 0,
}: ImageViewerProps) {
  const [current, setCurrent] = React.useState(index);
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) {
      setCurrent(index);
      setZoom(1);
      setRotation(0);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange(false);
        if (e.key === "ArrowLeft") {
          setCurrent((c) => (c - 1 + images.length) % images.length);
        }
        if (e.key === "ArrowRight") {
          setCurrent((c) => (c + 1) % images.length);
        }
      };
      window.addEventListener("keydown", onKey);
      // Focus close control for keyboard users when the dialog opens.
      requestAnimationFrame(() => closeRef.current?.focus());
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKey);
      };
    }
    return undefined;
  }, [open, index, images.length, onOpenChange]);

  if (!open || images.length === 0) return null;

  const image = images[current];
  if (!image) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div
      data-slot="image-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || "Image viewer"}
      className="fixed inset-0 z-[var(--z-index-modal,1050)] flex items-center justify-center bg-black/90"
      onClick={() => onOpenChange(false)}
    >
      <Button
        ref={closeRef}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onOpenChange(false);
        }}
        aria-label="Close"
      >
        <XIcon />
      </Button>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            {"<"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            {">"}
          </Button>
        </>
      )}

      <div className="flex flex-col items-center gap-3">
        <img
          src={image.src}
          alt={image.alt ?? ""}
          className="max-h-[80vh] max-w-[90vw] object-contain transition-transform"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => Math.max(0.5, z - 0.25));
            }}
          >
            Zoom Out
          </Button>
          <span className="text-sm text-white/70 tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => Math.min(3, z + 0.25));
            }}
          >
            Zoom In
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setRotation((r) => (r + 90) % 360);
            }}
          >
            Rotate
          </Button>
        </div>
        {images.length > 1 && (
          <span className="text-xs text-white/50">
            {current + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}

export { ImageViewer };
export type { ImageViewerProps, ImageViewerImage };
