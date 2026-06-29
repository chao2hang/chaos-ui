"use client";

import * as React from "react";
import { toString as qrToString, toCanvas as qrToCanvas } from "qrcode";
import { cn } from "@/lib/utils";

/**
 * @component QRCode
 * @category ui/data-display
 * @since 0.5.0
 * @description QR Code generation component using the `qrcode` library.
 * Renders as SVG by default for crisp rendering at any scale.
 * / 二维码生成组件，基于 qrcode 库
 * @keywords qrcode, qr, code, scan, share
 * @example
 * <QRCode value="https://example.com" size={128} />
 * <QRCode value="https://example.com" renderAs="canvas" />
 */

interface QRCodeProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** QR Code content / 二维码内容 */
  value: string;
  /** Size in px / 尺寸，默认 128 */
  size?: number;
  /** Error correction level / 纠错等级，默认 "M" */
  level?: "L" | "M" | "Q" | "H";
  /** Foreground color / 前景色 */
  fgColor?: string;
  /** Background color / 背景色 */
  bgColor?: string;
  /** Whether to include a quiet zone margin / 是否包含留白边距 */
  includeMargin?: boolean;
  /** Render mode / 渲染模式，默认 "svg" */
  renderAs?: "svg" | "canvas";
}

function QRCode({
  className,
  value,
  size = 128,
  level = "M",
  fgColor = "#000",
  bgColor = "#fff",
  includeMargin = true,
  renderAs = "svg",
  ...props
}: QRCodeProps) {
  const [svgData, setSvgData] = React.useState<string>("");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (renderAs === "svg") {
      qrToString(value, {
        type: "svg",
        width: size,
        margin: includeMargin ? 4 : 0,
        errorCorrectionLevel: level,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      })
        .then((svg: string) => {
          setSvgData(svg);
          setError(undefined);
        })
        .catch((err: { message: string }) => setError(err.message));
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        qrToCanvas(canvas, value, {
          width: size,
          margin: includeMargin ? 4 : 0,
          errorCorrectionLevel: level,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        })
          .then(() => setError(undefined))
          .catch((err: { message: string }) => setError(err.message));
      }
    }
  }, [value, size, level, fgColor, bgColor, includeMargin, renderAs]);

  if (error) {
    return (
      <div
        data-slot="qrcode"
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-destructive/30 bg-destructive/5 text-destructive text-xs",
          className,
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        QR Error
      </div>
    );
  }

  return (
    <div data-slot="qrcode" className={cn("inline-block", className)} {...props}>
      {renderAs === "svg" ? (
        <span
          dangerouslySetInnerHTML={{ __html: svgData }}
          style={{ display: "inline-block", width: size, height: size }}
        />
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  );
}

export { QRCode };
export type { QRCodeProps };
