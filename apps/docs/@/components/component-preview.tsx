// @ts-nocheck — preview entry
"use client";

import dynamic from "next/dynamic";

/**
 * Server-safe wrapper around ComponentPreviewImpl.
 *
 * Uses `dynamic(…, { ssr: false })` because the auto-generated
 * `component-map.ts` imports every component in the library, and
 * some of them reference browser-only globals (`orientation`,
 * `window`, etc.) at module scope — those would crash SSR.
 *
 * With `ssr: false` the entire preview tree (imports + render) is
 * skipped during server-rendering and only mounted on the client.
 */

const PreviewImpl = dynamic(
  () =>
    import("./component-preview-impl").then((m) => ({
      default: m.ComponentPreviewImpl,
    })),
  {
    ssr: false,
    loading: () => <PreviewSkeleton />,
  },
);

/* -------------------------------------------------------------------------- */
/*  Skeleton shown while the client bundle loads                              */
/* -------------------------------------------------------------------------- */

function PreviewSkeleton() {
  return (
    <div className="not-prose border-border bg-card my-6 overflow-hidden rounded-lg border shadow-sm">
      <div className="border-border bg-muted/30 flex items-center border-b px-4 py-2">
        <div className="bg-muted-foreground/20 h-4 w-24 animate-pulse rounded" />
      </div>
      <div className="bg-muted/15 flex min-h-[120px] items-center justify-center p-8">
        <div className="bg-muted-foreground/15 h-4 w-32 animate-pulse rounded" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Props (mirrors ComponentPreviewImpl)                                      */
/* -------------------------------------------------------------------------- */

export function ComponentPreview({
  name,
  nameZh,
}: {
  name: string;
  nameZh?: string;
}) {
  return <PreviewImpl name={name} nameZh={nameZh} />;
}
