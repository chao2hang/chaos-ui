/**
 * Lazy preview resolution — never statically import the three mega registries
 * from the preview entry. Each tier is loaded only when needed for `name`.
 *
 * Stories under src/stories import package source via `@/components/*`;
 * apps/docs/next.config.ts maps those aliases to the monorepo root so previews load.
 */
import type { ComponentType } from "react";
import { hasHandDemo } from "@/components/hand-demo-names";

export type PreviewModule = { default: ComponentType };

function wrapNamed(
  Comp: ComponentType | undefined,
  name: string,
): PreviewModule | null {
  if (!Comp) return null;
  const Wrapped = Comp as ComponentType;
  Wrapped.displayName = `Preview(${name})`;
  return { default: Wrapped };
}

/**
 * Resolve the best preview module for a PascalCase component name.
 * Order: hand demo → Storybook story → package loader → empty.
 */
export async function resolvePreviewModule(
  name: string,
): Promise<PreviewModule> {
  if (hasHandDemo(name)) {
    try {
      const mod = await import("@/components/component-previews");
      const wrapped = wrapNamed(mod.componentPreviews[name], name);
      if (wrapped) return wrapped;
    } catch {
      /* fall through */
    }
  }

  try {
    const mod = await import("@/components/component-story-previews");
    const wrapped = wrapNamed(mod.componentStoryPreviews[name], name);
    if (wrapped) return wrapped;
  } catch {
    /* fall through to package loader */
  }

  try {
    const mod = await import("@/components/component-loader");
    const wrapped = wrapNamed(mod.componentLoaders[name], name);
    if (wrapped) return wrapped;
  } catch {
    /* empty */
  }

  return {
    default: function NoPreview() {
      return null;
    },
  };
}
