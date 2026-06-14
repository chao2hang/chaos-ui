import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../src/intro/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/business/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/layout/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["..\\public"],
  typescript: {
    check: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      build: {
        ...config.build,
        chunkSizeWarningLimit: 1600,
        rolldownOptions: {
          ...config.build?.rolldownOptions,
          checks: {
            ...config.build?.rolldownOptions?.checks,
            pluginTimings: false,
          },
        },
      },
    };
  },
};

export default config;
