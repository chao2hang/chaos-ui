"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon,
  MaximizeIcon,
} from "@/components/ui/icons";

/**
 * @component ImageGallery
 * @category business/attachment
 * @since 0.7.0
 * @description 图片画廊
 * @keywords image, gallery
 * @param images 图片列表，每项含 src 与可选 alt
 * @example
 * <ImageGallery images={[{ src: "/a.jpg", alt: "封面" }]} />
 */

interface ImageGalleryProps {
  images: Array<{ src: string; alt?: string }>;
  className?: string;
}

function ImageGallery({ images, className }: ImageGalleryProps) {
  const [active, setActive] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const count = images.length;
  const safeIndex = count === 0 ? 0 : Math.min(active, count - 1);
  const current = count === 0 ? null : images[safeIndex];

  const goTo = React.useCallback(
    (next: number) => {
      if (count === 0) return;
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  const prev = React.useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);
  const next = React.useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);

  const handleThumbKey = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(index);
    }
  };

  if (count === 0) {
    return (
      <div
        data-slot="image-gallery"
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 p-8 text-sm text-muted-foreground",
          className,
        )}
      >
        <ImageIcon className="size-6" aria-hidden="true" />
        <span>暂无图片</span>
      </div>
    );
  }

  return (
    <div
      data-slot="image-gallery"
      className={cn("flex flex-col gap-3", className)}
    >
      <div
        className={cn(
          "group relative flex items-center justify-center overflow-hidden rounded-lg border bg-muted",
          expanded ? "h-[32rem]" : "h-64",
        )}
      >
        <img
          src={current!.src}
          alt={current!.alt ?? `图片 ${safeIndex + 1}`}
          className="h-full w-full object-contain"
        />

        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="上一张"
          onClick={prev}
          disabled={count <= 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="下一张"
          onClick={next}
          disabled={count <= 1}
        >
          <ChevronRightIcon />
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          aria-label={expanded ? "缩小" : "放大"}
          aria-pressed={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <MaximizeIcon />
        </Button>

        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
          {safeIndex + 1} / {count}
        </span>
      </div>

      {count > 1 && (
        <ul role="list" className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => {
            const isActive = index === safeIndex;
            return (
              <li key={`${img.src}-${index}`} className="shrink-0">
                <button
                  type="button"
                  aria-label={`查看第 ${index + 1} 张图片`}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={0}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => handleThumbKey(event, index)}
                  className={cn(
                    "size-16 overflow-hidden rounded-md border-2 bg-muted transition-colors",
                    isActive
                      ? "border-primary"
                      : "border-transparent hover:border-border",
                  )}
                >
                  <img
                    src={img.src}
                    alt={`缩略图 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { ImageGallery };
export type { ImageGalleryProps };
