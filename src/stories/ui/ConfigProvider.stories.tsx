import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  ConfigProvider,
  type ThemeConfig,
} from "@/components/ui/config-provider";
import { Button } from "@/components/ui/button";

// ============================================================
// Interactive demo wrapper — stateful controls + preview area
// ============================================================

/** Interactive theme playground: click controls to see ConfigProvider cascade changes into children. */
function InteractivePlayground() {
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [borderRadius, setBorderRadius] = useState(8);
  const [darkMode, setDarkMode] = useState(false);
  const [locale, setLocale] = useState("zh-CN");

  const theme: ThemeConfig = { primaryColor, borderRadius, darkMode };

  const colorSwatches = [
    { label: "默认", color: "#6366f1" },
    { label: "翡翠绿", color: "oklch(0.62 0.18 152)" },
    { label: "琥珀", color: "oklch(0.70 0.16 85)" },
    { label: "玫红", color: "oklch(0.55 0.22 0)" },
    { label: "青蓝", color: "oklch(0.58 0.14 240)" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="bg-card flex flex-wrap items-center gap-2 rounded-lg border p-3">
        <span className="text-muted-foreground text-xs font-medium">主色:</span>
        {colorSwatches.map((sw) => (
          <button
            key={sw.color}
            type="button"
            onClick={() => setPrimaryColor(sw.color)}
            className="relative size-6 rounded-full border-2 transition-shadow hover:scale-110"
            style={{
              backgroundColor: sw.color,
              borderColor:
                primaryColor === sw.color ? "var(--foreground)" : "transparent",
              boxShadow:
                primaryColor === sw.color
                  ? "0 0 0 2px var(--background), 0 0 0 4px currentColor"
                  : undefined,
            }}
            title={sw.label}
          >
            <span className="sr-only">{sw.label}</span>
          </button>
        ))}
        <span className="text-border mx-2 text-xs">|</span>
        <span className="text-muted-foreground text-xs font-medium">圆角:</span>
        {[4, 8, 12, 16].map((r) => (
          <Button
            key={r}
            size="xs"
            variant={borderRadius === r ? "default" : "outline"}
            onClick={() => setBorderRadius(r)}
          >
            {r}px
          </Button>
        ))}
        <span className="text-border mx-2 text-xs">|</span>
        <Button
          size="xs"
          variant={darkMode ? "default" : "outline"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ 亮色" : "🌙 暗色"}
        </Button>
        <span className="text-border mx-2 text-xs">|</span>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setLocale(locale === "zh-CN" ? "en-US" : "zh-CN")}
        >
          {locale}
        </Button>
      </div>

      {/* Preview — wrapped in ConfigProvider, cascade takes effect here */}
      <ConfigProvider locale={locale} theme={theme}>
        <div className="bg-card rounded-lg border p-5">
          <p className="mb-3 text-sm font-medium">
            {darkMode ? "🌙 暗色模式" : "☀️ 亮色模式"} · 主色:{" "}
            <code className="bg-muted rounded px-1 text-xs">
              {primaryColor}
            </code>{" "}
            · 圆角:{" "}
            <code className="bg-muted rounded px-1 text-xs">
              {borderRadius}px
            </code>{" "}
            · 语言:{" "}
            <code className="bg-muted rounded px-1 text-xs">{locale}</code>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <p className="text-muted-foreground mt-3 text-xs">
            按钮颜色随主色变化 · 圆角随 borderRadius 变化 · 图案随暗色模式变化
          </p>
        </div>
      </ConfigProvider>
    </div>
  );
}

// ============================================================
// Stories
// ============================================================

const meta = {
  title: "Components/ConfigProvider",
  component: ConfigProvider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { children: null },
} satisfies Meta<typeof ConfigProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 交互式主题游乐场 — 点击控件观察主题变化 / Interactive theme playground — click controls to see theme cascade. */
export const Preview: Story = {
  render: () => <InteractivePlayground />,
};

/** 默认无覆盖 — 组件使用 CSS 默认 token / Default: no overrides — components use CSS tokens. */
export const Default: Story = {
  render: () => (
    <ConfigProvider>
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </ConfigProvider>
  ),
};

/** 自定义主题色 + 圆角 / Custom primary color + radius via CSS variables. */
export const CustomTheme: Story = {
  render: () => (
    <ConfigProvider
      theme={{ primaryColor: "oklch(0.62 0.18 152)", borderRadius: 12 }}
    >
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </ConfigProvider>
  ),
};

/** 暗色模式 / Dark mode. */
export const DarkMode: Story = {
  render: () => (
    <ConfigProvider theme={{ darkMode: true }}>
      <div className="bg-card rounded-lg border p-4">
        <p className="mb-2 text-sm font-medium">Dark mode active</p>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>
    </ConfigProvider>
  ),
};

/** 细滚动条 / Thin scrollbar. */
export const ThinScrollbars: Story = {
  render: () => (
    <ConfigProvider theme={{ scrollbar: "thin" }}>
      <div className="h-40 overflow-y-scroll rounded-lg border p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="py-0.5 text-sm">
            Item {i + 1} — 滚动以查看细滚动条效果
          </p>
        ))}
      </div>
    </ConfigProvider>
  ),
};

/** RTL 方向 / Right-to-left direction. */
export const RightToLeft: Story = {
  render: () => (
    <ConfigProvider direction="rtl">
      <div dir="rtl" className="rounded-lg border p-4">
        <p className="mb-2 text-sm font-medium">RTL Container</p>
        <p className="text-muted-foreground text-sm">
          المحتوى والضوابط تقرأ من اليمين إلى اليسار.
        </p>
        <div className="mt-2 flex gap-2">
          <Button>زر ١</Button>
          <Button variant="outline">زر ٢</Button>
        </div>
      </div>
    </ConfigProvider>
  ),
};
