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
