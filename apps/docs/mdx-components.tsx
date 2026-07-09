import type { MDXComponents } from "mdx/types"
import * as React from "react"

/**
 * Next.js convention: default-exported map of MDX element overrides.
 * Maps standard HTML elements produced by MDX to Tailwind-styled versions
 * visually aligned with the antd-style docs site. Dark-mode variants are
 * included because the site uses `next-themes` with `attribute="class"`.
 *
 * No third-party typography plugin is used — pure Tailwind utility classes.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className="mt-2 mb-6 text-4xl font-bold tracking-tight text-foreground"
        {...props}
      />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="mt-10 mb-4 text-[28px] font-semibold tracking-tight text-foreground border-b pb-2 border-border"
        {...props}
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="mt-8 mb-3 text-2xl font-semibold text-foreground"
        {...props}
      />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        className="mt-6 mb-2 text-xl font-medium text-foreground"
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className="my-4 leading-[1.75] text-foreground/90"
        {...props}
      />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className="my-4 ml-6 list-disc space-y-1.5 leading-[1.75] text-foreground/90 marker:text-muted-foreground"
        {...props}
      />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className="my-4 ml-6 list-decimal space-y-1.5 leading-[1.75] text-foreground/90 marker:text-muted-foreground"
        {...props}
      />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="pl-1" {...props} />,
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="text-brand-500 underline-offset-4 hover:underline font-medium"
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="my-6 pl-4 border-l-4 border-brand-500/50 bg-muted/40 rounded-r-md py-2 text-foreground/80 italic"
        {...props}
      />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-8 border-border" {...props} />,
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table
          className="w-full border-collapse text-sm text-foreground"
          {...props}
        />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead
        className="bg-muted/60 [&_tr]:border-b [&_tr]:border-border"
        {...props}
      />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody
        className="[&_tr:last-child]:border-0 [&_tr]:border-b [&_tr]:border-border"
        {...props}
      />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className="transition-colors hover:bg-muted/40" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th
        className="px-4 py-2.5 text-left font-semibold align-top"
        {...props}
      />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td className="px-4 py-2.5 align-top text-foreground/90" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm font-mono leading-relaxed text-foreground dark:bg-muted/30"
        {...props}
      />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90 dark:bg-muted/60"
        {...props}
      />
    ),
    inlineCode: (props: React.HTMLAttributes<HTMLElement>) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90 dark:bg-muted/60"
        {...props}
      />
    ),
    ...components,
  }
}
