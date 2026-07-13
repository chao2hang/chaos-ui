declare module "mdx/types" {
  import type * as React from "react";
  export type MDXComponents = {
    [key: string]:
      | React.ComponentType<Record<string, unknown>>
      | keyof React.JSX.IntrinsicElements;
  };
}
