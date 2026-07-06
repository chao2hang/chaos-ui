"use client";

import {
  Component,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  componentLoaders,
  businessComponentNames,
} from "@/components/component-loader";
import { componentPreviews } from "@/components/component-previews";

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
      <div className="flex min-h-[120px] items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--color-muted)_10px,var(--color-muted)_12px)] [background-size:20px_20px] p-8">
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

function EmptyRenderSensor({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  // `useLayoutEffect` so we measure after commit but before paint on client.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // A component that only registers a portal / provider has no rendered
    // children in its inline slot; treat that as empty.
    const meaningful = el.children.length > 0 || el.textContent?.trim();
    setIsEmpty(!meaningful);
  }, [name]);

  // Re-check on a microtask in case the child renders asynchronously
  // (e.g. dynamic import hydration).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = wrapRef.current;
      if (!el) return;
      const meaningful = el.children.length > 0 || el.textContent?.trim();
      setIsEmpty(!meaningful);
    });
    return () => cancelAnimationFrame(id);
  }, [name]);

  return (
    <>
      <div ref={wrapRef} style={{ display: isEmpty ? "none" : "contents" }}>
        {children}
      </div>
      {isEmpty && <PreviewMissing name={name} />}
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

  // 2. Fall back to the auto-generated loader (bare component instantiation).
  const Loader = componentLoaders[name];
  if (!Loader) {
    return <PreviewFallback name={name} />;
  }

  // Business components need concrete data props (user, rows, …) that a bare
  // `<Component />` instantiation can't supply. If we don't have a hand-authored
  // fixture for one, skip rendering entirely — the throw would otherwise
  // surface in the Next.js dev overlay even though our error boundary catches it.
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
