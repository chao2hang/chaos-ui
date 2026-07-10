"use client";

import { Component, type ReactNode } from "react";
import { componentPreviews } from "@/components/component-previews";
import { componentStoryPreviews } from "@/components/component-story-previews";

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
      {/* Header bar */}
      <div className="border-border bg-muted/30 flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-sm font-semibold">{name}</span>
          {nameZh && (
            <span className="text-muted-foreground text-xs">{nameZh}</span>
          )}
        </div>
        <span className="text-muted-foreground/60 text-[10px] tracking-widest uppercase select-none">
          Preview
        </span>
      </div>
      {/* Preview area */}
      <div className="flex min-h-[120px] items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--muted)_10px,var(--muted)_12px)] [background-size:20px_20px] p-8">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fallbacks                                                                 */
/* -------------------------------------------------------------------------- */

function PreviewFallback({ name }: { name: string }) {
  return (
    <div className="not-prose border-muted-foreground/30 my-6 rounded-lg border border-dashed p-6 text-center">
      <p className="text-muted-foreground text-sm">
        No live preview available for <code className="text-xs">{name}</code>.
      </p>
      <p className="text-muted-foreground/60 mt-1 text-xs">
        Open Storybook for interactive demos with real data.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Error boundary                                                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Main implementation                                                       */
/* -------------------------------------------------------------------------- */

export function ComponentPreviewImpl({
  name,
  nameZh,
}: {
  name: string;
  nameZh?: string;
}) {
  // 1. Hand-authored demo takes precedence — always renders meaningful DOM.
  const Demo = componentPreviews[name];
  if (Demo) {
    return (
      <PreviewErrorBoundary name={name}>
        <PreviewCard name={name} nameZh={nameZh}>
          <Demo />
        </PreviewCard>
      </PreviewErrorBoundary>
    );
  }

  // 2. Storybook fixtures cover most components without requiring duplicate
  //    docs-only demo code. The story-preview-renderer selects the best
  //    story, falling back to bare component instantiation with error boundary.
  const StoryPreview = componentStoryPreviews[name];
  if (StoryPreview) {
    return (
      <PreviewErrorBoundary name={name}>
        <PreviewCard name={name} nameZh={nameZh}>
          <StoryPreview />
        </PreviewCard>
      </PreviewErrorBoundary>
    );
  }

  // 3. No safe preview available — show a friendly fallback.
  //
  //    Previously this step tried to render the bare component via
  //    componentLoaders, but most components require props (items, columns,
  //    src, value, etc.) and crash instantly.  Rather than showing an ugly
  //    error message for every prop-less component, we show a clean
  //    “open Storybook” prompt.
  return <PreviewFallback name={name} />;
}
