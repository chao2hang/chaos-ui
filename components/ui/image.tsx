"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component Image
 * @category ui/media
 * @since 0.5.0
 * @description Image component with lazy loading, placeholder, and preview.
 * / 图片组件：懒加载、占位符、预览放大
 * @keywords image, lazy, placeholder, preview, media
 * @example
 * <Image src="/photo.jpg" alt="Photo" placeholder="/thumb.jpg" preview />
 */

interface ImageProps extends Omit<React.ComponentProps<"img">, "placeholder"> {
  /** Image source / 图片地址 */
  src?: string;
  /** Alt text / 替代文本 */
  alt?: string;
  /** Low-quality placeholder src / 低质量占位图地址 */
  placeholder?: string;
  /** Enable click-to-preview / 启用点击预览 */
  preview?: boolean;
  /** Border radius / 圆角 */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /** Aspect ratio / 宽高比 */
  aspectRatio?: "auto" | "1/1" | "4/3" | "16/9" | "3/2";
  /** Object fit / 填充模式 */
  fit?: "cover" | "contain" | "fill" | "none";
  /** Fallback content when load fails / 加载失败回退 */
  fallback?: React.ReactNode;
}

const roundedMap = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const aspectMap = {
  auto: "",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
};

function Image({
  className,
  src,
  alt = "",
  placeholder,
  preview = false,
  rounded = "md",
  aspectRatio = "auto",
  fit = "cover",
  fallback,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const currentSrc = errored ? undefined : src;

  if (errored && fallback) {
    return <div className={cn("inline-flex items-center justify-center", className)}>{fallback}</div>;
  }

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          roundedMap[rounded],
          aspectMap[aspectRatio],
          !loaded && "animate-pulse",
          className,
        )}
      >
        {placeholder && !loaded && (
          <img
            src={placeholder}
            alt=""
            className="absolute inset-0 size-full object-cover blur-sm transition-opacity"
            style={{ opacity: loaded ? 0 : 1 }}
            aria-hidden="true"
          />
        )}
        <img
          src={currentSrc}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "size-full transition-opacity",
            fit === "cover" && "object-cover",
            fit === "contain" && "object-contain",
            fit === "fill" && "object-fill",
            !loaded && "opacity-0",
            preview && "cursor-pointer",
          )}
          onClick={preview ? () => setPreviewOpen(true) : undefined}
          {...props}
        />
      </div>

      {preview && previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPreviewOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}

/** Image.Group for displaying a grid of images */
function ImageGroup({
  className,
  children,
  cols = 3,
  gap = "md",
}: {
  className?: string;
  children?: React.ReactNode;
  cols?: number;
  gap?: "sm" | "md" | "lg";
}) {
  const gapClass = gap === "sm" ? "gap-1" : gap === "lg" ? "gap-4" : "gap-2";
  return (
    <div
      data-slot="image-group"
      className={cn("grid", gapClass, className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

export { Image, ImageGroup };
export type { ImageProps };