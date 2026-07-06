"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const imageVariants = cva("relative overflow-hidden", {
  variants: {
    fit: {
      cover: "[&>img]:object-cover",
      contain: "[&>img]:object-contain",
      fill: "[&>img]:object-fill",
      none: "[&>img]:object-none",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: { fit: "cover", rounded: "default" },
});

interface ImageProps
  extends React.ComponentProps<"div">, VariantProps<typeof imageVariants> {
  src: string;
  alt: string;
  /** Fallback element shown while loading or on error */
  fallback?: React.ReactNode;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Called when image fails to load */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Called when image loads successfully */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

function Image({
  className,
  fit,
  rounded,
  src,
  alt,
  fallback,
  width,
  height,
  onError,
  onLoad,
  ...props
}: ImageProps) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div
      data-slot="image"
      className={cn(imageVariants({ fit, rounded }), className)}
      style={{ width, height }}
      {...props}
    >
      {status === "error" && fallback ? (
        <div
          data-slot="image-fallback"
          className="bg-muted absolute inset-0 flex items-center justify-center"
        >
          {fallback}
        </div>
      ) : status === "loading" && fallback ? (
        <div
          data-slot="image-placeholder"
          className="bg-muted absolute inset-0 flex animate-pulse items-center justify-center"
        >
          {fallback}
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        className={cn(
          "size-full",
          status === "loading" && "invisible",
          status === "error" && "hidden",
        )}
        onLoad={(e) => {
          setStatus("loaded");
          onLoad?.(e);
        }}
        onError={(e) => {
          setStatus("error");
          onError?.(e);
        }}
      />
    </div>
  );
}

export { Image, imageVariants };
