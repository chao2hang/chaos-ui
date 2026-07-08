"use client";
import * as React from "react";
import {
  ZoomInIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  columns?: 2 | 3 | 4 | 5;
  enableLightbox?: boolean;
  className?: string;
}

export function ImageGallery({
  images,
  columns = 3,
  enableLightbox = true,
  className,
  ...props
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  }[columns];
  return (
    <div data-slot="image-gallery" className={className} {...props}>
      <div className={cn("grid gap-2", colClass)}>
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => enableLightbox && setLightboxIndex(i)}
            className="group bg-muted relative aspect-square overflow-hidden rounded-md"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="size-full object-cover transition-transform group-hover:scale-105"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-left text-xs text-white">
                {img.caption}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/20 group-hover:opacity-100">
              <ZoomInIcon className="size-5 text-white" />
            </div>
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}

function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const img = images[index];
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onIndexChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, images.length, onClose, onIndexChange]);
  return (
    <div
      data-slot="image-lightbox"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        aria-label="关闭"
      >
        <XIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index - 1 + images.length) % images.length);
        }}
        className="absolute left-4 text-white hover:bg-white/10"
        aria-label="上一张"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index + 1) % images.length);
        }}
        className="absolute right-4 text-white hover:bg-white/10"
        aria-label="下一张"
      >
        <ChevronRightIcon />
      </Button>
      <img
        src={img.src}
        alt={img.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black/50 px-3 py-1.5 text-sm text-white">
        {index + 1} / {images.length}
        {img.caption && (
          <span className="ml-2 text-white/70">{img.caption}</span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          const a = document.createElement("a");
          a.href = img.src;
          a.download = img.alt || `image-${index}`;
          a.click();
        }}
        className="absolute right-4 bottom-4 text-white hover:bg-white/10"
        aria-label="下载"
      >
        <DownloadIcon />
      </Button>
    </div>
  );
}
