import Link from "next/link";

/**
 * Root app has been superseded by the docs site at apps/docs/.
 *
 * This page now serves as a migration notice. The docs site is a separate
 * Next.js app — run it with:
 *
 *   cd apps/docs && pnpm dev
 *
 * For the full Branch B migration that removes root app/ entirely and
 * repoints vercel.json to deploy apps/docs, see:
 *   docs/agent-todos/04-nav-redirect-verify.md
 */
export default function Home() {
  return (
    <div className="bg-surface flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Chaos UI</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          The documentation site has moved to a dedicated app.
        </p>
        <div className="mt-8 space-y-4">
          <p className="text-muted-foreground text-sm">
            Run the docs site locally:
          </p>
          <code className="bg-muted inline-block rounded px-3 py-1.5 text-sm">
            cd apps/docs &amp;&amp; pnpm dev
          </code>
        </div>
        <div className="text-muted-foreground mt-8 space-y-2 text-sm">
          <p>
            Storybook is still available at{" "}
            <Link
              href="http://localhost:6006"
              className="hover:text-foreground underline"
            >
              localhost:6006
            </Link>
          </p>
          <p>
            Start it with{" "}
            <code className="bg-muted rounded px-1.5 py-0.5">pnpm dev</code>
          </p>
        </div>
      </div>
    </div>
  );
}
