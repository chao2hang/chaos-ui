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
};

type StoryModule = {
  default?: {
    component?: React.ComponentType<any>;
    args?: StoryArgs;
    decorators?: Decorator[];
  };
  [key: string]: unknown;
};

const storyPreference = ["Preview", "Default", "Basic", "Primary"];

function isEmptyPreview(args: StoryArgs): boolean {
  // No args at all → no data to show
  if (!args || Object.keys(args).length === 0) return true;
  // Every arg that's an array is empty → no data to show
  const values = Object.values(args);
  if (values.length > 0 && values.every((v) => Array.isArray(v) && v.length === 0)) return true;
  return false;
}

function isStory(value: unknown): value is StoryLike {
  return Boolean(value && typeof value === "object");
}

function pickStory(mod: StoryModule): StoryLike | null {
  for (const key of storyPreference) {
    const story = mod[key];
    if (isStory(story)) return story;
  }

  for (const [key, story] of Object.entries(mod)) {
    if (key === "default" || key.startsWith("__")) continue;
    if (isStory(story)) return story;
  }

  return null;
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
    const story = pickStory(storyModule);

    if (!story) return null;

    const args = {
      ...(meta?.args ?? {}),
      ...(story.args ?? {}),
    };

    // When story provides no meaningful data, show a helpful placeholder
    // instead of rendering an empty component that looks broken.
    if (isEmptyPreview(story.args ?? {}) && isEmptyPreview(meta?.args ?? {})) {
      return (
        <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/20 p-6 text-center">
          <div className="text-sm">
            <p className="text-muted-foreground font-medium">No preview</p>
            <p className="text-muted-foreground/60 mt-1 text-xs">
              This story doesn&apos;t include example data.{" "}
              <br className="hidden sm:inline" />
              Open Storybook for interactive demos with real data.
            </p>
          </div>
        </div>
      );
    }

    const node = story.render
      ? story.render(args)
      : meta?.component
        ? React.createElement(meta.component, args)
        : null;

    if (!node) return null;

    return (
      <StoryErrorBoundary
        name={storyModule.default?.component?.displayName ?? storyModule.default?.component?.name ?? "Component"}
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
