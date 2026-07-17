import * as React from "react";
import { cn } from "@/lib/utils";
import {
  PageHeader,
  type BreadcrumbItemType,
  type PageHeaderProps,
} from "@/components/business/page-header";
import { PageContent } from "@/components/ui/page-container";

/**
 * Page-type density (#44 / #55).
 * - `list`: no title; optional compact actions row
 * - `form`: no title, no top bar (create/edit; submit in card/footer)
 * - `detail`: no title; optional thin `identity` slot (bill no + status)
 * - `overview`: display PageHeader + default density
 * - `document`: **deprecated** alias of `form` (no in-page title)
 */
type PageChromeVariant =
  | "list"
  | "form"
  | "detail"
  | "overview"
  /** @deprecated Use `form`. Behavior matches form (no in-page title). */
  | "document";

interface PageChromeProps {
  /**
   * Page-type density (issues #44 / #55).
   * Prefer `list` | `form` | `detail` | `overview`. `document` is deprecated → `form`.
   */
  variant: PageChromeVariant;
  /** Only `overview` renders title; ignored for list / form / detail / document */
  title?: string;
  /** Only `overview`; ignored otherwise */
  description?: string;
  /**
   * list: optional **page-level** compact action row (no h1).
   * **Do not** put CRUD 刷新/新增 here (#58) — use `ListPageShell` toolbar
   * on the same row as FilterBar instead. Prefer leaving list `actions` empty.
   * overview: PageHeader actions
   * form / detail / document: ignored (detail uses `identity`)
   */
  actions?: React.ReactNode;
  /**
   * Only `detail`: thin identity strip (bill no, status badge, secondary actions).
   * Not a PageHeader / not text-2xl.
   */
  identity?: React.ReactNode;
  /** Only `overview`; ignored otherwise */
  breadcrumbItems?: BreadcrumbItemType[];
  className?: string;
  children: React.ReactNode;
}

function resolveVariant(
  variant: PageChromeVariant,
): "list" | "form" | "detail" | "overview" {
  if (variant === "document") return "form";
  return variant;
}

/**
 * @component PageChrome
 * @category business/ux
 * @since 1.7.0
 * @description Page-level density chrome. list / form / detail hide in-page title
 * (shell breadcrumb + tabs locate the page). overview keeps display header.
 * `document` is a deprecated alias of `form` (#55).
 * List CRUD actions: put on `ListPageShell` toolbar (same row as filter), **not** `actions` (#58).
 * / 页级密度壳：list/form/detail 不渲染页内大标题；列表主操作走 ListPageShell 同行 toolbar。
 * @keywords page, chrome, density, list, form, detail, document, overview, header, identity
 * @example
 * <PageChrome variant="list">
 *   <ListPageShell filterFields={fields} onSearch={...} toolbar={<Button size="sm">新增</Button>}>
 *     <SearchTable ... />
 *   </ListPageShell>
 * </PageChrome>
 * <PageChrome variant="detail" identity={<><span>SO-001</span><Badge>已审</Badge></>}>
 *   ...
 * </PageChrome>
 */
function PageChrome({
  variant,
  title,
  description,
  actions,
  identity,
  breadcrumbItems,
  className,
  children,
}: PageChromeProps) {
  const mode = resolveVariant(variant);
  const contentDensity = mode === "overview" ? "default" : "compact";

  let header: React.ReactNode = null;

  if (mode === "list") {
    if (actions) {
      header = (
        <div
          data-slot="page-chrome-actions"
          className="flex min-h-8 items-center justify-end gap-2"
        >
          {actions}
        </div>
      );
    }
  } else if (mode === "detail") {
    if (identity) {
      header = (
        <div
          data-slot="page-chrome-identity"
          className="flex min-h-8 flex-wrap items-center gap-2 py-0.5 text-sm"
        >
          {identity}
        </div>
      );
    }
  } else if (mode === "overview") {
    if (title) {
      const headerSize: NonNullable<PageHeaderProps["size"]> = "default";
      header = (
        <PageHeader
          title={title}
          {...(description !== undefined ? { description } : {})}
          {...(actions !== undefined ? { actions } : {})}
          {...(breadcrumbItems !== undefined ? { breadcrumbItems } : {})}
          size={headerSize}
        />
      );
    } else if (actions) {
      header = (
        <div
          data-slot="page-chrome-actions"
          className="flex min-h-8 items-center justify-end gap-2"
        >
          {actions}
        </div>
      );
    }
  }
  // form (and document→form): no header chrome

  return (
    <div
      data-slot="page-chrome"
      data-variant={variant}
      data-mode={mode}
      className={cn(
        "flex min-h-0 flex-col",
        contentDensity === "compact" ? "gap-3" : "gap-6",
        className,
      )}
    >
      {header}
      <PageContent density={contentDensity}>{children}</PageContent>
    </div>
  );
}

export { PageChrome };
export type { PageChromeProps, PageChromeVariant };
