import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getServerLocale } from "@/lib/i18n/get-server-locale";
import { dict, t as tt } from "@/lib/i18n/dict";

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
    titleEn: "UI Primitives",
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
    descEn:
      "Accessible primitives built on @base-ui/react — covers forms, data display, navigation, and feedback.",
    gradient: "from-brand-500/10 to-brand-600/5",
  },
  {
    icon: Blocks,
    title: "Business 业务组件",
    titleEn: "Business Components",
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
    descEn:
      "Domain components for ERP and marketing platforms — approval flows, chat, reports, dashboards.",
    gradient: "from-emerald-500/10 to-teal-500/5",
  },
  {
    icon: Layers,
    title: "Layout 布局组件",
    titleEn: "Layout Components",
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
    descEn:
      "Layout solutions for admin consoles, workspaces and detail pages — sidebars, breadcrumbs, tabs.",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page
/* -------------------------------------------------------------------------- */

export default async function Home() {
  const locale = await getServerLocale();
  const isEn = locale === "en";
  const t = (path: string) => tt(locale, path);

  return (
    <div className="flex flex-col">
      {/* ================================================================ */}
      {/*  HERO                                                           */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="from-brand-100/40 via-background to-background dark:from-brand-950/30 dark:via-background dark:to-background absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
          <div className="bg-brand-500/5 dark:bg-brand-400/5 absolute top-0 right-0 size-[500px] translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          <div className="bg-brand-400/5 dark:bg-brand-600/5 absolute bottom-0 left-0 size-[400px] -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-3 py-1 text-xs"
            >
              <Sparkles className="size-3" />
              v1.0.0 — Now Available
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("home.heroTitle")}
              <br />
              <span className="from-brand-500 to-brand-700 dark:from-brand-400 dark:to-brand-600 bg-gradient-to-r bg-clip-text text-transparent">
                Chaos UI
              </span>
            </h1>

            <p className="text-muted-foreground mt-6 text-lg leading-relaxed text-balance sm:text-xl">
              {t("home.heroParagraph")}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#install">
                <Button size="lg" className="h-12 gap-2 px-8 text-base">
                  {t("home.ctaQuickStart")}
                  <ArrowRight className="size-4" />
                </Button>
              </a>
              <Link href="/components">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 px-8 text-base"
                >
                  <Command className="size-4" />
                  {t("home.ctaBrowse")}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="bg-card/50 rounded-xl border p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-brand-600 dark:text-brand-400 text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    {isEn ? stat.label : stat.labelZh}
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
                {t("home.statsHeading")}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                {t("home.installTitle")}
              </h2>
              <p className="text-muted-foreground mt-4">
                {t("home.installParagraph")}
              </p>
            </div>

            <div className="mt-10">
              <InstallTabs />
            </div>

            {/* Subpath exports */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "@chaos_team/chaos-ui/ui",
                "@chaos_team/chaos-ui/business",
                "@chaos_team/chaos-ui/hooks",
                "@chaos_team/chaos-ui/lib",
                "@chaos_team/chaos-ui/next",
                "@chaos_team/chaos-ui/ui-icons",
                "@chaos_team/chaos-ui/styles.css",
                "@chaos_team/chaos-ui/ui/icons",
              ].map((path) => (
                <code
                  key={path}
                  className="bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-xs"
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
              {t("home.featuresHeading")}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {t("home.featuresSubtitle")}
            </h2>
            <p className="text-muted-foreground mt-4">
              {t("home.featuresParagraph")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group border-border/60">
                <CardHeader>
                  <feature.icon className="text-brand-500 dark:text-brand-400 mb-2 size-8" />
                  <CardTitle className="text-base">
                    {isEn ? feature.titleEn : feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {isEn ? feature.descEn : feature.desc}
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
              {t("home.componentsOverview")}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {t("home.componentsHeading")}
            </h2>
            <p className="text-muted-foreground mt-4">
              {t("home.componentsParagraph")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {categories.map((cat) => (
              <Card
                key={cat.title}
                className="border-border/60 relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${cat.gradient}`}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <cat.icon className="text-foreground/70 size-6" />
                    <Badge variant="outline" className="text-xs">
                      {cat.count}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">
                    {isEn ? cat.titleEn : cat.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {isEn ? cat.descEn : cat.desc}
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
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="bg-brand-500 flex size-6 items-center justify-center rounded-md text-[10px] font-bold text-white">
              C
            </span>
            <span>
              {dict[locale].home.footerBuiltBy}{" "}
              <a
                href="https://github.com/qxyfoods"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:underline"
              >
                Chaos
              </a>
            </span>
          </div>

          <div className="text-muted-foreground flex items-center gap-4 text-xs">
            <span>MIT License</span>
            <Separator orientation="vertical" className="h-3" />
            <Link href="#" className="hover:text-foreground">
              GitHub
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <a
              href="http://localhost:3002"
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
