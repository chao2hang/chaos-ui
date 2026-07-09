"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A single password policy rule.
 */
interface PolicyRule {
  /** Unique rule key / 唯一规则键 */
  key: string;
  /** Display label / 显示标签 */
  label: string;
  /** Test function for the rule / 规则测试函数 */
  test: (password: string) => boolean;
  /** Severity level / 严重级别 */
  level?: "error" | "warn" | "info";
}

/**
 * Props for the PasswordPolicyValidator component.
 */
interface PasswordPolicyValidatorProps {
  /** Password string to validate / 要验证的密码字符串 */
  password: string;
  /** Custom rules (default: standard rules) / 自定义规则 */
  rules?: PolicyRule[];
  /** Additional className / 额外类名 */
  className?: string;
  /** Show password strength score (default: true) / 是否显示强度评分 */
  showScore?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Default rules                                                     */
/* ------------------------------------------------------------------ */

const DEFAULT_RULES: PolicyRule[] = [
  {
    key: "min-length",
    label: "至少 8 个字符",
    test: (p) => p.length >= 8,
    level: "error",
  },
  {
    key: "uppercase",
    label: "包含大写字母 (A-Z)",
    test: (p) => /[A-Z]/.test(p),
    level: "error",
  },
  {
    key: "lowercase",
    label: "包含小写字母 (a-z)",
    test: (p) => /[a-z]/.test(p),
    level: "error",
  },
  {
    key: "number",
    label: "包含数字 (0-9)",
    test: (p) => /\d/.test(p),
    level: "error",
  },
  {
    key: "special-char",
    label: "包含特殊字符 (!@#$%^&*...)",
    test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p),
    level: "error",
  },
];

/* ------------------------------------------------------------------ */
/*  Password strength scoring                                         */
/* ------------------------------------------------------------------ */

function calculateScore(password: string, rules: PolicyRule[]): number {
  if (!password) return 0;
  const passed = rules.filter((r) => r.test(password)).length;
  const ratio = passed / rules.length;

  // Bonus for length
  let bonus = 0;
  if (password.length >= 12) bonus += 0.1;
  if (password.length >= 16) bonus += 0.1;

  return Math.min(1, ratio + bonus);
}

const SCORE_LABELS = ["很弱", "弱", "一般", "强", "很强"];
const SCORE_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-emerald-600",
];

/* ------------------------------------------------------------------ */
/*  PasswordPolicyValidator - main export                             */
/* ------------------------------------------------------------------ */

/**
 * @component PasswordPolicyValidator
 * @category ui/data-entry
 * @since 0.2.0
 * @description Password policy checker with real-time feedback. Shows
 *   a checklist with check/x icons for each rule and an optional
 *   strength score bar. Green for pass, red for fail. / 密码策略检查器，
 *   实时反馈。显示每条规则的勾选/错误清单和可选的强度评分条。通过为绿色，
 *   失败为红色。
 * @keywords password, policy, validator, strength, checker, security, rule
 * @example
 * ```tsx
 * <PasswordPolicyValidator
 *   password={pwd}
 *   showScore
 * />
 * ```
 */
function PasswordPolicyValidator({
  password,
  rules = DEFAULT_RULES,
  className,
  showScore = true,
}: PasswordPolicyValidatorProps) {
  const results = React.useMemo(
    () =>
      rules.map((rule) => ({
        ...rule,
        passed: rule.test(password),
      })),
    [password, rules],
  );

  const score = React.useMemo(
    () => calculateScore(password, rules),
    [password, rules],
  );

  const scoreIdx = Math.min(Math.floor(score * 5), 4);
  const allPassed = results.every((r) => r.passed);

  return (
    <div
      data-slot="password-policy-validator"
      className={cn("flex flex-col gap-3", className)}
    >
      {/* Strength score bar */}
      {showScore && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">密码强度</span>
            <span
              className={cn(
                "font-medium",
                scoreIdx <= 1
                  ? "text-red-500"
                  : scoreIdx === 2
                    ? "text-yellow-500"
                    : "text-green-500",
              )}
            >
              {password ? SCORE_LABELS[scoreIdx] : "—"}
            </span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  idx <= scoreIdx && password
                    ? SCORE_COLORS[scoreIdx]
                    : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Rule checklist */}
      <div className="flex flex-col gap-1.5">
        {results.map((result) => (
          <div
            key={result.key}
            data-slot="password-policy-rule"
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              !password && "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "inline-flex size-4 shrink-0 items-center justify-center rounded-full",
                result.passed
                  ? "bg-green-500/10 text-green-600"
                  : password
                    ? "bg-red-500/10 text-red-600"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {result.passed ? (
                <CheckIcon className="size-3" />
              ) : (
                <XIcon className="size-3" />
              )}
            </span>
            <span
              className={cn(
                result.passed
                  ? "text-green-600"
                  : password
                    ? "text-red-600"
                    : "text-muted-foreground",
              )}
            >
              {result.label}
            </span>
          </div>
        ))}
      </div>

      {/* All passed indicator */}
      {allPassed && password && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
          <CheckIcon className="size-3.5" />
          密码符合所有要求
        </div>
      )}
    </div>
  );
}

export { PasswordPolicyValidator };
export type { PolicyRule, PasswordPolicyValidatorProps };
