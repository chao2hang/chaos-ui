import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { ArrowLeftIcon } from "@/components/ui/icons";

interface DetailTab {
  value: string;
  label: string;
  content: React.ReactNode;
}

/**
 * @component DetailLayout
 * @category layout/admin
 * @since 0.2.0
 * @description Detail page layout with title, back button, action bar, and optional tabbed content sections for record details or settings pages / 详情页布局，包含标题、返回按钮、操作栏和可选选项卡内容区域，适用于记录详情或设置页面
 * @keywords detail, layout, tabs, back-button, action-bar, record
 * @example
 * <DetailLayout title="Order #1234" subtitle="Created on 2024-01-01" onBack={handleBack} actions={<SaveButton />}>
 *   <OrderDetails />
 * </DetailLayout>
 */
function DetailLayout({
  title,
  subtitle,
  children,
  tabs,
  actions,
  onBack,
  className,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  tabs?: DetailTab[];
  actions?: React.ReactNode;
  onBack?: () => void;
  className?: string;
}) {
  return (
    <div
      data-slot="detail-layout"
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex items-start gap-4">
        {onBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onBack}
            className="mt-0.5"
          >
            <ArrowLeftIcon />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {tabs && tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0]!.value}>
          <TabsList variant="line">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        children
      )}
    </div>
  );
}

export { DetailLayout };
export type { DetailTab };
