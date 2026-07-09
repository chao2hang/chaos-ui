"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * Props for the ProgressiveImage component.
 */
interface ProgressiveImageProps {
  /** Image source URL / 图片源地址 */
  src: string;
  /** Alt text / 替代文本 */
  alt: string;
  /** Image width / 图片宽度 */
  width?: number | string;
  /** Image height / 图片高度 */
  height?: number | string;
  /** Additional className / 额外类名 */
  className?: string;
  /** Tiny placeholder image (blur-up) / 微型占位图（模糊渐显） */
  blurDataURL?: string;
  /** Solid color placeholder (default: bg-muted) / 纯色占位 */
  placeholderColor?: string;
  /** Error callback / 错误回调 */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/* ------------------------------------------------------------------ */
/*  ProgressiveImage - main export                                    */
/* ------------------------------------------------------------------ */

/**
 * @component ProgressiveImage
 * @category ui/media
 * @since 0.2.0
 * @description Progressive image loading with blur-up technique. Loads a
 *   tiny placeholder (or solid color), then loads the full image and
 *   cross-fades from blurred to sharp using CSS filter transition. /
 *   渐进式图片加载，使用模糊渐显技术。先加载微型占位图（或纯色），然后加载
 *   完整图片，通过 CSS filter 过渡从模糊到清晰交叉渐显。
 * @keywords image, progressive, blur-up, placeholder, lazy, load, fade
 * @example
 * ```tsx
 * <ProgressiveImage
 *   src="/large-photo.jpg"
 *   alt="Nature"
 *   blurDataURL="data:image/jpeg;base64,..."
 * />
 * ```
 */
function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className,
  blurDataURL,
  placeholderColor = "bg-muted",
  onError,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const fullImgRef = React.useRef<HTMLImageElement>(null);

  // Use IntersectionObserver for lazy loading
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const img = fullImgRef.current;
            if (img) {
              img.src = src;
            }
            observer.disconnect();
          }
        }
      },
      { rootMargin: "50px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(e);
  };

  const containerStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      ref={containerRef}
      data-slot="progressive-image"
      className={cn(
        "relative overflow-hidden",
        !blurDataURL && placeholderColor,
        className,
      )}
      style={containerStyle}
    >
      {/* Placeholder (blur or solid color) */}
      {blurDataURL && !hasError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            loaded ? "opacity-0" : "scale-105 opacity-100 blur-xl",
          )}
        />
      )}

      {/* Full image */}
      {!hasError && (
        <img
          ref={fullImgRef}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 size-full object-cover transition-all duration-700",
            loaded
              ? "blur-0 scale-100 opacity-100"
              : "scale-105 opacity-0 blur-xl",
          )}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="text-muted-foreground absolute inset-0 flex items-center justify-center text-sm">
          加载失败
        </div>
      )}

      {/* Loading spinner */}
      {!loaded && !hasError && !blurDataURL && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-primary size-5 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      )}
    </div>
  );
}

export { ProgressiveImage };
export type { ProgressiveImageProps };
