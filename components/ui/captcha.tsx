"use client";

import * as React from "react";
import { RefreshCwIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @component Captcha
 * @category ui/data-entry
 * @since 1.1.0
 * @description 图形验证码组件，包含随机生成的验证码画布、输入框和刷新按钮。常用于登录、注册、表单提交等需要人机验证的场景。
 *   Visual captcha component with a randomly generated code rendered on canvas,
 *   an input field, and a refresh button. Common in login, registration, and
 *   form-submission scenarios.
 * @keywords captcha, verification, code, image, canvas, anti-bot, 验证码, 图形验证码, 人机验证
 * @example
 * <Captcha onVerify={(valid) => console.log(valid)} />
 */

/**
 * Generate a random captcha code of the given length.
 * Uses uppercase letters and digits, excluding easily confused characters (O/0/I/1/L).
 */
function generateCode(length: number): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * Draw the captcha code onto a canvas with noise, random colors, and distortion.
 */
function drawCaptcha(
  canvas: HTMLCanvasElement,
  code: string,
  options?: CaptchaVisualOptions,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Background with slight gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, options?.bgColor ?? "#f8f9fa");
  bgGrad.addColorStop(1, "#e9ecef");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Noise lines (interference)
  const noiseCount = options?.noiseLines ?? 3;
  for (let i = 0; i < noiseCount; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(${rand(100, 200)}, ${rand(100, 200)}, ${rand(100, 200)}, 0.4)`;
    ctx.lineWidth = rand(1, 2);
    ctx.stroke();
  }

  // Noise dots
  const dotCount = options?.noiseDots ?? 30;
  for (let i = 0; i < dotCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = `rgba(${rand(100, 200)}, ${rand(100, 200)}, ${rand(100, 200)}, 0.3)`;
    ctx.fillRect(x, y, rand(1, 3), rand(1, 3));
  }

  // Draw each character with random rotation and offset
  const fontSize = options?.fontSize ?? 28;
  const charWidth = width / code.length;
  ctx.textBaseline = "middle";

  for (let i = 0; i < code.length; i++) {
    const char = code[i] ?? "";
    const x = charWidth * i + charWidth / 2 + rand(-4, 4);
    const y = height / 2 + rand(-6, 6);
    const rotation = ((Math.random() - 0.5) * Math.PI) / 6; // -30 to +30 degrees

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.font = `bold ${fontSize}px ${options?.fontFamily ?? "monospace"}`;
    ctx.fillStyle =
      options?.textColor ??
      `rgb(${rand(20, 100)}, ${rand(20, 100)}, ${rand(80, 180)})`;
    ctx.fillText(char, -fontSize / 3, 0);

    ctx.restore();
  }
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface CaptchaVisualOptions {
  /** Canvas background color */
  bgColor?: string;
  /** Character font size */
  fontSize?: number;
  /** Character font family */
  fontFamily?: string;
  /** Character text color */
  textColor?: string;
  /** Number of noise lines */
  noiseLines?: number;
  /** Number of noise dots */
  noiseDots?: number;
}

interface CaptchaProps {
  /** Code length / 验证码长度，默认 4 */
  length?: number;
  /** Canvas width / 画布宽度 */
  canvasWidth?: number;
  /** Canvas height / 画布高度 */
  canvasHeight?: number;
  /** Visual customization / 视觉自定义选项 */
  visualOptions?: CaptchaVisualOptions;
  /** Called when user submits a verification attempt / 用户提交验证时回调 */
  onVerify?: (valid: boolean) => void;
  /** Called when the captcha code changes (refresh or initial) / 验证码变更时回调 */
  onCodeChange?: (code: string) => void;
  /** Placeholder text for the input / 输入框占位文字 */
  placeholder?: string;
  /** Whether the input is disabled / 是否禁用 */
  disabled?: boolean;
  /** Additional class for the wrapper / 外层容器类名 */
  className?: string;
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg";
  /** Whether to auto-refresh on mount / 是否挂载时自动刷新 */
  autoRefresh?: boolean;
}

function Captcha({
  length = 4,
  canvasWidth = 140,
  canvasHeight = 50,
  visualOptions,
  onVerify,
  onCodeChange,
  placeholder = "请输入验证码",
  disabled = false,
  className,
  size = "default",
  autoRefresh = true,
}: CaptchaProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [code, setCode] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "success" | "error" | "refreshing"
  >("idle");

  const refresh = React.useCallback(() => {
    const newCode = generateCode(length);
    setCode(newCode);
    setInputValue("");
    setStatus("refreshing");
    onCodeChange?.(newCode);

    // Draw after a microtask to ensure canvas is available
    requestAnimationFrame(() => {
      if (canvasRef.current) {
        drawCaptcha(canvasRef.current, newCode, visualOptions);
      }
      setStatus("idle");
    });
  }, [length, visualOptions, onCodeChange]);

  // Auto-refresh on mount
  React.useEffect(() => {
    if (autoRefresh) {
      refresh();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInputValue(val);
    setStatus("idle");

    if (val.length === length) {
      const valid = val === code;
      setStatus(valid ? "success" : "error");
      onVerify?.(valid);
      if (!valid) {
        // Auto-refresh on wrong answer
        setTimeout(() => refresh(), 1200);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.length > 0) {
      const valid = inputValue === code;
      setStatus(valid ? "success" : "error");
      onVerify?.(valid);
      if (!valid) {
        setTimeout(() => refresh(), 1200);
      }
    }
  };

  const sizeClass =
    size === "sm"
      ? "h-7 text-xs"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

  return (
    <div
      data-slot="captcha"
      className={cn("inline-flex flex-col gap-2", disabled && "opacity-50", className)}
    >
      <div className="flex items-center gap-2">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className={cn(
            "rounded-lg border border-input",
            status === "success" && "ring-2 ring-green-400",
            status === "error" && "ring-2 ring-red-400",
          )}
        />
        <button
          type="button"
          onClick={refresh}
          disabled={disabled}
          className={cn(
            "flex size-8 items-center justify-center rounded-lg border border-input",
            "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            "disabled:cursor-not-allowed",
          )}
          aria-label="Refresh captcha"
          title="换一张"
        >
          <RefreshCwIcon
            className={cn("size-4", status === "refreshing" && "animate-spin")}
          />
        </button>
      </div>
      <div className="relative flex items-center gap-1.5">
        <input
          ref={inputRef}
          type="text"
          maxLength={length}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || status === "success"}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={cn(
            "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1",
            "text-center uppercase tracking-[0.3em] transition-colors outline-none",
            "placeholder:text-muted-foreground",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:bg-input/50",
            "dark:bg-input/30 dark:disabled:bg-input/80",
            sizeClass,
            status === "success" && "border-green-400 focus-visible:ring-green-400/50",
            status === "error" && "border-red-400 focus-visible:ring-red-400/50",
          )}
        />
      </div>
      {status === "success" && (
        <p className="text-xs text-green-600">验证通过</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-500">验证码错误，请重试</p>
      )}
    </div>
  );
}

export { Captcha, generateCode };
export type { CaptchaProps, CaptchaVisualOptions };
