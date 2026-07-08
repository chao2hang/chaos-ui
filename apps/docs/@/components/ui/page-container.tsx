import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const pageContainerVariants = cva("w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      default: "max-w-5xl",
      lg: "max-w-7xl",
      full: "max-w-full",
      none: "",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
    center: {
      true: "mx-auto",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "default",
    center: true,
  },
});

interface PageContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  children: React.ReactNode;
}

/**
 * @component PageContainer
 * @category ui/layout
 * @since 0.2.0
 * @description Responsive page wrapper with configurable max-width, padding, and centering / 响应式页面容器，可配置最大宽度、内边距和居中
 * @keywords page, container, layout, wrapper, max-width, responsive
 * @example
 * <PageContainer size="lg" padding="default" center>
 *   <PageHeader title="Dashboard" />
 *   <PageContent>...</PageContent>
 * </PageContainer>
 */
function PageContainer({
  className,
  size,
  padding,
  center,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      data-slot="page-container"
      className={cn(
        pageContainerVariants({ size, padding, center, className }),
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

/**
 * @component PageHeader
 * @category ui/layout
 * @since 0.2.0
 * @description Page header with title, description, action buttons, and breadcrumb / 页面头部，包含标题、描述、操作按钮和面包屑导航
 * @keywords page, header, title, breadcrumb, actions, layout
 * @example
 * <PageHeader title="Settings" description="Manage your account settings" actions={<Button>Save</Button>} />
 */
function PageHeader({
  className,
  title,
  description,
  actions,
  breadcrumb,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("space-y-2", className)}
      {...props}
    >
      {breadcrumb}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @component PageContent
 * @category ui/layout
 * @since 0.2.0
 * @description Vertically stacked content area for page body / 页面主体内容的垂直布局区域
 * @keywords page, content, body, layout, stack
 * @example
 * <PageContent>
 *   <Card>Section 1</Card>
 *   <Card>Section 2</Card>
 * </PageContent>
 */
function PageContent({ className, children, ...props }: PageContentProps) {
  return (
    <div
      data-slot="page-content"
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { PageContainer, PageHeader, PageContent, pageContainerVariants };
export type { PageContainerProps, PageHeaderProps, PageContentProps };
