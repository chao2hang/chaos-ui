"use client";

import {
  Component,
  Suspense,
  lazy,
  useMemo,
  type ComponentType,
  type ReactNode,
} from "react";
import { resolvePreviewModule } from "@/components/preview-resolve";

/* -------------------------------------------------------------------------- */
/*  Preview chrome                                                            */
/* -------------------------------------------------------------------------- */

function PreviewCard({
  name,
  nameZh,
  children,
}: {
  name: string;
  nameZh?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose border-border bg-card my-6 overflow-hidden rounded-lg border shadow-sm">
      <div className="border-border bg-muted/40 flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-sm font-semibold">{name}</span>
          {nameZh ? (
            <span className="text-muted-foreground text-xs">{nameZh}</span>
          ) : null}
        </div>
        <span className="text-muted-foreground/70 text-xs tracking-wide uppercase select-none">
          Preview
        </span>
      </div>
      <div className="bg-muted/20 flex min-h-[120px] w-full items-center justify-center p-6 sm:p-8">
        <div className="w-full min-w-0 max-w-3xl">{children}</div>
      </div>
    </div>
  );
}

function PreviewFallback({ name }: { name: string }) {
  return (
    <div className="not-prose border-border my-6 rounded-lg border border-dashed p-6 text-center">
      <p className="text-muted-foreground text-sm">
        No live preview available for <code className="text-xs">{name}</code>.
      </p>
      <p className="text-muted-foreground/70 mt-1 text-xs">
        Open Storybook for interactive demos with real data.
      </p>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="not-prose border-border bg-card my-6 overflow-hidden rounded-lg border shadow-sm">
      <div className="border-border bg-muted/40 flex items-center border-b px-4 py-2">
        <div className="bg-muted-foreground/20 h-4 w-24 animate-pulse rounded" />
      </div>
      <div className="bg-muted/20 flex min-h-[120px] items-center justify-center p-8">
        <div className="bg-muted-foreground/15 h-4 w-32 animate-pulse rounded" />
      </div>
    </div>
  );
}

class PreviewErrorBoundary extends Component<
  { children: ReactNode; name: string },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode; name: string }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="not-prose border-destructive/30 bg-destructive/5 my-6 rounded-lg border p-6 text-center">
          <p className="text-destructive text-sm font-medium">
            Preview error for {this.props.name}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {this.state.error.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Lazy preview host: only loads hand demos / story registry / package loader
 * for the requested name (not all three eagerly).
 */
export function ComponentPreviewImpl({
  name,
  nameZh,
}: {
  name: string;
  nameZh?: string;
}) {
  const LazyPreview = useMemo(() => {
    return lazy(async () => {
      const mod = await resolvePreviewModule(name);
      // Empty default from resolve → treat as missing
      const Comp = mod.default;
      if (!Comp || Comp.name === "NoPreview") {
        return {
          default: function Empty() {
            return <PreviewFallback name={name} />;
          },
        };
      }
      return {
        default: function PreviewBody() {
          return (
            <PreviewCard name={name} nameZh={nameZh}>
              <Comp />
            </PreviewCard>
          );
        },
      };
    });
  }, [name, nameZh]);

  return (
    <PreviewErrorBoundary name={name}>
      <Suspense fallback={<PreviewSkeleton />}>
        <LazyPreview />
      </Suspense>
    </PreviewErrorBoundary>
  );
}
