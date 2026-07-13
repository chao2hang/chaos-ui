/**
 * Docs site guide navigation + Storybook base URL.
 * Single source for header, sidebar, command palette, and footer.
 */

export type GuideSlug =
  | "getting-started"
  | "installation"
  | "design-tokens"
  | "theming"
  | "i18n"
  | "accessibility"
  | "component-guidelines";

export interface GuideMeta {
  slug: GuideSlug;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "getting-started",
    titleZh: "快速开始",
    titleEn: "Getting Started",
    descriptionZh: "在项目中安装并使用 Chaos UI 的最短路径。",
    descriptionEn: "The shortest path to install and use Chaos UI in your app.",
  },
  {
    slug: "installation",
    titleZh: "安装",
    titleEn: "Installation",
    descriptionZh: "包安装、peer 依赖与样式引入。",
    descriptionEn: "Package install, peer dependencies, and styles.",
  },
  {
    slug: "design-tokens",
    titleZh: "设计令牌",
    titleEn: "Design Tokens",
    descriptionZh: "颜色、圆角、阴影与语义 token 说明。",
    descriptionEn: "Colors, radius, shadows, and semantic tokens.",
  },
  {
    slug: "theming",
    titleZh: "主题",
    titleEn: "Theming",
    descriptionZh: "亮暗色、品牌色与 CSS 变量主题。",
    descriptionEn: "Light/dark, brand colors, and CSS-variable themes.",
  },
  {
    slug: "i18n",
    titleZh: "国际化",
    titleEn: "Internationalization",
    descriptionZh: "内置中英文与扩展方式。",
    descriptionEn: "Built-in zh/en and how to extend locales.",
  },
  {
    slug: "accessibility",
    titleZh: "无障碍",
    titleEn: "Accessibility",
    descriptionZh: "WCAG、键盘与 ARIA 约定。",
    descriptionEn: "WCAG, keyboard, and ARIA conventions.",
  },
  {
    slug: "component-guidelines",
    titleZh: "组件规范",
    titleEn: "Component Guidelines",
    descriptionZh: "命名、变体、API 与文档约定。",
    descriptionEn: "Naming, variants, API, and documentation conventions.",
  },
];

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Storybook base URL for site chrome links (dev default :6006).
 * MDX body links are statically rewritten to the same default; override site chrome via NEXT_PUBLIC_STORYBOOK_URL.
 */
export function getStorybookBaseUrl(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_STORYBOOK_URL) {
    return process.env.NEXT_PUBLIC_STORYBOOK_URL.replace(/\/$/, "");
  }
  return "http://localhost:6006";
}

export function storybookDocsUrl(storybookId?: string): string {
  const base = getStorybookBaseUrl();
  if (!storybookId) return base;
  return `${base}/?path=/docs/${storybookId}`;
}
