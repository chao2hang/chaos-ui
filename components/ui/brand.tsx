import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component AppLogo
 * @category ui/branding
 * @since 1.2.0
 * @description Application logo with gradient background support. Renders a
 * square (or custom-size) rounded container with an optional gradient fill,
 * an icon/letter, and an optional label.
 * / 应用 Logo，支持渐变背景、图标和文字标签。
 * @keywords logo, brand, gradient, icon, avatar
 * @example
 * <AppLogo text="C" gradient="teal" />
 * <AppLogo icon={<MyIcon />} gradient="brand" size={48} />
 */
interface AppLogoProps extends React.ComponentProps<"div"> {
  /** Logo content — text, icon, or any ReactNode. / Logo 内容（文字/图标） */
  children?: React.ReactNode;
  /** Short text fallback (ignored if children provided). / 短文字 */
  text?: string;
  /** Icon node (ignored if children provided). / 图标 */
  icon?: React.ReactNode;
  /** Logo size in px. / 尺寸 */
  size?: number;
  /** Gradient preset or custom CSS gradient string. / 渐变预设或自定义 CSS */
  gradient?:
    | "brand"
    | "teal"
    | "blue"
    | "purple"
    | "sunset"
    | "forest"
    | "ocean"
    | "mono"
    | string;
  /** Corner radius. / 圆角 */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /** Show a text label next to the logo. / 是否显示文字标签 */
  label?: React.ReactNode;
  /** Label position relative to logo. / 标签位置 */
  labelPosition?: "right" | "bottom";
  /** Label font size class. / 标签字体大小类名 */
  labelClassName?: string;
}

const gradientPresets: Record<string, string> = {
  brand: "from-primary to-primary/70",
  teal: "from-teal-500 to-emerald-600",
  blue: "from-blue-500 to-indigo-600",
  purple: "from-purple-500 to-fuchsia-600",
  sunset: "from-orange-500 to-rose-600",
  forest: "from-green-500 to-teal-700",
  ocean: "from-cyan-500 to-blue-700",
  mono: "from-slate-700 to-slate-900",
};

const roundedMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

function AppLogo({
  children,
  text,
  icon,
  size = 48,
  gradient = "brand",
  rounded = "xl",
  label,
  labelPosition = "right",
  labelClassName,
  className,
  ...props
}: AppLogoProps) {
  const isPreset = gradient in gradientPresets;
  const gradientStyle = isPreset ? undefined : { backgroundImage: gradient };
  const gradientClass = isPreset ? gradientPresets[gradient] : "";
  const roundedClass = roundedMap[rounded];

  const logoEl = (
    <div
      data-slot="app-logo"
      className={cn(
        "flex shrink-0 items-center justify-center bg-gradient-to-br font-bold text-white",
        gradientClass,
        roundedClass,
        className,
      )}
      style={{ width: size, height: size, ...gradientStyle }}
      {...props}
    >
      {children ?? icon ?? text}
    </div>
  );

  if (label == null) return logoEl;

  return (
    <div
      data-slot="app-logo-wrapper"
      className={cn(
        "flex items-center gap-3",
        labelPosition === "bottom" && "flex-col gap-1",
      )}
    >
      {logoEl}
      {labelPosition === "bottom" ? (
        <span className={cn("text-sm font-semibold", labelClassName)}>
          {label}
        </span>
      ) : (
        <span className={cn("text-lg font-semibold", labelClassName)}>
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * @component BrandBadge
 * @category ui/branding
 * @since 1.2.0
 * @description Compact brand badge — a small pill or rounded square with
 * gradient background, ideal for navigation headers, sidebar logos, and
 * compact brand indicators.
 * / 紧凑品牌徽章，支持渐变背景，适用于导航栏、侧栏等紧凑场景。
 * @keywords badge, brand, logo, pill, gradient
 * @example
 * <BrandBadge text="Chaos" gradient="teal" size="sm" />
 */
interface BrandBadgeProps extends React.ComponentProps<"div"> {
  /** Badge content — text, icon, or any ReactNode. / 徽章内容 */
  children?: React.ReactNode;
  /** Short text (ignored if children provided). / 短文字 */
  text?: string;
  /** Icon node (ignored if children provided). / 图标 */
  icon?: React.ReactNode;
  /** Badge size. / 徽章大小 */
  size?: "xs" | "sm" | "md" | "lg";
  /** Gradient preset or custom CSS gradient string. / 渐变预设或自定义 CSS */
  gradient?:
    | "brand"
    | "teal"
    | "blue"
    | "purple"
    | "sunset"
    | "forest"
    | "ocean"
    | "mono"
    | string;
  /** Badge shape. / 徽章形状 */
  variant?: "square" | "pill" | "circle";
  /** Optional label text appended after the badge. / 附加文字标签 */
  label?: React.ReactNode;
  /** Label class name. / 标签样式 */
  labelClassName?: string;
}

const badgeSizeMap: Record<string, { box: string; text: string }> = {
  xs: { box: "size-5 text-[10px]", text: "text-xs" },
  sm: { box: "size-7 text-xs", text: "text-sm" },
  md: { box: "size-9 text-sm", text: "text-base" },
  lg: { box: "size-12 text-lg", text: "text-lg" },
};

const badgeShapeMap: Record<string, string> = {
  square: "rounded-lg",
  pill: "rounded-full",
  circle: "rounded-full",
};

function BrandBadge({
  children,
  text,
  icon,
  size = "md",
  gradient = "brand",
  variant = "square",
  label,
  labelClassName,
  className,
  ...props
}: BrandBadgeProps) {
  const isPreset = gradient in gradientPresets;
  const gradientStyle = isPreset ? undefined : { backgroundImage: gradient };
  const gradientClass = isPreset ? gradientPresets[gradient] : "";
  const sizeConfig: { box: string; text: string } = badgeSizeMap[size] ?? {
    box: "size-9 text-sm",
    text: "text-base",
  };

  const badgeEl = (
    <div
      data-slot="brand-badge"
      className={cn(
        "flex shrink-0 items-center justify-center bg-gradient-to-br font-bold text-white",
        gradientClass,
        sizeConfig.box,
        badgeShapeMap[variant],
        className,
      )}
      style={gradientStyle}
      {...props}
    >
      {children ?? icon ?? text}
    </div>
  );

  if (label == null) return badgeEl;

  return (
    <div data-slot="brand-badge-wrapper" className="flex items-center gap-2">
      {badgeEl}
      <span className={cn("font-semibold", sizeConfig.text, labelClassName)}>
        {label}
      </span>
    </div>
  );
}

export { AppLogo, BrandBadge };
export type { AppLogoProps, BrandBadgeProps };
