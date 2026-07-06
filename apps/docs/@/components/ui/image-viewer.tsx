"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const imageViewerVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4",
  {
    variants: {
      open: {
        true: "",
        false: "hidden",
      },
    },
    defaultVariants: { open: false },
  },
);

interface ImageViewerProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof imageViewerVariants> {
  /** Whether the viewer is open */
  open?: boolean;
  /** Called when the viewer should close */
  onClose?: () => void;
  /** Image source URL */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** List of images for gallery mode */
  images?: { src: string; alt?: string }[];
  /** Initial index for gallery mode */
  initialIndex?: number;
}

function ImageViewer({
  className,
  open: controlledOpen,
  onClose,
  src,
  alt = "",
  images,
  initialIndex = 0,
  ...props
}: ImageViewerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [scale, setScale] = React.useState(1);

  const isOpen = controlledOpen ?? internalOpen;
  const imageList = images ?? (src ? [{ src, alt }] : []);
  const current = imageList[currentIndex];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose?.() ?? setInternalOpen(false);
      } else if (e.key === "ArrowLeft" && imageList.length > 1) {
        setCurrentIndex((i) => (i - 1 + imageList.length) % imageList.length);
      } else if (e.key === "ArrowRight" && imageList.length > 1) {
        setCurrentIndex((i) => (i + 1) % imageList.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, imageList.length]);

  React.useEffect(() => {
    setScale(1);
  }, [currentIndex]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) =>
      Math.max(0.5, Math.min(5, s + (e.deltaY > 0 ? -0.1 : 0.1))),
    );
  };

  if (!isOpen) return null;

  return (
    <div
      data-slot="image-viewer"
      className={cn(imageViewerVariants({ open: isOpen }), className)}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.() ?? setInternalOpen(false);
        }
      }}
      {...props}
    >
      <button
        type="button"
        onClick={() => {
          onClose?.() ?? setInternalOpen(false);
        }}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        aria-label="Close viewer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      {imageList.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setCurrentIndex(
                (i) => (i - 1 + imageList.length) % imageList.length,
              )
            }
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex((i) => (i + 1) % imageList.length)}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      <img
        src={current?.src}
        alt={current?.alt ?? ""}
        style={{ transform: `scale(${scale})` }}
        className="max-h-[90vh] max-w-[90vw] object-contain transition-transform"
        onWheel={handleWheel}
        draggable={false}
      />

      {imageList.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {imageList.length}
        </div>
      )}
    </div>
  );
}

export { ImageViewer, imageViewerVariants };
