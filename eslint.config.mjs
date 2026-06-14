// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import chaosPlugin from "./eslint-plugin-chaos/index.js";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const storybookPluginEntry = {
  files: ["src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  plugins: { storybook },
  rules: {
    ...((storybook.configs && storybook.configs["flat/recommended"] && storybook.configs["flat/recommended"].rules) || {}),
  },
};

const chaosPluginEntry = {
  files: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "hooks/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: { "@chaos": chaosPlugin },
  rules: {
    ...((chaosPlugin.configs && chaosPlugin.configs.recommended && chaosPlugin.configs.recommended.rules) || {}),
    "@chaos/no-deep-imports": [
      "warn",
      {
        allowedPaths: ["@/components/ui/icons"],
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "output/**",
    "build/**",
    "storybook-static/**",
    "coverage/**",
    ".playwright-mcp/**",
    ".detection/**",
    "next-env.d.ts",
  ]),
  storybookPluginEntry,
  // Chaos UI 自定义规则
  chaosPluginEntry,
  {
    files: ["**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    rules: {
      "storybook/no-renderer-packages": "off",
      // stories 内的 render 函数不是真正的 React 组件,关闭 rules-of-hooks
      "react-hooks/rules-of-hooks": "off",
      // stories 展示组件用法时需要展示各种元素,允许原生 button/input/a
      "@chaos/no-raw-html-button": "off",
      "@chaos/no-raw-html-elements": "off",
      "@chaos/no-deep-imports": "off",
      "@chaos/no-missing-story": "off",
    },
  },
  {
    // eslint-plugin-chaos 自身源码:使用 CommonJS 是合法的
    files: ["eslint-plugin-chaos/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@chaos/no-hardcoded-chinese": "off",
    },
  },
  {
    // vitest.config.ts 用 /// <reference /> 引用 vitest 类型
    files: ["vitest.config.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    // PropsTable.tsx 自身就是用 <table> 渲染 props 文档
    files: ["src/utils/PropsTable.tsx"],
    rules: {
      "@chaos/no-raw-html-button": "off",
      "@chaos/no-raw-html-elements": "off",
    },
  },
  {
    // components/ui/** 是 primitive 组件,自身必然使用原生元素(button/table/textarea/...)
    files: ["components/ui/**/*.{ts,tsx}"],
    rules: {
      "@chaos/no-raw-html-button": "off",
      "@chaos/no-raw-html-elements": "off",
    },
  },
  {
    // 业务/布局组件中 raw-html-button 的违规暂不修(本任务范围之外),统一在此范围豁免
    files: ["components/{business,layout}/**/*.{ts,tsx}"],
    rules: {
      "@chaos/no-raw-html-button": "off",
      "@chaos/no-raw-html-elements": "off",
    },
  },
  {
    // business 组件保留兼容默认文案；i18n 迁移分批推进。
    files: ["components/business/**/*.{ts,tsx}", "lib/api-client.ts"],
    rules: {
      "@chaos/no-hardcoded-chinese": "off",
    },
  },
  {
    // business 组件大量使用聚合 Story 文件，不要求每个文件独立 story。
    files: [
      "components/business/**/*.{ts,tsx}",
      "components/ui/icons.ts",
      "components/ui/sonner.tsx",
    ],
    rules: {
      "@chaos/no-missing-story": "off",
    },
  },
  {
    // App Router server entries must avoid the full UI barrel because it pulls client-only contexts into page-data collection.
    files: ["app/layout.tsx", "app/page.tsx"],
    rules: {
      "@chaos/no-deep-imports": "off",
    },
  },
  {
    // channel-picker.tsx 中 i18n key 用 `as any` 是已知的类型绕开
    files: ["components/business/channel-picker.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    // 配置文件的命名导出不算匿名默认导出
    files: ["*.config.mjs", ".lintstagedrc.mjs", "stylelint.config.mjs"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
  // 全局规则
  {
    rules: {
      // 禁止导入第三方 UI 库（ESLint 层面的二次检查）
      // 临时降级为 warn（lucide-react 计划在 P1 阶段替换为 @chaos/ui/icons）
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "antd",
              message: "禁止导入 antd，请使用 @/components/ui 中的 Chaos UI 组件",
            },
            {
              name: "@mui/material",
              message: "禁止导入 MUI，请使用 @/components/ui 中的 Chaos UI 组件",
            },
            {
              name: "element-plus",
              message: "禁止导入 element-plus，请使用 @/components/ui 中的 Chaos UI 组件",
            },
            {
              name: "chakra-ui",
              message: "禁止导入 chakra-ui，请使用 @/components/ui 中的 Chaos UI 组件",
            },
            {
              name: "lucide-react",
              message:
                "禁止直接引入 lucide-react，请使用 @chaos/ui/icons 统一出口",
            },
          ],
          patterns: [
            {
              group: ["@mui/*", "@ant-design/*", "@chakra-ui/*", "@lucide/*"],
              message: "禁止导入第三方 UI 库，请使用 @/components/ui 中的 Chaos UI 组件",
            },
            {
              group: ["@arco-design/*", "@fluentui/*", "@mantine/*", "@nextui-org/*"],
              message: "禁止导入第三方 UI 库，请使用 @/components/ui 中的 Chaos UI 组件",
            },
          ],
        },
      ],
      // 生产代码中禁止 console.log
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // 禁止未使用的变量
      "no-unused-vars": "off", // 交给 TypeScript 处理
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // logger 是唯一的 console 适配层。
    files: ["lib/logger.ts"],
    rules: {
      "no-console": "off",
    },
  },
]);

export default eslintConfig;
