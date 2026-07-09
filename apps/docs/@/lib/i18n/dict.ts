import type { Category } from "@/content/components.meta";
import { categoryLabelsEn, categoryLabelsZh } from "@/content/components.meta";
import type { Locale } from "@/lib/i18n/locale";

/**
 * UI string dictionary for the docs site. Component meta already carries
 * bilingual fields (name/nameZh, desc/descZh, categoryLabelsEn/Zh), so this
 * file only covers the static chrome: header, home, components overview,
 * detail page breadcrumb/fallback, and the search island.
 *
 * `t(locale, path)` is a thin selector; pages call `t(locale, "home.heroTitle")`
 * etc. Keys are grouped by surface for easy scanning.
 */

export interface DictShape {
  header: {
    navInstall: string;
    navFeatures: string;
    navComponents: string;
    toggleToEn: string;
    toggleToZh: string;
    langLabelEn: string;
    langLabelZh: string;
    themeToggle: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroSubtitleEn: string;
    heroParagraph: string;
    heroParagraphEn: string;
    ctaQuickStart: string;
    ctaBrowse: string;
    statsHeading: string;
    statsHeadingEn: string;
    threeStepsTitle: string;
    threeStepsSubtitle: string;
    installTitle: string;
    installTitleEn: string;
    installParagraph: string;
    installParagraphEn: string;
    featuresHeading: string;
    featuresSubtitle: string;
    featuresParagraph: string;
    featuresParagraphEn: string;
    componentsOverview: string;
    componentsOverviewEn: string;
    componentsHeading: string;
    componentsHeadingEn: string;
    componentsParagraph: string;
    componentsParagraphEn: string;
    componentsBrowseAll: string;
    footerBuiltBy: string;
  };
  components: {
    pageTitle: string;
    pageTitleEn: string;
    pageDesc: string;
    pageDescEn: string;
    searchLabel: string;
    searchPlaceholder: string;
    resultHit: string;
    resultHitEn: string;
    noMatchTitle: string;
    noMatchTitleEn: string;
    clearSearch: string;
    sectionCount: string;
  };
  detail: {
    breadcrumbRoot: string;
    storybookLink: string;
    notFoundTitle: string;
    notFoundDesc: string;
    mdxNotFoundTitle: string;
    mdxNotFoundDesc: string;
  };
  card: {
    browseStorybook: string;
  };
  sidebar: {
    searchPlaceholder: string;
    collapseAll: string;
    expandAll: string;
    toggleLabel: string;
  };
  palette: {
    searchPlaceholder: string;
    noResults: string;
    hint: string;
  };
  businessSub: {
    collapse: string;
    expand: string;
  };
}

const zh: DictShape = {
  header: {
    navInstall: "安装",
    navFeatures: "特性",
    navComponents: "组件",
    toggleToEn: "Switch to English",
    toggleToZh: "切换到中文",
    langLabelEn: "EN",
    langLabelZh: "中文",
    themeToggle: "切换主题",
  },
  home: {
    heroBadge: "企业级 React 组件库",
    heroTitle: "企业级 React 组件库",
    heroSubtitle: "为现代企业级应用而设计",
    heroSubtitleEn:
      "A production-grade React component library for modern enterprise applications.",
    heroParagraph:
      "面向 ERP & 业务系统的企业级 React 19 组件库。148+ 组件、19 Hooks、5 工具模块，基于 Tailwind CSS 4 和 shadcn/ui 构建。",
    heroParagraphEn:
      "Enterprise React 19 component library for ERP and business systems. 148+ components, 19 hooks, 5 utility modules — built on Tailwind CSS 4 and shadcn/ui.",
    ctaQuickStart: "快速开始",
    ctaBrowse: "浏览组件",
    statsHeading: "三步上手",
    statsHeadingEn: "Three Steps to Get Started",
    threeStepsTitle: "安装 & 快速开始",
    threeStepsSubtitle: "Install & Quick Start",
    installTitle: "安装 & 快速开始",
    installTitleEn: "Install & Quick Start",
    installParagraph: "选择你喜欢的包管理器，一行命令安装，立即开始使用。",
    installParagraphEn:
      "Pick your preferred package manager and install with a single command.",
    featuresHeading: "为什么选择 Chaos UI",
    featuresSubtitle: "为现代企业级应用而设计",
    featuresParagraph:
      "从类型安全到暗色模式，从国际化到可访问性 — 每个细节都经过精心打磨。",
    featuresParagraphEn:
      "From type safety to dark mode, i18n to accessibility — every detail carefully polished.",
    componentsOverview: "组件概览",
    componentsOverviewEn: "Components Overview",
    componentsHeading: "三大类别，全面覆盖",
    componentsHeadingEn: "Three Categories, Full Coverage",
    componentsParagraph:
      "从基础 UI 到业务场景，从布局框架到交互模式 — 应有尽有。",
    componentsParagraphEn:
      "From primitive UI to business scenarios, layout frameworks to interaction patterns — everything you need.",
    componentsBrowseAll: "浏览全部组件",
    footerBuiltBy: "Built by",
  },
  components: {
    pageTitle: "组件总览",
    pageTitleEn: "Components Overview",
    pageDesc:
      "Chaos UI 提供的企业级 React 组件，覆盖通用、布局、表单、数据展示、反馈与业务场景。",
    pageDescEn:
      "Enterprise React components from Chaos UI — covering general, layout, form, data display, feedback and business scenarios.",
    searchLabel: "搜索组件",
    searchPlaceholder: "搜索 name / nameZh / 描述 / 标签",
    resultHit: "命中",
    resultHitEn: "of",
    noMatchTitle: "未找到匹配的组件",
    noMatchTitleEn: "No matching components",
    clearSearch: "清空搜索",
    sectionCount: "个组件",
  },
  detail: {
    breadcrumbRoot: "组件总览",
    storybookLink: "Storybook 文档",
    notFoundTitle: "组件未找到",
    notFoundDesc: "请返回组件总览选择一个有效的组件。",
    mdxNotFoundTitle: "组件详情生成中",
    mdxNotFoundDesc: "该组件的文档尚未生成,请稍后再试或前往 Storybook 查看。",
  },
  card: {
    browseStorybook: "在 Storybook 中浏览",
  },
  sidebar: {
    searchPlaceholder: "筛选组件…",
    collapseAll: "全部折叠",
    expandAll: "全部展开",
    toggleLabel: "切换侧边栏",
  },
  palette: {
    searchPlaceholder: "搜索组件…",
    noResults: "无匹配结果",
    hint: "↑↓ 导航  ↵ 跳转  Esc 关闭",
  },
  businessSub: {
    collapse: "折叠",
    expand: "展开",
  },
};

const en: DictShape = {
  header: {
    navInstall: "Install",
    navFeatures: "Features",
    navComponents: "Components",
    toggleToEn: "Switch to English",
    toggleToZh: "Switch to Chinese",
    langLabelEn: "EN",
    langLabelZh: "中文",
    themeToggle: "Toggle theme",
  },
  home: {
    heroBadge: "Enterprise React Component Library",
    heroTitle: "Enterprise React Component Library",
    heroSubtitle: "Designed for modern enterprise applications",
    heroSubtitleEn:
      "A production-grade React component library for modern enterprise applications.",
    heroParagraph:
      "An enterprise React 19 component library for ERP and business systems. 148+ components, 19 hooks, 5 utility modules — built on Tailwind CSS 4 and shadcn/ui.",
    heroParagraphEn:
      "An enterprise React 19 component library for ERP and business systems. 148+ components, 19 hooks, 5 utility modules — built on Tailwind CSS 4 and shadcn/ui.",
    ctaQuickStart: "Quick Start",
    ctaBrowse: "Browse Components",
    statsHeading: "Three Steps to Get Started",
    statsHeadingEn: "Three Steps to Get Started",
    threeStepsTitle: "Install & Quick Start",
    threeStepsSubtitle: "Install & Quick Start",
    installTitle: "Install & Quick Start",
    installTitleEn: "Install & Quick Start",
    installParagraph:
      "Pick your preferred package manager and install with a single command.",
    installParagraphEn:
      "Pick your preferred package manager and install with a single command.",
    featuresHeading: "Why Chaos UI",
    featuresSubtitle: "Designed for modern enterprise applications",
    featuresParagraph:
      "From type safety to dark mode, i18n to accessibility — every detail carefully polished.",
    featuresParagraphEn:
      "From type safety to dark mode, i18n to accessibility — every detail carefully polished.",
    componentsOverview: "Components Overview",
    componentsOverviewEn: "Components Overview",
    componentsHeading: "Three Categories, Full Coverage",
    componentsHeadingEn: "Three Categories, Full Coverage",
    componentsParagraph:
      "From primitive UI to business scenarios, layout frameworks to interaction patterns — everything you need.",
    componentsParagraphEn:
      "From primitive UI to business scenarios, layout frameworks to interaction patterns — everything you need.",
    componentsBrowseAll: "Browse all components",
    footerBuiltBy: "Built by",
  },
  components: {
    pageTitle: "Components Overview",
    pageTitleEn: "Components Overview",
    pageDesc:
      "Enterprise React components from Chaos UI — covering general, layout, form, data display, feedback and business scenarios.",
    pageDescEn:
      "Enterprise React components from Chaos UI — covering general, layout, form, data display, feedback and business scenarios.",
    searchLabel: "Search components",
    searchPlaceholder: "Search name / nameZh / description / tags",
    resultHit: "of",
    resultHitEn: "of",
    noMatchTitle: "No matching components",
    noMatchTitleEn: "No matching components",
    clearSearch: "Clear",
    sectionCount: "components",
  },
  detail: {
    breadcrumbRoot: "Components Overview",
    storybookLink: "Storybook Docs",
    notFoundTitle: "Component not found",
    notFoundDesc: "Please return to the overview and pick a valid component.",
    mdxNotFoundTitle: "Documentation is being generated",
    mdxNotFoundDesc:
      "This component's docs are not ready yet. Try again later or view it on Storybook.",
  },
  card: {
    browseStorybook: "Browse in Storybook",
  },
  sidebar: {
    searchPlaceholder: "Filter components…",
    collapseAll: "Collapse all",
    expandAll: "Expand all",
    toggleLabel: "Toggle sidebar",
  },
  palette: {
    searchPlaceholder: "Search components…",
    noResults: "No results",
    hint: "↑↓ navigate  ↵ open  Esc close",
  },
  businessSub: {
    collapse: "Collapse",
    expand: "Expand",
  },
};

export const dict: Record<Locale, DictShape> = { zh, en };

/** Resolve a dotted path like "home.heroTitle" against the dict shape. */
export function t(locale: Locale, path: string): string {
  const parts = path.split(".");
  let cur: unknown = dict[locale];
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}

/** Per-locale category label resolver so pages don't branch manually. */
export function categoryLabel(locale: Locale, category: Category): string {
  return locale === "en"
    ? categoryLabelsEn[category]
    : categoryLabelsZh[category];
}
