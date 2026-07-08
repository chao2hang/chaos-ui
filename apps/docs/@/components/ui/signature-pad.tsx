"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  SignatureIcon,
  Trash2Icon,
  UndoIcon,
  SaveIcon,
} from "@/components/ui/icons";

/**
 * Imperative handle exposed via React.forwardRef for the SignaturePad.
 */
interface SignaturePadHandle {
  /** Clear the canvas */
  clear: () => void;
  /** Check if canvas has ink */
  isEmpty: () => boolean;
  /** Export as data URL */
  toDataURL: (type?: string) => string | null;
  /** Export as Blob */
  toBlob: () => Promise<Blob | null>;
  /** Undo last stroke */
  undo: () => void;
}

/**
 * Props for the SignaturePad component.
 */
interface SignaturePadProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Pen color */
  penColor?: string;
  /** Pen width (default: 2) */
  penWidth?: number;
  /** Canvas height (default: 200) */
  height?: number;
  /** Canvas width (default: auto/100%) */
  width?: number;
  /** Show guide line */
  guideLine?: boolean;
  /** Read-only mode (displays existing signature) */
  readOnly?: boolean;
  /** Data URL for read-only display */
  value?: string;
  /** Called when ink state changes */
  onChange?: (isEmpty: boolean) => void;
  /** Called on save */
  onSave?: (data: { dataUrl: string; blob: Blob | null }) => void;
  /** Show action buttons (clear/save) */
  showActions?: boolean;
  /** Save button label */
  saveLabel?: string;
  /** Clear button label */
  clearLabel?: string;
  /** Placeholder text */
  placeholder?: string;
}

/** A single point on the canvas (in canvas-coordinate space). */
interface Point {
  x: number;
  y: number;
}

/** One completed stroke: an array of points. */
type Stroke = Point[];

function getPoint(
  event: React.PointerEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

/**
 * @component SignaturePad
 * @category ui/input
 * @since 1.0.0
 * @description Full-featured signature pad with undo, configurable pen, guide line,
 * read-only mode, and imperative API. Uses pointer events for cross-device drawing.
 * @keywords signature, canvas, draw, pen, undo, pad, sign
 * @example
 * const ref = React.useRef<SignaturePadHandle>(null);
 * <SignaturePad ref={ref} penColor="#000" guideLine showActions />
 */
const SignaturePad = React.forwardRef<SignaturePadHandle, SignaturePadProps>(
  function SignaturePad(
    {
      penColor = "currentColor",
      penWidth = 2,
      height = 200,
      width,
      guideLine = false,
      readOnly = false,
      value,
      onChange,
      onSave,
      showActions = true,
      saveLabel = "Save",
      clearLabel = "Clear",
      placeholder = "Sign here",
      className,
      ...props
    },
    ref,
  ) {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const drawingRef = React.useRef(false);
    const strokesRef = React.useRef<Stroke[]>([]);
    const currentStrokeRef = React.useRef<Stroke>([]);
    const [hasInk, setHasInk] = React.useState(false);

    // ---- DPR-aware canvas sizing ----
    const ensureSize = React.useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        // Preserve existing ink across resizes
        const tmp = document.createElement("canvas");
        tmp.width = canvas.width;
        tmp.height = canvas.height;
        const tmpCtx = tmp.getContext("2d");
        if (tmpCtx) tmpCtx.drawImage(canvas, 0, 0);
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
      }
      // Always re-apply pen settings after resize
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = penWidth * dpr;
      ctx.strokeStyle = penColor;
    }, [penColor, penWidth]);

    React.useEffect(() => {
      ensureSize();
    }, [ensureSize]);

    // Re-apply pen settings when they change (without resizing)
    React.useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = penWidth * dpr;
      ctx.strokeStyle = penColor;
    }, [penColor, penWidth]);

    // ---- Drawing helpers ----
    const strokeSegment = (from: Point, to: Point) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    /** Replay all stored strokes onto a clean canvas. */
    const replayStrokes = React.useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr =
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = penWidth * dpr;
      ctx.strokeStyle = penColor;
      for (const stroke of strokesRef.current) {
        for (let i = 1; i < stroke.length; i++) {
          ctx.beginPath();
          ctx.moveTo(stroke[i - 1]!.x, stroke[i - 1]!.y);
          ctx.lineTo(stroke[i]!.x, stroke[i]!.y);
          ctx.stroke();
        }
      }
    }, [penColor, penWidth]);

    // ---- Pointer event handlers ----
    const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (readOnly) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.setPointerCapture(event.pointerId);
      drawingRef.current = true;
      const pt = getPoint(event, canvas);
      currentStrokeRef.current = [pt];
      if (!hasInk) {
        setHasInk(true);
        onChange?.(false);
      }
    };

    const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (readOnly) return;
      const canvas = canvasRef.current;
      if (!canvas || !drawingRef.current) return;
      const pt = getPoint(event, canvas);
      const prev =
        currentStrokeRef.current[currentStrokeRef.current.length - 1];
      if (prev) {
        strokeSegment(prev, pt);
      }
      currentStrokeRef.current.push(pt);
    };

    const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (readOnly) return;
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch {
          /* pointer may already be released */
        }
      }
      if (drawingRef.current && currentStrokeRef.current.length > 0) {
        strokesRef.current.push([...currentStrokeRef.current]);
      }
      drawingRef.current = false;
      currentStrokeRef.current = [];
    };

    // ---- Imperative API ----
    const clear = React.useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokesRef.current = [];
      currentStrokeRef.current = [];
      setHasInk(false);
      onChange?.(true);
    }, [onChange]);

    const isEmpty = React.useCallback(() => {
      return !hasInk;
    }, [hasInk]);

    const toDataURL = React.useCallback(
      (type?: string) => {
        const canvas = canvasRef.current;
        if (!canvas || !hasInk) return null;
        return canvas.toDataURL(type ?? "image/png");
      },
      [hasInk],
    );

    const toBlob = React.useCallback(() => {
      return new Promise<Blob | null>((resolve) => {
        const canvas = canvasRef.current;
        if (!canvas || !hasInk) {
          resolve(null);
          return;
        }
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });
    }, [hasInk]);

    const undo = React.useCallback(() => {
      if (strokesRef.current.length === 0) return;
      strokesRef.current.pop();
      replayStrokes();
      if (strokesRef.current.length === 0) {
        setHasInk(false);
        onChange?.(true);
      }
    }, [replayStrokes, onChange]);

    React.useImperativeHandle(
      ref,
      () => ({
        clear,
        isEmpty,
        toDataURL,
        toBlob,
        undo,
      }),
      [clear, isEmpty, toDataURL, toBlob, undo],
    );

    // ---- Save handler ----
    const handleSave = async () => {
      const dataUrl = toDataURL();
      if (!dataUrl) return;
      const blob = await toBlob();
      onSave?.({ dataUrl, blob });
    };

    // ---- Read-only overlay ----
    const renderReadOnly = () => {
      if (!readOnly || !value) return null;
      return (
        <img
          src={value}
          alt="Signature"
          data-slot="signature-pad-readonly"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        />
      );
    };

    return (
      <div
        data-slot="signature-pad"
        className={cn("flex flex-col gap-2 text-foreground", className)}
        {...props}
      >
        <div
          className="relative overflow-hidden rounded-lg border bg-background"
          style={{
            height,
            ...(width ? { width } : { width: "100%" }),
          }}
        >
          <canvas
            ref={canvasRef}
            data-slot="signature-pad-canvas"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              "h-full w-full touch-none",
              readOnly && "pointer-events-none",
            )}
            role="img"
            aria-label="Signature canvas"
          />
          {/* Placeholder when empty */}
          {!hasInk && !readOnly ? (
            <div
              data-slot="signature-pad-placeholder"
              className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <SignatureIcon className="size-5" aria-hidden="true" />
              <span>{placeholder}</span>
            </div>
          ) : null}
          {/* Guide line at bottom 25% */}
          {guideLine && !readOnly ? (
            <div
              data-slot="signature-pad-guideline"
              className="pointer-events-none absolute inset-x-4 border-b border-dashed border-border"
              style={{ bottom: "25%" }}
              aria-hidden="true"
            />
          ) : null}
          {/* Read-only image overlay */}
          {renderReadOnly()}
        </div>
        {/* Action buttons */}
        {showActions && !readOnly ? (
          <div
            className="flex justify-end gap-2"
            data-slot="signature-pad-actions"
          >
            <button
              type="button"
              onClick={undo}
              disabled={!hasInk}
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
            >
              <UndoIcon className="size-4" aria-hidden="true" />
              Undo
            </button>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
            >
              <Trash2Icon className="size-4" aria-hidden="true" />
              {clearLabel}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasInk}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <SaveIcon className="size-4" aria-hidden="true" />
              {saveLabel}
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);

export { SignaturePad };
export type { SignaturePadHandle, SignaturePadProps };
