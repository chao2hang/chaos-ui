import { codeToHtml, type BundledLanguage } from "shiki";
import { CopyButton } from "@/components/copy-button";

interface CodeBlockProps {
  code: string;
  /** Language for syntax highlighting (e.g. "bash", "tsx", "ts", "json"). */
  lang?: string;
}

/**
 * Server-rendered code block with Shiki dual-theme (github-light + github-dark)
 * highlighting. Falls back to a plain <pre><code> render if the language is
 * unknown or Shiki throws. The copy button is a small client island that lives
 * on top via `group` positioning.
 *
 * MDX content imports this component directly (`<CodeBlock code lang />`), so
 * the async server component runs at request/build time — zero JS shipped to
 * the client for the highlighted markup.
 */
export async function CodeBlock({ code, lang }: CodeBlockProps) {
  let html: string | null = null;
  try {
    html = await codeToHtml(code, {
      lang: (lang || "text") as BundledLanguage,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });
  } catch {
    html = null;
  }

  return (
    <div className="group relative my-4">
      {lang && (
        <span className="text-muted-foreground absolute top-2 right-12 z-10 text-[10px] uppercase">
          {lang}
        </span>
      )}
      <CopyButton code={code} />
      {html ? (
        <div
          className="shiki-wrap overflow-x-auto rounded-lg border text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="bg-muted/50 overflow-x-auto rounded-lg border p-4 text-sm">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
