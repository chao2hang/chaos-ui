"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

/**
 * @component AdminBreadcrumb
 * @category layout
 * @since 0.2.0
 * @description 自动从 pathname 生成面包屑 / Auto-generate breadcrumb from pathname
 * @keywords breadcrumb, navigation, auto, pathname, admin
 * @example
 * <AdminBreadcrumb pathname="/dashboard/users" routeLabels={{ dashboard: 'Dashboard', users: 'Users' }} />
 */

interface AdminBreadcrumbProps extends React.ComponentProps<"nav"> {
  /** Current pathname / 当前路径 */
  pathname?: string;
  /** Route label mapping / 路由标签映射 */
  routeLabels?: Record<string, string>;
  /** Custom breadcrumb items / 自定义面包屑项 */
  items?: Array<{ label: string; href?: string | undefined }>;
  /** Home label / 首页标签 */
  homeLabel?: string;
  /** Home href / 首页链接 */
  homeHref?: string;
  /** Separator / 分隔符 */
  separator?: React.ReactNode;
}

function AdminBreadcrumb({
  className,
  pathname,
  routeLabels = {},
  items = [],
  homeLabel = "Home",
  homeHref = "/",
  separator,
  ...props
}: AdminBreadcrumbProps) {
  const computedItems = React.useMemo(() => {
    if (items) return items;
    if (!pathname) return [];

    const segments = pathname.split("/").filter(Boolean);
    const result: Array<{ label: string; href?: string | undefined }> = [
      { label: homeLabel, href: homeHref },
    ];

    let currentPath = "";
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label =
        routeLabels[segment] ??
        segment.charAt(0).toUpperCase() + segment.slice(1);
      result.push({ label, href: currentPath });
    });

    // Last item should not have href (it's the current page)
    if (result.length > 0) {
      result[result.length - 1]!.href = undefined;
    }

    return result;
  }, [pathname, routeLabels, items, homeLabel, homeHref]);

  if (computedItems.length === 0) return null;

  return (
    <Breadcrumb
      data-slot="admin-breadcrumb"
      className={cn(className)}
      {...props}
    >
      <BreadcrumbList>
        {computedItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { AdminBreadcrumb };
export type { AdminBreadcrumbProps };
