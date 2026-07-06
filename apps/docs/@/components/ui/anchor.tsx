"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const anchorVariants = cva("", {
  variants: {
    direction: {
      vertical: "flex flex-col gap-1",
      horizontal: "flex flex-row gap-3",
    },
  },
  defaultVariants: { direction: "vertical" },
});

const anchorLinkVariants = cva(
  "block text-sm transition-colors hover:text-foreground",
  {
    variants: {
      active: {
        true: "text-primary font-medium",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

interface AnchorLink {
  key: string;
  href: string;
  title: string;
}

interface AnchorProps
  extends React.ComponentProps<"nav">, VariantProps<typeof anchorVariants> {
  links: AnchorLink[];
  /** Offset for active link detection */
  offset?: number;
  /** Replace history or push */
  replace?: boolean;
}

function Anchor({
  className,
  direction,
  links,
  offset = 0,
  ...props
}: AnchorProps) {
  const [activeKey, setActiveKey] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset + 100 && rect.bottom >= offset) {
            setActiveKey(link.key);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links, offset]);

  return (
    <nav
      data-slot="anchor"
      className={cn(anchorVariants({ direction }), className)}
      {...props}
    >
      {links.map((link) => (
        <a
          key={link.key}
          data-slot="anchor-link"
          href={link.href}
          className={cn(anchorLinkVariants({ active: activeKey === link.key }))}
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector(link.href);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {link.title}
        </a>
      ))}
    </nav>
  );
}

export { Anchor, anchorVariants, anchorLinkVariants };
