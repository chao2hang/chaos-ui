/**
 * Guide page bodies for the Next docs site (bilingual).
 * Content adapted from src/stories/intro/{zh,en}/* for App Router pages.
 */

import type { GuideSlug } from "@/lib/docs-nav";

export interface GuideBody {
  sections: { heading: string; paragraphs?: string[]; code?: { lang: string; content: string }[] }[];
}

const zh: Record<GuideSlug, GuideBody> = {
  "getting-started": {
    sections: [
      {
        heading: "概述",
        paragraphs: [
          "Chaos UI 是面向 ERP 与业务系统的企业级 React 组件库。本页给出最短上手路径。",
        ],
      },
      {
        heading: "安装",
        code: [
          {
            lang: "bash",
            content: "pnpm add @chaos_team/chaos-ui\n# 或 npm / yarn",
          },
        ],
      },
      {
        heading: "引入样式",
        code: [
          {
            lang: "css",
            content:
              '@import "tailwindcss";\n@source "../node_modules/@chaos_team/chaos-ui";\n@import "@chaos_team/chaos-ui/styles.css";',
          },
        ],
      },
      {
        heading: "使用组件",
        code: [
          {
            lang: "tsx",
            content:
              'import { Button, Input } from "@chaos_team/chaos-ui";\nimport { DataTable } from "@chaos_team/chaos-ui/business";\n\nexport function Demo() {\n  return (\n    <div className="space-y-4 p-4">\n      <Button>点击我</Button>\n      <Input placeholder="请输入" />\n    </div>\n  );\n}',
          },
        ],
      },
      {
        heading: "本地开发（本仓库）",
        paragraphs: [
          "推荐使用常驻后台开发环境：pnpm run env:start（docs :3001 + Storybook :6006 + tsup watch）。",
        ],
        code: [
          {
            lang: "bash",
            content:
              "pnpm run env:start\npnpm run env:status\npnpm run env:stop",
          },
        ],
      },
    ],
  },
  installation: {
    sections: [
      {
        heading: "环境要求",
        paragraphs: [
          "React >= 19、Node.js >= 22、pnpm >= 9（推荐）。Tailwind CSS 4 为推荐样式方案。",
        ],
      },
      {
        heading: "安装包",
        code: [
          {
            lang: "bash",
            content:
              "pnpm add @chaos_team/chaos-ui\nnpm install @chaos_team/chaos-ui\nyarn add @chaos_team/chaos-ui",
          },
        ],
      },
      {
        heading: "Peer Dependencies",
        code: [
          {
            lang: "bash",
            content:
              "pnpm add react@^19 react-dom@^19\n# Next.js 项目\npnpm add next@^16 next-themes@^0.4",
          },
        ],
      },
      {
        heading: "子路径导出",
        paragraphs: [
          "主入口 @chaos_team/chaos-ui 为 UI 基础组件；业务/布局/移动端/hooks 请走 subpath：/ui、/business、/layout、/mobile、/hooks、/lib、/next、/styles.css。",
        ],
      },
    ],
  },
  "design-tokens": {
    sections: [
      {
        heading: "设计令牌",
        paragraphs: [
          "Chaos UI 使用 CSS 变量承载语义色、品牌色、圆角、阴影与字号。主题切换通过 .dark class 完成。",
          "包内 styles.css 导出 token；文档站 globals 与之镜像，长期将收敛为单一 tokens 入口。",
        ],
      },
      {
        heading: "常用语义色",
        paragraphs: [
          "--background / --foreground、--primary、--muted、--destructive、--border、--ring 等遵循 shadcn 语义命名。",
        ],
      },
      {
        heading: "品牌色",
        paragraphs: [
          "--brand-* 映射为 Tailwind color-brand-*，用于强调按钮、链接与高亮。",
        ],
      },
    ],
  },
  theming: {
    sections: [
      {
        heading: "主题系统",
        paragraphs: [
          "基于 next-themes 与 class 策略：attribute=\"class\"，支持 light / dark / system。",
          "组件库本身不绑定具体 ThemeProvider 实现，消费方可使用包内 ThemeProvider 或自建。",
        ],
      },
      {
        heading: "自定义品牌",
        paragraphs: [
          "覆盖 :root / .dark 下的 --brand-* 或 --primary 即可换肤，无需改组件源码。",
        ],
      },
    ],
  },
  i18n: {
    sections: [
      {
        heading: "国际化",
        paragraphs: [
          "库内置中文/英文文案命名空间（i18next）。业务侧可扩展命名空间与语言包。",
          "文档站自身使用 cookie locale + 本地 dict，与组件库 i18n 解耦。",
        ],
      },
    ],
  },
  accessibility: {
    sections: [
      {
        heading: "无障碍目标",
        paragraphs: [
          "目标对齐 WCAG 2.1 AA：语义结构、键盘可达、可见焦点、足够对比度。",
          "交互组件基于 @base-ui/react 等无障碍原语；请保留 data-slot 与 ARIA 属性，勿用 div 无脑替换。",
        ],
      },
    ],
  },
  "component-guidelines": {
    sections: [
      {
        heading: "组件约定",
        paragraphs: [
          "命名导出、cva 变体、cn() 合并 className、data-slot 标识。",
          "新组件需：Storybook story（tags: autodocs）、单元测试、JSDoc。",
          "公开 API 边界见 docs/api-boundaries.md；根包仅 UI，业务走 /business 等 subpath。",
        ],
      },
    ],
  },
};

const en: Record<GuideSlug, GuideBody> = {
  "getting-started": {
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Chaos UI is an enterprise React component library for ERP and business systems. This page is the shortest path to ship.",
        ],
      },
      {
        heading: "Install",
        code: [
          {
            lang: "bash",
            content: "pnpm add @chaos_team/chaos-ui\n# or npm / yarn",
          },
        ],
      },
      {
        heading: "Styles",
        code: [
          {
            lang: "css",
            content:
              '@import "tailwindcss";\n@source "../node_modules/@chaos_team/chaos-ui";\n@import "@chaos_team/chaos-ui/styles.css";',
          },
        ],
      },
      {
        heading: "Use components",
        code: [
          {
            lang: "tsx",
            content:
              'import { Button, Input } from "@chaos_team/chaos-ui";\nimport { DataTable } from "@chaos_team/chaos-ui/business";\n\nexport function Demo() {\n  return (\n    <div className="space-y-4 p-4">\n      <Button>Click me</Button>\n      <Input placeholder="Type here" />\n    </div>\n  );\n}',
          },
        ],
      },
      {
        heading: "Local development (this repo)",
        paragraphs: [
          "Prefer the always-on stack: pnpm run env:start (docs :3001 + Storybook :6006 + tsup watch).",
        ],
        code: [
          {
            lang: "bash",
            content:
              "pnpm run env:start\npnpm run env:status\npnpm run env:stop",
          },
        ],
      },
    ],
  },
  installation: {
    sections: [
      {
        heading: "Requirements",
        paragraphs: [
          "React >= 19, Node.js >= 22, pnpm >= 9 recommended. Tailwind CSS 4 is the preferred styling stack.",
        ],
      },
      {
        heading: "Install the package",
        code: [
          {
            lang: "bash",
            content:
              "pnpm add @chaos_team/chaos-ui\nnpm install @chaos_team/chaos-ui\nyarn add @chaos_team/chaos-ui",
          },
        ],
      },
      {
        heading: "Peer dependencies",
        code: [
          {
            lang: "bash",
            content:
              "pnpm add react@^19 react-dom@^19\n# Next.js apps\npnpm add next@^16 next-themes@^0.4",
          },
        ],
      },
      {
        heading: "Subpath exports",
        paragraphs: [
          "Root @chaos_team/chaos-ui is UI-only. Use /ui, /business, /layout, /mobile, /hooks, /lib, /next, /styles.css for other surfaces.",
        ],
      },
    ],
  },
  "design-tokens": {
    sections: [
      {
        heading: "Design tokens",
        paragraphs: [
          "Chaos UI stores semantic colors, brand scale, radius, shadows, and type in CSS variables. Dark mode uses the .dark class.",
          "Package styles.css is the token source; the docs site mirrors tokens and will converge later.",
        ],
      },
      {
        heading: "Semantic colors",
        paragraphs: [
          "--background / --foreground, --primary, --muted, --destructive, --border, --ring follow shadcn-style naming.",
        ],
      },
      {
        heading: "Brand",
        paragraphs: [
          "--brand-* maps to Tailwind color-brand-* for emphasis, links, and highlights.",
        ],
      },
    ],
  },
  theming: {
    sections: [
      {
        heading: "Theming",
        paragraphs: [
          "Use next-themes with class strategy (light / dark / system). The library does not hard-require a specific provider.",
        ],
      },
      {
        heading: "Custom brand",
        paragraphs: [
          "Override --brand-* or --primary under :root / .dark without forking components.",
        ],
      },
    ],
  },
  i18n: {
    sections: [
      {
        heading: "Internationalization",
        paragraphs: [
          "The package ships zh/en namespaces via i18next. Apps can extend namespaces and locales.",
          "This docs site uses cookie locale + a local dict, separate from package i18n.",
        ],
      },
    ],
  },
  accessibility: {
    sections: [
      {
        heading: "Accessibility goals",
        paragraphs: [
          "Target WCAG 2.1 AA: semantics, keyboard access, visible focus, contrast.",
          "Interactive pieces build on accessible primitives; keep data-slot and ARIA intact.",
        ],
      },
    ],
  },
  "component-guidelines": {
    sections: [
      {
        heading: "Component conventions",
        paragraphs: [
          "Named exports, cva variants, cn() for className, data-slot identifiers.",
          "New components need Storybook (autodocs), unit tests, and JSDoc.",
          "Public API boundaries: docs/api-boundaries.md — root package is UI-only.",
        ],
      },
    ],
  },
};

export function getGuideBody(locale: "zh" | "en", slug: GuideSlug): GuideBody {
  return (locale === "en" ? en : zh)[slug];
}
