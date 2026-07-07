"use client";

import * as React from "react";

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
      <>
        {applyDecorators(
          node,
          [...(meta?.decorators ?? []), ...(story.decorators ?? [])],
          args,
        )}
      </>
    );
  }

  StoryPreview.displayName = "StoryPreview";
  return StoryPreview;
}
