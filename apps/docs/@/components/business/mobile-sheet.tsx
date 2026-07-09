"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";
import { XIcon } from "lucide-react";

interface MobileSheetProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  actions?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileSheet({
  children,
  title,
  description,
  trigger,
  actions,
  side = "bottom",
  open,
  onOpenChange,
  className,
}: MobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <SheetTrigger
          render={trigger as React.ReactElement}
          data-slot="mobile-sheet-trigger"
        />
      )}
      <SheetContent
        side={side}
        className={cn("h-[80vh]", "sm:h-auto sm:max-h-[90vh]", className)}
      >
        <SheetHeader className="border-b p-4">
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 overflow-auto p-4">{children}</div>
        {actions && (
          <SheetFooter className="border-t p-4">{actions}</SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export { MobileSheet };
export type { MobileSheetProps };
