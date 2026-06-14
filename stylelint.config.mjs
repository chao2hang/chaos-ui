/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "coverage/**",
    "node_modules/**",
  ],
  rules: {
    // Tailwind v4 兼容 —— 允许 @theme @custom-variant 等 Tailwind 专用 at-rule
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "config",
          "theme",
          "custom-variant",
          "reference",
          "plugin",
          "source",
          "utility",
          "variant",
        ],
      },
    ],

    // 禁止硬编码颜色值
    "color-no-hex": [true, { severity: "error" }],
    "color-named": "never",

    // 禁止 !important
    "declaration-no-important": [true, { severity: "error" }],

    // 颜色值只允许 CSS 自定义属性
    "declaration-property-value-allowed-list": {
      color: ["/^var\\(--/", "currentColor", "transparent", "inherit", "/^oklch\\(/", "/^oklab\\(/"],
      "background-color": [
        "/^var\\(--/",
        "currentColor",
        "transparent",
        "inherit",
        "/^oklch\\(/",
        "/^oklab\\(/",
      ],
      "border-color": [
        "/^var\\(--/",
        "currentColor",
        "transparent",
        "inherit",
        "/^oklch\\(/",
        "/^oklab\\(/",
      ],
    },

    // 禁止 ID 选择器
    "selector-max-id": [0, { severity: "error" }],

    // 元素选择器 —— 仅在组件样式中禁止，全局重置文件中的 html/body 允许
    "selector-max-type": [
      2,
      {
        severity: "warning",
        ignore: ["compounded", "descendant", "next-sibling"],
      },
    ],

    // 关闭 oklch 的 notation 强制 —— 尊重 Tailwind 生成的格式
    "import-notation": null,
    "lightness-notation": null,
    "hue-degree-notation": null,
    "alpha-value-notation": null,

    // 单位限制
    "unit-allowed-list": [
      ["rem", "em", "%", "vw", "vh", "dvh", "svh", "px", "s", "ms", "deg", "fr"],
      { severity: "warning" },
    ],

    // 禁止未知的 CSS 自定义属性
    "custom-property-no-missing-var-function": true,
  },
};
