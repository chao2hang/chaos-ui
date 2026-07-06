"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShieldOffIcon } from "lucide-react";

interface ForbiddenProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

function Forbidden({
  title = "403 无权限",
  description = "您没有访问此页面的权限，请联系管理员。",
  action,
  className,
  ...props
}: ForbiddenProps) {
  return (
    <div
      data-slot="forbidden"
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className,
      )}
      {...props}
    >
      <div className="bg-destructive/10 flex size-20 items-center justify-center rounded-full">
        <ShieldOffIcon className="text-destructive size-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
      {!action && (
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => window.history.back()}
        >
          返回上页
        </Button>
      )}
    </div>
  );
}

export { Forbidden };
export type { ForbiddenProps };
