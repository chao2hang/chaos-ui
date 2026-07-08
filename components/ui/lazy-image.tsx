"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ImageIcon } from "./icons";

interface LazyImageProps extends Omit<
  React.ComponentProps<"img">,
  "placeholder"
> {
  /** Image source / 图片地址 */
  src?: string;
  /** Alt text / 替代文本 */
  alt?: string;
  /** Width in px / 宽度 */
  width?: number | string;
  /** Height in px / 高度 */
  height?: number | string;
  /** Placeholder color or blur data URL / 占位颜色或模糊图地址 */
  placeholder?: string;
  /** Enable blur-up effect / 启用模糊渐显效果 */
  blur?: boolean;
  /** Fallback content on error / 加载失败的回退内容 */
  fallback?: React.ReactNode;
  /** Error callback / 错误回调 */
  onError?: () => void;
}

type LoadState = "loading" | "loaded" | "error";

function LazyImage({
  className,
  src,
  alt = "",
  width,
  height,
  placeholder,
  blur = true,
  fallback,
  onError,
  ...props
}: LazyImageProps) {
  const [state, setState] = React.useState<LoadState>("loading");
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // IntersectionObserver for lazy loading
  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "50px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoad = () => setState("loaded");
  const handleError = () => {
    setState("error");
    onError?.();
  };

  const isBlurDataUrl = placeholder?.startsWith("data:image");
  const showShimmer = state === "loading" && !placeholder;

  const containerStyle: React.CSSProperties = {
    width: width,
    height: height,
  };

  if (state === "error" && fallback) {
    return (
      <div
        ref={containerRef}
        data-slot="lazy-image"
        className={cn(
          "bg-muted inline-flex items-center justify-center",
          className,
        )}
        style={containerStyle}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-slot="lazy-image"
      className={cn("bg-muted relative overflow-hidden", className)}
      style={containerStyle}
    >
      {/* Shimmer */}
      {showShimmer && (
        <div className="from-muted via-muted/50 to-muted absolute inset-0 animate-pulse bg-gradient-to-r bg-[length:200%_100%]" />
      )}

      {/* Blur placeholder - stays mounted, fades out when loaded */}
      {placeholder && isBlurDataUrl && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-300",
            blur ? "scale-105 blur-lg" : "",
            state === "loaded" ? "opacity-0" : "opacity-100",
          )}
        />
      )}

      {/* Solid color placeholder */}
      {state === "loading" && placeholder && !isBlurDataUrl && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: placeholder }}
        />
      )}

      {/* Actual image */}
      {inView && state !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          className={cn(
            "size-full object-cover transition-all duration-300",
            state === "loaded" ? "blur-0 opacity-100" : "opacity-0 blur-lg",
          )}
          {...props}
        />
      )}

      {/* Error fallback (default) */}
      {state === "error" && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="text-muted-foreground size-8" />
        </div>
      )}
    </div>
  );
}

export { LazyImage };
export type { LazyImageProps };
