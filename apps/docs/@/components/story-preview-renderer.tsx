"use client";

import * as React from "react";

// ─── Error boundary for story preview crashes ──────────────────────

type ErrorBoundaryProps = { children: React.ReactNode; name: string };
type ErrorBoundaryState = { hasError: boolean; errorMessage: string };

class StoryErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-destructive/30 bg-destructive/5 p-6 text-center">
          <div className="text-sm">
            <p className="font-medium text-destructive">Preview unavailable</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {this.props.name} requires specific props to render.{" "}
              <br className="hidden sm:inline" />
              View the Storybook docs for examples with data.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

type StoryArgs = Record<string, unknown>;

type Decorator = (
  Story: React.ComponentType,
  context?: { args: StoryArgs },
) => React.ReactNode;

type StoryLike = {
  args?: StoryArgs;
  decorators?: Decorator[];
  render?: (args: StoryArgs) => React.ReactNode;
  // Storybook stories may carry `play` or other metadata
  play?: unknown;
};

type StoryModule = {
  default?: {
    component?: React.ComponentType<Record<string, unknown>>;
    args?: StoryArgs;
    decorators?: Decorator[];
  };
  [key: string]: unknown;
};

const storyPreference = ["Preview", "Default", "Basic", "Primary", "Demo"];

/**
 * Check if args are truly empty (no data to render).
 * Only returns true when args is null/undefined or every value is an empty array.
 */
function isEmptyArgs(args: StoryArgs): boolean {
  if (!args || Object.keys(args).length === 0) return true;
  const values = Object.values(args);
  if (
    values.length > 0 &&
    values.every((v) => Array.isArray(v) && v.length === 0)
  )
    return true;
  return false;
}

/**
 * Pick the best story for preview.
 *
 * Strategy (ordered by reliability):
 * 1. Preferred-named stories with render functions — always safe
 * 2. Preferred-named stories with non-empty args — safe (data provided)
 * 3. Any story with a render function — always safe
 * 4. Any story with non-empty args — safe (data provided)
 * 5. LAST RESORT: Preferred-named stories with empty args + component on meta.
 *    Many simple components (Spinner, Badge, Tag, Typography) render fine
 *    without props. The error boundary catches any that don't.
 */
function pickBestStory(mod: StoryModule): StoryLike | null {
  // 1. Preferred names with render functions
  for (const key of storyPreference) {
    const story = mod[key];
    if (!isStory(story)) continue;
    if (story.render) return story;
  }

  // 2. Preferred names with non-empty args
  for (const key of storyPreference) {
    const story = mod[key];
    if (!isStory(story)) continue;
    if (!isEmptyArgs(story.args ?? {})) return story;
  }

  // 3. Any story with a render function
  for (const [key, story] of Object.entries(mod)) {
    if (key === "default" || key.startsWith("__")) continue;
    if (!isStory(story)) continue;
    if (story.render) return story;
  }

  // 4. Any story with non-empty args
  for (const [key, story] of Object.entries(mod)) {
    if (key === "default" || key.startsWith("__")) continue;
    if (!isStory(story)) continue;
    if (!isEmptyArgs(story.args ?? {})) return story;
  }

  // 5. No safe story found.
  //
  //    Previously this step returned stories with empty args, relying on the
  //    error boundary to catch crashes.  But most components require props
  //    (items, columns, src, value, …) and crash instantly, producing ugly
  //    error cards on every docs page.  Returning null here lets the caller
  //    fall through to the friendly “No live preview” fallback.
  return null;
}

function isStory(value: unknown): value is StoryLike {
  // Must be an object but not a function (React component)
  return Boolean(value && typeof value === "object");
}

function applyDecorators(
  node: React.ReactNode,
  decorators: Decorator[],
  args: Record<string, unknown>,
) {
  return decorators.reduceRight((child, decorator) => {
    const Story = () => <>{child}</>;
    return decorator(Story, { args });
  }, node);
}

export function createStoryPreview(mod: unknown): React.ComponentType {
  const storyModule = mod as StoryModule;
  function StoryPreview() {
    const meta = storyModule.default;
    const story = pickBestStory(storyModule);

    if (!story) {
      return (
        <div className="text-muted-foreground py-8 text-center text-sm">
          No live preview available for this component.
          <br />
          <span className="text-xs">Open Storybook for interactive demos.</span>
        </div>
      );
    }

    const args = {
      ...(meta?.args ?? {}),
      ...(story.args ?? {}),
    };

    const hasRender = typeof story.render === "function";
    const hasComponent = Boolean(meta?.component);

    // Render the story node, catching any errors from render functions
    // that throw synchronously (outside React's error boundary).
    let node: React.ReactNode = null;
    try {
      node = hasRender
        ? story.render!(args)
        : hasComponent
          ? React.createElement(meta!.component!, args)
          : null;
    } catch {
      // render function threw synchronously — return null so the parent
      // error boundary or fallback handles it gracefully.
      return null;
    }

    if (!node) {
      return (
        <div className="text-muted-foreground py-8 text-center text-sm">
          No live preview available for this component.
          <br />
          <span className="text-xs">Open Storybook for interactive demos.</span>
        </div>
      );
    }

    return (
      <StoryErrorBoundary
        name={
          storyModule.default?.component?.displayName ??
          storyModule.default?.component?.name ??
          "Component"
        }
      >
        <>
          {applyDecorators(
            node,
            [...(meta?.decorators ?? []), ...(story.decorators ?? [])],
            args,
          )}
        </>
      </StoryErrorBoundary>
    );
  }

  StoryPreview.displayName = "StoryPreview";
  return StoryPreview;
}
