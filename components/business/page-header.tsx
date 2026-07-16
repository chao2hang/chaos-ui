import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItemType[];
  /** Action area — accepts ReactNode or Button array / 操作区，支持 ReactNode 或 Button 数组 */
  actions?: React.ReactNode;
  /** Primary action (highlighted) / 主要操作按钮 */
  primaryAction?: React.ReactNode;
  /** Secondary actions (displayed after primary) / 次要操作列表 */
  secondaryActions?: React.ReactNode[];
  /**
   * Title density (issue #44).
   * - `"default"`: display title (`text-2xl`) — current look
   * - `"sm"`: compact title for document/detail pages
   * / 标题密度；default 保持现有视觉
   */
  size?: "default" | "sm";
  className?: string;
}

/**
 * @component PageHeader
 * @category business/ux
 * @since 0.2.0
 * @description Page header with breadcrumb navigation, title, description, and action buttons / 页面标题栏，包含面包屑导航、标题、描述和操作按钮
 * @keywords page, header, breadcrumb, title, actions
 * @example
 * <PageHeader title="Dashboard" description="Overview of your workspace" breadcrumbItems={items} primaryAction={<Button>Create</Button>} />
 */
function PageHeader({
  title,
  description,
  breadcrumbItems,
  actions,
  primaryAction,
  secondaryActions,
  size = "default",
  className,
}: PageHeaderProps) {
  // Compose actions from primaryAction/secondaryActions if no explicit actions
  const resolvedActions =
    actions ??
    (primaryAction || secondaryActions?.length ? (
      <div className="flex items-center gap-2">
        {secondaryActions}
        {primaryAction}
      </div>
    ) : undefined);

  return (
    <div
      data-slot="page-header"
      data-size={size}
      className={cn("space-y-2", className)}
    >
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {isLast || !item.href ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div
        className={cn(
          "flex justify-between gap-4",
          size === "sm" ? "items-center" : "items-start",
        )}
      >
        <div className={cn(size === "sm" ? "space-y-0.5" : "space-y-1")}>
          <h1
            className={cn(
              "tracking-tight",
              size === "sm" ? "text-lg font-semibold" : "text-2xl font-bold",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "text-muted-foreground",
                size === "sm" && "text-sm",
              )}
            >
              {description}
            </p>
          )}
        </div>
        {resolvedActions && (
          <div className="flex items-center gap-2">{resolvedActions}</div>
        )}
      </div>
    </div>
  );
}

export { PageHeader };
export type { BreadcrumbItemType, PageHeaderProps };
