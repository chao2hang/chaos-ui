import * as React from "react";
import { cn } from "@/lib/utils";
import {
  PageHeader,
  type BreadcrumbItemType,
  type PageHeaderProps,
} from "@/components/business/page-header";
import { PageContent } from "@/components/ui/page-container";

type PageChromeVariant = "list" | "document" | "overview";

interface PageChromeProps {
  /**
   * Page-type density (issue #44).
   * - `list`: no in-page title/description; optional compact actions row
   * - `document`: medium header (`PageHeader size="sm"`) + compact content
   * - `overview`: display header + default content gap
   */
  variant: PageChromeVariant;
  /** document / overview; ignored for list */
  title?: string;
  /** document / overview optional; ignored for list */
  description?: string;
  /**
   * list: compact action row only (no h1)
   * document / overview: PageHeader actions
   */
  actions?: React.ReactNode;
  /** document / overview only; ignored for list */
  breadcrumbItems?: BreadcrumbItemType[];
  className?: string;
  children: React.ReactNode;
}

/**
 * @component PageChrome
 * @category business/ux
 * @since 1.7.0
 * @description Page-level density chrome: list hides in-page title; document/overview compose PageHeader + PageContent.
 * Pairs with ListPageShell for CRUD tables without CSS overrides of library headers.
 * / 页级密度壳：list 不渲染页内标题；document/overview 组合 PageHeader + PageContent。
 * @keywords page, chrome, density, list, document, overview, header
 * @example
 * <PageChrome variant="list" actions={<Button size="sm">新增</Button>}>
 *   <ListPageShell filterFields={fields} onSearch={...}>
 *     <SearchTable ... />
 *   </ListPageShell>
 * </PageChrome>
 */
function PageChrome({
  variant,
  title,
  description,
  actions,
  breadcrumbItems,
  className,
  children,
}: PageChromeProps) {
  const isList = variant === "list";
  const isDocument = variant === "document";
  const contentDensity = isList || isDocument ? "compact" : "default";
  const headerSize: NonNullable<PageHeaderProps["size"]> = isDocument
    ? "sm"
    : "default";

  let header: React.ReactNode = null;

  if (isList) {
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
  } else if (title) {
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
    // Document/overview without title but with actions — still show action row
    header = (
      <div
        data-slot="page-chrome-actions"
        className="flex min-h-8 items-center justify-end gap-2"
      >
        {actions}
      </div>
    );
  }

  return (
    <div
      data-slot="page-chrome"
      data-variant={variant}
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
