import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const config: StorybookConfig = {
  stories: [
    "../src/stories/intro/**/*.mdx",
    "../src/stories/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/business/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/layout/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  typescript: {
    check: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias as Record<string, string> | undefined),
          "@": projectRoot,
        },
      },
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
