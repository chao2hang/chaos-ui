"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatImageGallery
 * @category business/chat
 * @since 0.7.0
 * @description 图片消息组
 * @keywords chat, image, gallery
 * @example
 * <ChatImageGallery />
 */

interface ChatImageGalleryProps {
  images: Array<{ src: string; alt?: string }>;
  className?: string;
}

function ChatImageGallery({ className }: ChatImageGalleryProps) {
  return <div data-slot="chat-image-gallery" className={cn("", className)} />;
}

export { ChatImageGallery };
export type { ChatImageGalleryProps };
