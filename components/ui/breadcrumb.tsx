import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";
import { ChevronRightIcon, MoreHorizontalIcon } from "./icons";

/**
 * @component Breadcrumb
 * @category ui/navigation
 * @since 0.2.0
 * @description Navigation aid showing the current page's location within a hierarchy / 显示当前页面在层级结构中位置的导航辅助
 * @keywords breadcrumb, navigation, path, hierarchy
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */
function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  const { t } = useTranslation("ui");
  return (
    <nav
      aria-label={t("breadcrumb.navLabel")}
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

/**
 * @component BreadcrumbList
 * @category ui/navigation
 * @since 0.2.0
 * @description Ordered list container for breadcrumb items / 面包屑项的有序列表容器
 * @keywords breadcrumb, list, navigation
 * @example
 * <BreadcrumbList>
 *   <BreadcrumbItem>...</BreadcrumbItem>
 * </BreadcrumbList>
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component BreadcrumbItem
 * @category ui/navigation
 * @since 0.2.0
 * @description A single item within a BreadcrumbList / 面包屑列表中的单个项
 * @keywords breadcrumb, item, navigation
 * @example
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/parent">Parent</BreadcrumbLink>
 * </BreadcrumbItem>
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

/**
 * @component BreadcrumbLink
 * @category ui/navigation
 * @since 0.2.0
 * @description A clickable link within a breadcrumb item, renderable as any element / 面包屑中的可点击链接，可渲染为任意元素
 * @keywords breadcrumb, link, navigation, render
 * @example
 * <BreadcrumbLink href="/home">Home</BreadcrumbLink>
 */
function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "cursor-pointer transition-colors hover:text-foreground",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
}

/**
 * @component BreadcrumbPage
 * @category ui/navigation
 * @since 0.2.0
 * @description Represents the current page in a breadcrumb, not a link / 表示面包屑中的当前页面，不可点击
 * @keywords breadcrumb, current, page, active
 * @example
 * <BreadcrumbPage>Current Page</BreadcrumbPage>
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

/**
 * @component BreadcrumbSeparator
 * @category ui/navigation
 * @since 0.2.0
 * @description Visual separator between breadcrumb items, defaults to a chevron / 面包屑项之间的分隔符，默认为箭头图标
 * @keywords breadcrumb, separator, divider
 * @example
 * <BreadcrumbSeparator />
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

/**
 * @component BreadcrumbEllipsis
 * @category ui/navigation
 * @since 0.2.0
 * @description Collapsed placeholder for truncated breadcrumb items / 面包屑项省略时的折叠占位符
 * @keywords breadcrumb, ellipsis, collapse, more, truncate
 * @example
 * <BreadcrumbEllipsis />
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { t } = useTranslation("ui");
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">{t("breadcrumb.more")}</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
