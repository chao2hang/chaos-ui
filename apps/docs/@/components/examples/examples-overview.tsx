"use client";

import Link from "next/link";
import { useDict } from "@/hooks/use-dict";

export function ExamplesOverview() {
  const dict = useDict();
  const cards = [
    {
      href: "/examples/admin",
      title: dict.examples.adminCardTitle,
      description: dict.examples.adminCardDesc,
    },
    {
      href: "/examples/public",
      title: dict.examples.publicCardTitle,
      description: dict.examples.publicCardDesc,
    },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          {dict.examples.overviewTitle}
        </h1>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          {dict.examples.overviewDesc}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-card hover:bg-muted/40 group rounded-xl border p-6 transition-colors"
          >
            <h2 className="text-xl font-semibold tracking-tight group-hover:underline">
              {card.title}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {card.description}
            </p>
            <span className="text-primary mt-4 inline-flex text-sm font-medium">
              {dict.examples.enterTemplate} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
