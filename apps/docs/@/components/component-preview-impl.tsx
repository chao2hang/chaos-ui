"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import {
  componentLoaders,
  businessComponentNames,
} from "@/components/component-loader";
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

function PreviewMissing({ name }: { name: string }) {
  return (
    <div className="text-muted-foreground text-center">
      <p className="text-sm">
        暂无 <code className="text-xs">{name}</code> 的实时预览
      </p>
      <p className="mt-1 text-xs">请前往 Storybook 查看完整示例。</p>
    </div>
  );
}

function PreviewFallback({ name }: { name: string }) {
  return (
    <div className="not-prose border-muted-foreground/30 my-6 rounded-lg border border-dashed p-6 text-center">
      <p className="text-muted-foreground text-sm">
        No live preview available for <code className="text-xs">{name}</code>.
      </p>
    </div>
  );
}

function PreviewChecking() {
  return (
    <div className="text-muted-foreground flex items-center gap-2 text-xs">
      <span className="bg-muted-foreground/25 size-2 animate-pulse rounded-full" />
      Loading preview…
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
/*  Empty-render sensor                                                       */
/*                                                                            */
/*  Compound/headless components (Dialog, Popover, Tabs, …) render no DOM     */
/*  when instantiated without children, so the preview area would be blank.   */
/*  We detect that after mount and swap in a friendly missing-preview panel.  */
/* -------------------------------------------------------------------------- */

type RenderStatus = "checking" | "hasContent" | "empty";

const emptyRenderGraceMs = 600;

function hasMeaningfulContent(el: HTMLElement) {
  return el.children.length > 0 || Boolean(el.textContent?.trim());
}

function EmptyRenderSensor({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<RenderStatus>("checking");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    setStatus("checking");

    const check = () => {
      if (hasMeaningfulContent(el)) {
        setStatus("hasContent");
        return true;
      }
      return false;
    };

    if (check()) return;

    // Use requestAnimationFrame for initial check before falling back to MutationObserver
    let observer: MutationObserver | null = null;
    let timeout: number | undefined;

    const rafId = requestAnimationFrame(() => {
      if (check()) return;

      observer = new MutationObserver(check);
      observer.observe(el, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      timeout = window.setTimeout(() => {
        if (!check()) setStatus("empty");
        observer?.disconnect();
      }, emptyRenderGraceMs);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [name]);

  return (
    <>
      <div ref={wrapRef} style={{ display: status === "empty" ? "none" : "contents" }}>
        {children}
      </div>
      {status === "checking" && <PreviewChecking />}
      {status === "empty" && <PreviewMissing name={name} />}
    </>
  );
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
  // docs-only demo code.
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

  // 3. Fall back to the auto-generated loader (bare component instantiation).
  const Loader = componentLoaders[name];
  if (!Loader) {
    return <PreviewFallback name={name} />;
  }

  // Business components need concrete data props (user, rows, …) that a bare
  // `<Component />` instantiation can't supply. If we don't have a fixture for
  // one, skip rendering entirely — the throw would otherwise surface in the
  // Next.js dev overlay even though our error boundary catches it.
  if (businessComponentNames.has(name)) {
    return <PreviewFallback name={name} />;
  }

  return (
    <PreviewErrorBoundary name={name}>
      <PreviewCard name={name} nameZh={nameZh}>
        <EmptyRenderSensor name={name}>
          <Loader />
        </EmptyRenderSensor>
      </PreviewCard>
    </PreviewErrorBoundary>
  );
}
