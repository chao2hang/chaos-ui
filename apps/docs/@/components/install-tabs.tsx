import { codeToHtml, type BundledLanguage } from "shiki";
import {
  InstallTabsClient,
  type PrehighlightedSnippet,
} from "@/components/install-tabs-client";

const commandStrings = {
  npm: "npm install @qxyfoods/chaos-ui",
  pnpm: "pnpm add @qxyfoods/chaos-ui",
  yarn: "yarn add @qxyfoods/chaos-ui",
} as const;

const cssImportCode = `/* styles.css */
@import "@qxyfoods/chaos-ui/styles.css";`;

const usageCode = `import { Button } from "@qxyfoods/chaos-ui/ui";
import { useCrud } from "@qxyfoods/chaos-ui/hooks";
import { cn } from "@qxyfoods/chaos-ui/lib";

export default function App() {
  return <Button>Click me</Button>;
}`;

async function highlight(
  code: string,
  lang: string,
): Promise<PrehighlightedSnippet> {
  try {
    const html = await codeToHtml(code, {
      lang: lang as BundledLanguage,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
    return { code, html, lang };
  } catch {
    return { code, html: null, lang };
  }
}

/**
 * Server component that pre-highlights every install snippet with Shiki once,
 * then hands the resulting HTML to a small client island for tab switching.
 */
export async function InstallTabs() {
  const [npm, pnpm, yarn, cssImport, usage] = await Promise.all([
    highlight(commandStrings.npm, "bash"),
    highlight(commandStrings.pnpm, "bash"),
    highlight(commandStrings.yarn, "bash"),
    highlight(cssImportCode, "css"),
    highlight(usageCode, "tsx"),
  ]);

  return (
    <InstallTabsClient
      commands={{ npm, pnpm, yarn }}
      cssImport={cssImport}
      usage={usage}
    />
  );
}
