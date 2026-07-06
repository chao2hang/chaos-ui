import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminBreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminBreadcrumbProps extends React.ComponentProps<"div"> {
  items: AdminBreadcrumbItem[];
  separator?: React.ReactNode;
}

export function AdminBreadcrumb({
  items,
  separator = "/",
  className,
  ...props
}: AdminBreadcrumbProps) {
  return (
    <nav
      data-slot="admin-breadcrumb"
      aria-label="Breadcrumb"
      className={cn(
        "text-muted-foreground flex items-center gap-1.5 text-sm",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-muted-foreground/50 select-none">
              {separator}
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
