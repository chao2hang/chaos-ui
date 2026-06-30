"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatImageGallery
 * @category business/chat
 * @since 0.7.0
 * @description 图片消息组（网格布局，无障碍 alt）
 * @keywords chat, image, gallery
 * @example
 * <ChatImageGallery images={[{ src: "/a.png", alt: "diagram" }]} />
 */

interface ChatImageGalleryProps {
  images: Array<{ src: string; alt?: string }>;
  className?: string;
}

function ChatImageGallery({ images, className }: ChatImageGalleryProps) {
  if (images.length === 0) {
    return <div data-slot="chat-image-gallery" className={cn("hidden", className)} aria-hidden />;
  }

  const cols =
    images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div
      data-slot="chat-image-gallery"
      className={cn("grid max-w-md gap-1", cols, className)}
      role="group"
      aria-label={`Image gallery, ${images.length} image${images.length > 1 ? "s" : ""}`}
    >
      {images.map((img, idx) => (
        <a
          key={idx}
          href={img.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group/img relative block aspect-square overflow-hidden rounded-md bg-muted"
          aria-label={img.alt ?? `Image ${idx + 1}`}
        >
          <img
            src={img.src}
            alt={img.alt ?? `Image ${idx + 1}`}
            loading="lazy"
            className="size-full object-cover transition-transform group-hover/img:scale-105"
          />
        </a>
      ))}
    </div>
  );
}

export { ChatImageGallery };
export type { ChatImageGalleryProps };
