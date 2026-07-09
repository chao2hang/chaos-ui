"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface AnchorSection {
  id: string;
  label: string;
  level?: number;
}

interface AnchorProps {
  sections: AnchorSection[];
  offset?: number;
  className?: string;
}

export function Anchor({ sections = [], offset = 80, className }: AnchorProps) {
  const [active, setActive] = React.useState<string>(sections[0]?.id ?? "");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, offset]);

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav data-slot="anchor" className={cn("space-y-1 text-sm", className)}>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => handleClick(s.id, e)}
          className={cn(
            "text-muted-foreground hover:text-foreground block rounded-sm py-1 transition-colors",
            active === s.id && "text-primary font-medium",
            s.level && s.level > 1 && `pl-${(s.level - 1) * 3}`,
          )}
          style={
            s.level && s.level > 1
              ? { paddingLeft: `${(s.level - 1) * 12}px` }
              : undefined
          }
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
