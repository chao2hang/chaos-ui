"use client";

import * as React from "react";
import {
  QrCodeIcon,
  CheckCircle2Icon,
  CopyIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  KeyIcon,
  AlertTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { OTPField } from "@/components/ui/otp-field";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TwoFactorAuthProps {
  /** Current 2FA status / 当前 2FA 状态 */
  enabled?: boolean;
  /** Whether to render as setup wizard / 是否作为设置向导 */
  setupMode?: boolean;
  /** Called when user completes 2FA setup / 2FA 设置完成回调 */
  onSetupComplete?: (backupCodes: string[]) => void;
  /** Called when user enters 2FA code for verification / 2FA 验证码输入回调 */
  onVerify?: (code: string) => Promise<boolean>;
  /** Called when user requests a new QR code / 请求新 QR 码回调 */
  onGenerateQR?: () => Promise<{ secret: string; qrUrl: string }>;
  /** Called when user disables 2FA / 禁用 2FA */
  onDisable?: () => void;
  /** Generate backup codes (default: 8 codes) / 生成备用码（默认 8 个） */
  generateBackupCodes?: () => string[];
  /** Number of backup codes / 备用码数量 */
  backupCodeCount?: number;
  /** OTP code length / 验证码长度 */
  codeLength?: number;
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateDefaultBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const part1 = Math.random().toString(36).slice(2, 6).toUpperCase();
    const part2 = Math.random().toString(36).slice(2, 6).toUpperCase();
    codes.push(`${part1}-${part2}`);
  }
  return codes;
}

function generateDefaultQR(): { secret: string; qrUrl: string } {
  const secret = Array.from({ length: 16 }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charAt(
      Math.floor(Math.random() * 32),
    ),
  ).join("");
  // Generates a data URL for a placeholder QR (in real usage, this is a proper otpauth:// URL)
  return {
    secret,
    qrUrl: `otpauth://totp/Example:user@example.com?secret=${secret}&issuer=Example`,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type Phase = "setup-intro" | "setup-qr" | "setup-verify" | "setup-done" | "verify" | "disabled";

function TwoFactorAuth({
  enabled = false,
  setupMode = false,
  onSetupComplete,
  onVerify,
  onGenerateQR,
  onDisable,
  generateBackupCodes,
  backupCodeCount = 8,
  codeLength = 6,
  className,
}: TwoFactorAuthProps) {
  // Setup wizard state
  const [phase, setPhase] = React.useState<Phase>(
    enabled && !setupMode ? "verify" : setupMode ? "setup-intro" : "disabled",
  );

  // QR + secret
  const [qrData, setQrData] = React.useState<{
    secret: string;
    qrUrl: string;
  } | null>(null);
  const [showSecret, setShowSecret] = React.useState(false);

  // Verification
  const [, setOtpValue] = React.useState("");
  const [otpError, setOtpError] = React.useState("");
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [, setVerified] = React.useState(false);

  // Backup codes
  const [backupCodes, setBackupCodes] = React.useState<string[]>([]);
  const [copiedCodes, setCopiedCodes] = React.useState(false);

  // Generate QR
  const handleGenerateQR = async () => {
    const data = onGenerateQR
      ? await onGenerateQR()
      : generateDefaultQR();
    setQrData(data);
    setPhase("setup-qr");
  };

  // Verify OTP
  const handleVerify = async (code: string) => {
    setOtpValue(code);
    setOtpError("");

    if (code !== code) return; // TypeScript guard

    try {
      setOtpLoading(true);
      const isValid = onVerify
        ? await onVerify(code)
        : code === "123456"; // Default test code

      if (isValid) {
        setVerified(true);
        const codes = generateBackupCodes
          ? generateBackupCodes()
          : generateDefaultBackupCodes(backupCodeCount);
        setBackupCodes(codes);
        setPhase("setup-done");
      } else {
        setOtpError("验证码错误，请重试");
        setOtpValue("");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  // Complete setup
  const handleComplete = () => {
    onSetupComplete?.(backupCodes);
  };

  // Copy backup codes
  const handleCopyCodes = async () => {
    const text = backupCodes.join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 3000);
  };

  // Disable 2FA
  const handleDisable = () => {
    onDisable?.();
    setPhase("disabled");
    setVerified(false);
  };

  // ===== Phase: Disabled =====
  if (phase === "disabled") {
    return (
      <div
        data-slot="two-factor-auth"
        className={cn(
          "rounded-lg border p-6 text-center",
          className,
        )}
      >
        <ShieldCheckIcon className="mx-auto size-12 text-muted-foreground" />
        <h3 className="mt-3 text-lg font-semibold">未启用两步验证</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          启用两步验证可增强账户安全性
        </p>
        <button
          type="button"
          onClick={() => setPhase("setup-intro")}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
            "hover:bg-primary/90 transition-colors",
          )}
        >
          立即启用
        </button>
      </div>
    );
  }

  // ===== Phase: Verify (login flow) =====
  if (phase === "verify") {
    return (
      <div
        data-slot="two-factor-auth"
        className={cn(
          "rounded-lg border p-6",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">两步验证</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          请输入你的验证器应用中的 6 位验证码
        </p>
        <div className="mt-4 flex flex-col items-center gap-3">
          <OTPField
            length={codeLength}
            onValueChange={(v) => {
              setOtpValue(v);
              setOtpError("");
              if (v.length === codeLength) {
                handleVerify(v);
              }
            }}
            className="justify-center"
          />
          {otpError && (
            <p className="text-sm text-red-500">{otpError}</p>
          )}
          {otpLoading && (
            <p className="text-sm text-muted-foreground">验证中...</p>
          )}
        </div>
        <div className="mt-4 border-t pt-3 text-center">
          <button
            type="button"
            disabled={otpLoading}
            onClick={handleDisable}
            className="text-xs text-muted-foreground underline hover:text-foreground"
          >
            无法访问验证器？使用备用码
          </button>
        </div>
      </div>
    );
  }

  // ===== Phase: Setup Intro =====
  if (phase === "setup-intro") {
    return (
      <div
        data-slot="two-factor-auth"
        className={cn(
          "rounded-lg border p-6",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <QrCodeIcon className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">设置两步验证</h3>
        </div>
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <p>两步验证可为你的账户提供额外的安全保护。</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>在手机上安装验证器应用（如 Google Authenticator、Microsoft Authenticator）</li>
            <li>扫描下方二维码或手动输入密钥</li>
            <li>输入验证器中的 6 位验证码完成激活</li>
          </ol>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleGenerateQR}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
            )}
          >
            开始设置
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  // ===== Phase: Setup QR =====
  if (phase === "setup-qr" && qrData) {
    return (
      <div
        data-slot="two-factor-auth"
        className={cn(
          "rounded-lg border p-6",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPhase("setup-intro")}
            className="rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          <h3 className="text-lg font-semibold">扫描二维码</h3>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            2/3
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          使用验证器应用扫描二维码，或手动输入密钥
        </p>

        <div className="mt-4 flex flex-col items-center gap-4">
          {/* QR code placeholder */}
          <div className="flex size-44 items-center justify-center rounded-lg border bg-white p-3">
            <QrCodeIcon className="size-24 text-muted-foreground/30" />
          </div>

          {/* Secret key */}
          <div className="w-full max-w-xs rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">密钥</span>
              <button
                type="button"
                onClick={() => setShowSecret((s) => !s)}
                className="text-xs text-primary hover:underline"
              >
                {showSecret ? "隐藏" : "显示"}
              </button>
            </div>
            <div className="mt-1 font-mono text-sm tracking-wider">
              {showSecret
                ? qrData.secret.match(/.{1,4}/g)?.join(" ") ?? qrData.secret
                : "•••• •••• •••• ••••"}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => handleGenerateQR()}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm",
              "hover:bg-muted transition-colors",
            )}
          >
            <RefreshCwIcon className="size-3.5" />
            刷新
          </button>
          <button
            type="button"
            onClick={() => setPhase("setup-verify")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
            )}
          >
            下一步
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  // ===== Phase: Setup Verify =====
  if (phase === "setup-verify") {
    return (
      <div
        data-slot="two-factor-auth"
        className={cn(
          "rounded-lg border p-6",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPhase("setup-qr")}
            className="rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          <h3 className="text-lg font-semibold">验证激活</h3>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            3/3
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          输入验证器应用中的 6 位验证码以完成激活
        </p>
        <div className="mt-4 flex flex-col items-center gap-3">
          <OTPField
            length={codeLength}
            onValueChange={(v) => {
              setOtpValue(v);
              setOtpError("");
              if (v.length === codeLength) {
                handleVerify(v);
              }
            }}
            className="justify-center"
          />
          {otpError && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertTriangleIcon className="size-3.5" />
              {otpError}
            </div>
          )}
          {otpLoading && (
            <p className="text-sm text-muted-foreground">验证中...</p>
          )}
        </div>
      </div>
    );
  }

  // ===== Phase: Setup Done (backup codes) =====
  if (phase === "setup-done") {
    return (
      <div
        data-slot="two-factor-auth"
        className={cn(
          "rounded-lg border p-6",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="size-5 text-green-500" />
          <h3 className="text-lg font-semibold">两步验证已启用</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          已成功激活两步验证，请妥善保管备用恢复码
        </p>

        <div className="mt-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <KeyIcon className="size-4 text-amber-500" />
              <span className="text-sm font-medium">备用恢复码</span>
            </div>
            <button
              type="button"
              onClick={handleCopyCodes}
              className={cn(
                "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs",
                "border hover:bg-muted transition-colors",
              )}
            >
              <CopyIcon className="size-3" />
              {copiedCodes ? "已复制" : "全部复制"}
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {backupCodes.map((code, i) => (
              <code
                key={i}
                className="rounded bg-background px-2 py-0.5 text-xs font-mono text-muted-foreground"
              >
                {code}
              </code>
            ))}
          </div>
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
            ⚠ 每个恢复码只能使用一次，请妥善保管。如果丢失验证器，可使用恢复码登录。
          </p>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleDisable}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-red-500",
              "hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors",
            )}
          >
            关闭两步验证
          </button>
          <button
            type="button"
            onClick={handleComplete}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
            )}
          >
            <CheckCircle2Icon className="size-4" />
            完成
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export { TwoFactorAuth, generateDefaultBackupCodes };
export type { TwoFactorAuthProps };
