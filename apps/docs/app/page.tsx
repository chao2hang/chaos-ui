import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Package,
  Puzzle,
  Layers,
  Palette,
  Globe,
  ShieldCheck,
  TreePine,
  Command,
  Blocks,
  Zap,
  Sparkles,
  Wand2,
  Monitor,
} from "lucide-react";
import { InstallTabs } from "@/components/install-tabs";

/* -------------------------------------------------------------------------- */
/*  Hero Stats
/* -------------------------------------------------------------------------- */

const stats = [
  { value: "148+", label: "Components", labelZh: "组件" },
  { value: "19", label: "Hooks", labelZh: "钩子" },
  { value: "5", label: "Utility Modules", labelZh: "工具模块" },
  { value: "8", label: "Subpath Exports", labelZh: "子路径导出" },
];

/* -------------------------------------------------------------------------- */
/*  Feature Cards
/* -------------------------------------------------------------------------- */

const features = [
  {
    icon: ShieldCheck,
    title: "TypeScript 类型安全",
    titleEn: "Type-safe",
    desc: "完整的 TypeScript 类型定义，严格模式启用，体验流畅的智能提示和编译期检查。",
    descEn:
      "Full TypeScript definitions with strict mode enabled — enjoy seamless IntelliSense and compile-time checks.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS 4 主题",
    titleEn: "Tailwind CSS 4 Theming",
    desc: "基于 CSS 变量的全主题系统，OKLCH 色彩空间，支持自定义品牌色和语义化 token。",
    descEn:
      "CSS-variable-based theme system with OKLCH color space. Custom brand colors and semantic tokens.",
  },
  {
    icon: Monitor,
    title: "暗色模式内置",
    titleEn: "Dark Mode Built-in",
    desc: "开箱即用的暗色模式，基于 .dark class 切换，支持系统偏好自动跟随。",
    descEn:
      "Dark mode out of the box via .dark class toggle, with system preference auto-detection.",
  },
  {
    icon: Globe,
    title: "国际化双语文档",
    titleEn: "i18n & Bilingual Docs",
    desc: "中英文文档同步维护，内置 13 个 i18n 命名空间，覆盖常用、图表、通知等场景。",
    descEn:
      "Chinese & English docs maintained in sync. 13 i18n namespaces covering common, chart, notification and more.",
  },
  {
    icon: Wand2,
    title: "WCAG 2.1 AA 可访问性",
    titleEn: "WCAG 2.1 AA Accessibility",
    desc: "遵循 WCAG 2.1 AA 标准，完善的 ARIA 属性、键盘导航、屏幕阅读器支持。",
    descEn:
      "WCAG 2.1 AA compliant with ARIA attributes, keyboard navigation, and screen reader support.",
  },
  {
    icon: TreePine,
    title: "Tree-shaking 子路径",
    titleEn: "Tree-shaking Subpaths",
    desc: "8 个独立导出入口，按需引入，打包体积优化，ESM + CJS 双格式。",
    descEn:
      "8 independent entry points for tree-shaking. Import only what you need. ESM + CJS dual format.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component Category Cards
/* -------------------------------------------------------------------------- */

const categories = [
  {
    icon: Puzzle,
    title: "UI Primitives 基础组件",
    count: "60+",
    items: [
      "Button",
      "Dialog",
      "Table",
      "Select",
      "DatePicker",
      "Form",
      "Tabs",
      "Sheet",
      "Command",
      "Toast",
    ],
    desc: "基于 @base-ui/react 的无障碍底层组件，覆盖表单、数据展示、导航、反馈等全场景。",
    gradient: "from-brand-500/10 to-brand-600/5",
  },
  {
    icon: Blocks,
    title: "Business 业务组件",
    count: "80+",
    items: [
      "DataTable",
      "CampaignCard",
      "ApprovalFlow",
      "AuditLog",
      "ChatMessage",
      "OrgChart",
      "WorkflowDesigner",
      "DashboardCanvas",
      "BatchSelector",
      "ReportBuilder",
    ],
    desc: "面向 ERP 和营销平台的领域组件，涵盖审批流、聊天、报表、仪表盘等垂直场景。",
    gradient: "from-emerald-500/10 to-teal-500/5",
  },
  {
    icon: Layers,
    title: "Layout 布局组件",
    count: "15+",
    items: [
      "AdminShell",
      "AppShell",
      "DashboardLayout",
      "MasterDetailLayout",
      "SplitScreen",
      "WizardLayout",
    ],
    desc: "管理后台、工作台、详情页的布局方案，支持侧边栏、面包屑、标签页等常见布局模式。",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ================================================================ */}
      {/*  HERO                                                           */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/40 via-background to-background dark:from-brand-950/30 dark:via-background dark:to-background" />
          <div className="absolute right-0 top-0 size-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/5 blur-3xl dark:bg-brand-400/5" />
          <div className="absolute bottom-0 left-0 size-[400px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-400/5 blur-3xl dark:bg-brand-600/5" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1 text-xs">
              <Sparkles className="size-3" />
              v1.0.0 — Now Available
            </Badge>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              企业级 React 组件库
              <br />
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent dark:from-brand-400 dark:to-brand-600">
                Chaos UI
              </span>
            </h1>

            <p className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              面向 ERP & 业务系统的企业级 React 19 组件库。
              148+ 组件、19 Hooks、5 工具模块，基于 Tailwind CSS 4 和 shadcn/ui 构建。
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#install">
                <Button size="lg" className="h-12 gap-2 px-8 text-base">
                  快速开始
                  <ArrowRight className="size-4" />
                </Button>
              </a>
              <a href="/storybook" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base">
                  <Command className="size-4" />
                  浏览组件
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-xl border bg-card/50 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.labelZh} · {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  INSTALL                                                         */}
      {/* ================================================================ */}
      <section id="install" className="bg-surface/50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                <Zap className="mr-1 size-3" />
                三步上手
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                安装 & 快速开始
              </h2>
              <p className="mt-4 text-muted-foreground">
                选择你喜欢的包管理器，一行命令安装，立即开始使用。
              </p>
            </div>

            <div className="mt-10">
              <InstallTabs />
            </div>

            {/* Subpath exports */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "@qxyfoods/chaos-ui/ui",
                "@qxyfoods/chaos-ui/business",
                "@qxyfoods/chaos-ui/hooks",
                "@qxyfoods/chaos-ui/lib",
                "@qxyfoods/chaos-ui/next",
                "@qxyfoods/chaos-ui/ui-icons",
                "@qxyfoods/chaos-ui/styles.css",
                "@qxyfoods/chaos-ui/ui/icons",
              ].map((path) => (
                <code
                  key={path}
                  className="rounded-md border bg-muted/50 px-3 py-2 text-xs text-muted-foreground"
                >
                  {path}
                </code>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FEATURES                                                        */}
      {/* ================================================================ */}
      <section id="features" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              为什么选择 Chaos UI
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              为现代企业级应用而设计
            </h2>
            <p className="mt-4 text-muted-foreground">
              从类型安全到暗色模式，从国际化到可访问性 — 每个细节都经过精心打磨。
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group border-border/60">
                <CardHeader>
                  <feature.icon className="mb-2 size-8 text-brand-500 dark:text-brand-400" />
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  COMPONENT CATEGORIES                                            */}
      {/* ================================================================ */}
      <section id="components" className="bg-surface/50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Package className="mr-1 size-3" />
              组件概览
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              三大类别，全面覆盖
            </h2>
            <p className="mt-4 text-muted-foreground">
              从基础 UI 到业务场景，从布局框架到交互模式 — 应有尽有。
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {categories.map((cat) => (
              <Card
                key={cat.title}
                className="relative overflow-hidden border-border/60"
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${cat.gradient}`}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <cat.icon className="size-6 text-foreground/70" />
                    <Badge variant="outline" className="text-xs">
                      {cat.count}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{cat.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {cat.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex size-6 items-center justify-center rounded-md bg-brand-500 text-[10px] font-bold text-white">
              C
            </span>
            <span>
              Chaos UI · Built by{" "}
              <a
                href="https://github.com/qxyfoods"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                QXY Foods
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>MIT License</span>
            <Separator orientation="vertical" className="h-3" />
            <Link href="#" className="hover:text-foreground">
              GitHub
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <a
              href="/storybook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Storybook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
