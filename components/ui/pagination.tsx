import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "@/components/ui/icons";

/**
 * @component Pagination
 * @category ui/navigation
 * @since 0.2.0
 * @description Root navigation wrapper for paginated content / 分页导航根容器
 * @keywords pagination, navigation, paging, page, nav
 * @example
 * <Pagination>
 *   <PaginationContent>...</PaginationContent>
 * </Pagination>
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

/**
 * @component PaginationContent
 * @category ui/navigation
 * @since 0.2.0
 * @description Flex container for pagination items / 分页项弹性布局容器
 * @keywords pagination, content, items list
 * @example
 * <PaginationContent>
 *   <PaginationItem>...</PaginationItem>
 * </PaginationContent>
 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

/**
 * @component PaginationItem
 * @category ui/navigation
 * @since 0.2.0
 * @description Individual list item wrapper within pagination / 分页中的单个列表项容器
 * @keywords pagination, item, list item
 * @example
 * <PaginationItem>
 *   <PaginationLink href="/page/2">2</PaginationLink>
 * </PaginationItem>
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

/**
 * @component PaginationLink
 * @category ui/navigation
 * @since 0.2.0
 * @description Styled anchor link for a page number, with active state / 分页链接按钮，支持当前页高亮状态
 * @keywords pagination, link, page, anchor, active
 * @example
 * <PaginationLink href="/page/3" isActive>3</PaginationLink>
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

/**
 * @component PaginationPrevious
 * @category ui/navigation
 * @since 0.2.0
 * @description Button to navigate to the previous page / 跳转到上一页的按钮
 * @keywords pagination, previous, back, navigation
 * @example
 * <PaginationPrevious href="/page/1" />
 */
function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

/**
 * @component PaginationNext
 * @category ui/navigation
 * @since 0.2.0
 * @description Button to navigate to the next page / 跳转到下一页的按钮
 * @keywords pagination, next, forward, navigation
 * @example
 * <PaginationNext href="/page/3" />
 */
function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

/**
 * @component PaginationEllipsis
 * @category ui/navigation
 * @since 0.2.0
 * @description Ellipsis placeholder indicating truncated page range / 省略号占位符，表示被折叠的页码范围
 * @keywords pagination, ellipsis, more, truncated, dots
 * @example
 * <PaginationEllipsis />
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
