import * as React from "react";
import { cn } from "@/lib/utils";

interface RegionLayoutProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  headerHeight?: string;
  footerHeight?: string;
}

export function RegionLayout({
  header,
  left,
  right,
  footer,
  leftWidth = "240px",
  rightWidth = "240px",
  headerHeight = "56px",
  footerHeight = "48px",
  className,
  children,
  ...props
}: RegionLayoutProps) {
  const gridTemplateColumns = [
    left ? leftWidth : "0",
    "1fr",
    right ? rightWidth : "0",
  ].join(" ");

  const gridTemplateRows = [
    header ? headerHeight : "0",
    "1fr",
    footer ? footerHeight : "0",
  ].join(" ");

  const areas: string[] = [];
  if (header) areas.push('"header header header"');
  if (left && right) {
    areas.push('"left content right"');
  } else if (left) {
    areas.push('"left content ."');
  } else if (right) {
    areas.push('". content right"');
  } else {
    areas.push('". content ."');
  }
  if (footer) areas.push('"footer footer footer"');

  return (
    <div
      data-slot="region-layout"
      className={cn("bg-background text-foreground min-h-screen", className)}
      style={{
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows,
        gridTemplateAreas: areas.join(" "),
      }}
      {...props}
    >
      {header && (
        <header
          data-slot="region-header"
          className="bg-background border-b"
          style={{ gridArea: "header" }}
        >
          {header}
        </header>
      )}
      {left && (
        <aside
          data-slot="region-left"
          className="bg-background overflow-y-auto border-r"
          style={{ gridArea: "left" }}
        >
          {left}
        </aside>
      )}
      <main
        data-slot="region-content"
        className="overflow-y-auto"
        style={{ gridArea: "content" }}
      >
        {children}
      </main>
      {right && (
        <aside
          data-slot="region-right"
          className="bg-background overflow-y-auto border-l"
          style={{ gridArea: "right" }}
        >
          {right}
        </aside>
      )}
      {footer && (
        <footer
          data-slot="region-footer"
          className="bg-background border-t"
          style={{ gridArea: "footer" }}
        >
          {footer}
        </footer>
      )}
    </div>
  );
}
