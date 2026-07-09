"use client";

import * as React from "react";
import { PageHeader } from "@chaos_team/chaos-ui/business";
import { Button } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";

interface MobilePageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  onBack?: () => void;
  onMenu?: () => void;
  className?: string;
}

function MobilePageHeader({
  onBack,
  onMenu,
  className,
  ...props
}: MobilePageHeaderProps) {
  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-10 flex items-center gap-3 border-b p-4",
        "md:static md:z-auto md:mb-6 md:border-0 md:p-0",
        className,
      )}
    >
      {onBack && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeftIcon className="size-5" />
        </Button>
      )}
      <div className="min-w-0 flex-1">
        <PageHeader {...props} />
      </div>
      {onMenu && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMenu}
          className="shrink-0"
        >
          <MenuIcon className="size-5" />
        </Button>
      )}
    </div>
  );
}

export { MobilePageHeader };
export type { MobilePageHeaderProps };
