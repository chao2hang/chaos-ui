"use client";

import { cn } from "@/lib/utils";

/**
 * @component ImageGallery
 * @category business/attachment
 * @since 0.7.0
 * @description 图片画廊
 * @keywords image, gallery
 * @example
 * <ImageGallery />
 */

interface ImageGalleryProps {
  images: Array<{ src: string; alt?: string }>;
  className?: string;
}

function ImageGallery({ className }: ImageGalleryProps) {
  return (
    <div data-slot="image-gallery" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ImageGallery };
export type { ImageGalleryProps };
