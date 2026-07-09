"use client";

import * as React from "react";
import {
  ImageIcon,
  CheckIcon,
  RotateCcwIcon,
} from "@chaos_team/chaos-ui/ui-icons";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@chaos_team/chaos-ui/ui";

export interface CropResult {
  blob: Blob;
  dataUrl: string;
}

export interface ImageCropperProps extends React.ComponentProps<"div"> {
  /** Whether the cropper dialog is open / 裁剪对话框是否打开 */
  open: boolean;
  /** Callback to control dialog open state / 控制对话框打开状态的回调 */
  onOpenChange: (open: boolean) => void;
  /** Image source URL or File object / 图片源 URL 或 File 对象 */
  image: string | File;
  /** Callback fired when cropping is complete / 裁剪完成时的回调 */
  onCrop: (result: CropResult) => void;
  /** Aspect ratio of the crop region / 裁剪区域的宽高比 */
  aspect?: number;
  /** Shape of the crop region / 裁剪区域的形状 */
  shape?: "circle" | "rect";
  /** Dialog title / 对话框标题 */
  title?: string;
  /** Minimum crop width in pixels / 最小裁剪宽度（像素） */
  minWidth?: number;
  /** Maximum crop width in pixels / 最大裁剪宽度（像素） */
  maxWidth?: number;
  /** Minimum crop height in pixels / 最小裁剪高度（像素） */
  minHeight?: number;
  /** Maximum crop height in pixels / 最大裁剪高度（像素） */
  maxHeight?: number;
}

interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

const HANDLE_SIZE = 10;
const MIN_SIZE = 20;

/**
 * @component ImageCropper
 * @category business/media
 * @since 0.2.0
 * @description Canvas-based image cropping dialog with draggable and resizable crop region, supporting circle and rect shapes / 基于 canvas 的图片裁剪对话框，裁剪区域可拖拽和缩放，支持圆形和矩形
 * @keywords image, crop, avatar, photo, upload, canvas, dialog
 * @example
 * <ImageCropper
 *   open={open}
 *   onOpenChange={setOpen}
 *   image="/photo.jpg"
 *   aspect={1}
 *   shape="circle"
 *   onCrop={(result) => uploadImage(result.blob)}
 * />
 */
function ImageCropper({
  open,
  onOpenChange,
  image,
  onCrop,
  aspect = 1,
  shape = "circle",
  title = "Crop Image",
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  className,
  ...props
}: ImageCropperProps) {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [imageSrc, setImageSrc] = React.useState<string>("");
  const [imgNaturalSize, setImgNaturalSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [crop, setCrop] = React.useState<CropRegion>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [dragMode, setDragMode] = React.useState<
    | null
    | "move"
    | "resize-nw"
    | "resize-ne"
    | "resize-sw"
    | "resize-se"
    | "resize-n"
    | "resize-s"
    | "resize-w"
    | "resize-e"
  >(null);
  const dragStartRef = React.useRef<{
    mouseX: number;
    mouseY: number;
    crop: CropRegion;
  } | null>(null);

  // Load image source from string or File
  React.useEffect(() => {
    if (typeof image === "string") {
      setImageSrc(image);
    } else {
      const url = URL.createObjectURL(image);
      setImageSrc(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  // Initialize crop region when image loads
  const handleImageLoad = React.useCallback(() => {
    const img = imageRef.current;
    if (!img) return;
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    setImgNaturalSize({ width: natW, height: natH });

    // Calculate display size (fit within 400px max)
    const maxDim = 400;
    let dispW = natW;
    let dispH = natH;
    if (natW > maxDim || natH > maxDim) {
      const ratio = Math.min(maxDim / natW, maxDim / natH);
      dispW = natW * ratio;
      dispH = natH * ratio;
    }
    setDisplaySize({ width: dispW, height: dispH });

    // Initialize crop to centered square
    const cropSize = Math.min(dispW, dispH) * 0.8;
    const aspectHeight = cropSize / aspect;
    const finalHeight = Math.min(aspectHeight, dispH);
    const finalWidth = finalHeight * aspect;
    setCrop({
      x: (dispW - finalWidth) / 2,
      y: (dispH - finalHeight) / 2,
      width: finalWidth,
      height: finalHeight,
    });
  }, [aspect]);

  const clampCrop = React.useCallback(
    (region: CropRegion): CropRegion => {
      let { x, y, width, height } = region;

      // Enforce aspect ratio
      if (aspect > 0) {
        height = width / aspect;
      }

      // Enforce min/max sizes (in display coordinates)
      const minW = minWidth
        ? Math.max(
            MIN_SIZE,
            (minWidth / imgNaturalSize.width) * displaySize.width,
          )
        : MIN_SIZE;
      const maxW = maxWidth
        ? Math.min(
            displaySize.width,
            (maxWidth / imgNaturalSize.width) * displaySize.width,
          )
        : displaySize.width;
      const minH = minHeight
        ? Math.max(
            MIN_SIZE,
            (minHeight / imgNaturalSize.height) * displaySize.height,
          )
        : MIN_SIZE;
      const maxH = maxHeight
        ? Math.min(
            displaySize.height,
            (maxHeight / imgNaturalSize.height) * displaySize.height,
          )
        : displaySize.height;

      width = Math.max(minW, Math.min(maxW, width));
      height = Math.max(minH, Math.min(maxH, height));

      // Clamp position
      x = Math.max(0, Math.min(x, displaySize.width - width));
      y = Math.max(0, Math.min(y, displaySize.height - height));

      return { x, y, width, height };
    },
    [
      aspect,
      displaySize,
      imgNaturalSize,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
    ],
  );

  const handleMouseDown = React.useCallback(
    (mode: NonNullable<typeof dragMode>, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragMode(mode);
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        crop: { ...crop },
      };
    },
    [crop],
  );

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!dragMode || !dragStartRef.current) return;
      e.preventDefault();

      const startX = dragStartRef.current.mouseX;
      const startY = dragStartRef.current.mouseY;
      const startCrop = dragStartRef.current.crop;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newCrop: CropRegion = { ...startCrop };

      switch (dragMode) {
        case "move":
          newCrop.x = startCrop.x + deltaX;
          newCrop.y = startCrop.y + deltaY;
          break;
        case "resize-nw":
          newCrop.x = startCrop.x + deltaX;
          newCrop.y = startCrop.y + deltaY;
          newCrop.width = startCrop.width - deltaX;
          break;
        case "resize-ne":
          newCrop.y = startCrop.y + deltaY;
          newCrop.width = startCrop.width + deltaX;
          break;
        case "resize-sw":
          newCrop.x = startCrop.x + deltaX;
          newCrop.width = startCrop.width - deltaX;
          break;
        case "resize-se":
          newCrop.width = startCrop.width + deltaX;
          break;
        case "resize-n":
          newCrop.y = startCrop.y + deltaY;
          newCrop.height = startCrop.height - deltaY;
          break;
        case "resize-s":
          newCrop.height = startCrop.height + deltaY;
          break;
        case "resize-w":
          newCrop.x = startCrop.x + deltaX;
          newCrop.width = startCrop.width - deltaX;
          break;
        case "resize-e":
          newCrop.width = startCrop.width + deltaX;
          break;
      }

      setCrop(clampCrop(newCrop));
    },
    [dragMode, clampCrop],
  );

  const handleMouseUp = React.useCallback(() => {
    setDragMode(null);
    dragStartRef.current = null;
  }, []);

  // Perform crop using canvas
  const handleCrop = React.useCallback(() => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || displaySize.width === 0) return;

    // Scale from display coordinates to natural image coordinates
    const scaleX = imgNaturalSize.width / displaySize.width;
    const scaleY = imgNaturalSize.height / displaySize.height;

    const sx = crop.x * scaleX;
    const sy = crop.y * scaleY;
    const sw = crop.width * scaleX;
    const sh = crop.height * scaleY;

    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2,
        0,
        Math.PI * 2,
      );
      ctx.closePath();
      ctx.clip();
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const dataUrl = canvas.toDataURL("image/png");
        onCrop({ blob, dataUrl });
        onOpenChange(false);
      },
      "image/png",
      0.9,
    );
  }, [crop, displaySize, imgNaturalSize, shape, onCrop, onOpenChange]);

  const handleRotate = React.useCallback(() => {
    // Rotate is a placeholder for future enhancement
    // Full rotation requires canvas re-render of the image
  }, []);

  const handles = [
    { name: "resize-nw", className: "top-0 left-0 cursor-nw-resize" },
    { name: "resize-ne", className: "top-0 right-0 cursor-ne-resize" },
    { name: "resize-sw", className: "bottom-0 left-0 cursor-sw-resize" },
    { name: "resize-se", className: "bottom-0 right-0 cursor-se-resize" },
  ] as const;

  return (
    <div data-slot="image-cropper" className={cn(className)} {...props}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="size-4" />
              {title}
            </DialogTitle>
          </DialogHeader>

          <div
            ref={containerRef}
            className="bg-muted/50 relative mx-auto flex max-h-[400px] items-center justify-center overflow-hidden rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {imageSrc && (
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={handleImageLoad}
                draggable={false}
                className="max-h-[400px] object-contain select-none"
                style={{
                  width: displaySize.width || "auto",
                  height: displaySize.height || "auto",
                }}
              />
            )}

            {/* Crop overlay */}
            {displaySize.width > 0 && (
              <div
                className="border-primary absolute border-2 shadow-lg"
                style={{
                  left: crop.x,
                  top: crop.y,
                  width: crop.width,
                  height: crop.height,
                  borderRadius: shape === "circle" ? "50%" : undefined,
                }}
                onMouseDown={(e) => handleMouseDown("move", e)}
              >
                {/* Dim outside crop area using box-shadow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow: `0 0 0 9999px rgba(0,0,0,0.5)`,
                    borderRadius: shape === "circle" ? "50%" : undefined,
                  }}
                />

                {/* Grid lines */}
                <div className="pointer-events-none absolute top-1/3 right-0 left-0 border-t border-white/30" />
                <div className="pointer-events-none absolute top-2/3 right-0 left-0 border-t border-white/30" />
                <div className="pointer-events-none absolute top-0 bottom-0 left-1/3 border-l border-white/30" />
                <div className="pointer-events-none absolute top-0 bottom-0 left-2/3 border-l border-white/30" />

                {/* Resize handles */}
                {handles.map((handle) => (
                  <div
                    key={handle.name}
                    className={cn(
                      "border-primary absolute z-10 border-2 bg-white",
                      handle.className,
                    )}
                    style={{
                      width: HANDLE_SIZE,
                      height: HANDLE_SIZE,
                    }}
                    onMouseDown={(e) =>
                      handleMouseDown(
                        handle.name as NonNullable<typeof dragMode>,
                        e,
                      )
                    }
                  />
                ))}

                {/* Edge handles */}
                <div
                  className="absolute top-0 left-1/2 h-1 w-6 -translate-x-1/2 cursor-n-resize"
                  onMouseDown={(e) => handleMouseDown("resize-n", e)}
                />
                <div
                  className="absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 cursor-s-resize"
                  onMouseDown={(e) => handleMouseDown("resize-s", e)}
                />
                <div
                  className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 cursor-w-resize"
                  onMouseDown={(e) => handleMouseDown("resize-w", e)}
                />
                <div
                  className="absolute top-1/2 right-0 h-6 w-1 -translate-y-1/2 cursor-e-resize"
                  onMouseDown={(e) => handleMouseDown("resize-e", e)}
                />
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-xs">Preview:</span>
            <div
              className="border-border overflow-hidden border"
              style={{
                width: 48,
                height: 48,
                borderRadius: shape === "circle" ? "50%" : undefined,
              }}
            >
              {imageSrc && displaySize.width > 0 && (
                <PreviewCanvas
                  imageSrc={imageSrc}
                  crop={crop}
                  displaySize={displaySize}
                  imgNaturalSize={imgNaturalSize}
                  shape={shape}
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRotate}
              icon={<RotateCcwIcon />}
            >
              Rotate
            </Button>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button size="sm" onClick={handleCrop} icon={<CheckIcon />}>
              Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for actual cropping */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

/** Small canvas-based preview of the cropped result */
function PreviewCanvas({
  imageSrc,
  crop,
  displaySize,
  imgNaturalSize,
  shape,
}: {
  imageSrc: string;
  crop: CropRegion;
  displaySize: { width: number; height: number };
  imgNaturalSize: { width: number; height: number };
  shape: "circle" | "rect";
}) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas || displaySize.width === 0) return;

    const img = new Image();
    img.onload = () => {
      const scaleX = imgNaturalSize.width / displaySize.width;
      const scaleY = imgNaturalSize.height / displaySize.height;
      const sx = crop.x * scaleX;
      const sy = crop.y * scaleY;
      const sw = crop.width * scaleX;
      const sh = crop.height * scaleY;

      canvas.width = 48;
      canvas.height = 48;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 48, 48);

      if (shape === "circle") {
        ctx.beginPath();
        ctx.arc(24, 24, 24, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 48, 48);
    };
    img.src = imageSrc;
  }, [imageSrc, crop, displaySize, imgNaturalSize, shape]);

  return <canvas ref={ref} className="size-12" />;
}

export { ImageCropper };
// ImageCropperProps, CropResult are exported via their interface declarations above
