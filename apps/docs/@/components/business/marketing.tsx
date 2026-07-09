"use client";
import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Separator } from "@chaos_team/chaos-ui/ui";

export interface PricingTier {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  currency?: string;
  period?: string;
  features: Array<{ label: string; included: boolean; tooltip?: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier: PricingTier;
  onCta?: (tierId: string) => void;
  className?: string;
}

export function PricingCard({
  tier,
  onCta,
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      data-slot="pricing-card"
      data-tier={tier.id}
      data-highlighted={tier.highlighted ? "true" : undefined}
      className={cn(
        "relative flex flex-col rounded-lg border p-6 transition-shadow",
        tier.highlighted && "border-primary ring-primary/30 shadow-lg ring-1",
        className,
      )}
      {...props}
    >
      {tier.badge && (
        <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-medium">
          {tier.badge}
        </span>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        {tier.description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {tier.description}
          </p>
        )}
      </div>
      <div className="mb-6 flex items-baseline gap-1">
        {typeof tier.price === "number" ? (
          <>
            <span className="text-4xl font-bold tabular-nums">
              {tier.price}
            </span>
            <span className="text-muted-foreground text-sm">
              {tier.currency ?? "¥"}/{tier.period ?? "月"}
            </span>
          </>
        ) : (
          <span className="text-4xl font-bold">{tier.price}</span>
        )}
      </div>
      <Separator className="my-4" />
      <ul className="mb-6 flex-1 space-y-2">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                f.included
                  ? "bg-success/15 text-success"
                  : "bg-muted text-muted-foreground/40",
              )}
            >
              {f.included ? <CheckIcon className="size-3" /> : "×"}
            </span>
            <span
              className={cn(
                !f.included && "text-muted-foreground line-through",
              )}
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant={tier.highlighted ? "default" : "outline"}
        className="w-full"
        onClick={() => onCta?.(tier.id)}
      >
        {tier.ctaLabel ?? "开始使用"}
      </Button>
    </div>
  );
}

interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  tiers: PricingTier[];
  onCta?: (tierId: string) => void;
  className?: string;
}

export function PricingTable({
  tiers = [],
  onCta,
  className,
  ...props
}: PricingTableProps) {
  return (
    <div
      data-slot="pricing-table"
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      {...props}
    >
      {tiers.map((t) => (
        <PricingCard key={t.id} tier={t} onCta={onCta} />
      ))}
    </div>
  );
}

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: { name: string; role?: string; avatar?: string; company?: string };
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  rating,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <figure
      data-slot="testimonial-card"
      className={cn("bg-card rounded-lg border p-6", className)}
      {...props}
    >
      {rating !== undefined && (
        <div
          className="text-warning mb-2 flex gap-0.5"
          aria-label={`评分 ${rating} 星`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden className={i < rating ? "★" : "☆"}>
              ★
            </span>
          ))}
        </div>
      )}
      <blockquote className="text-sm leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="bg-muted size-10 rounded-full" />
        <div>
          <div className="text-sm font-medium">{author.name}</div>
          {(author.role || author.company) && (
            <div className="text-muted-foreground text-xs">
              {[author.role, author.company].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

interface FAQSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{ q: string; a: string }>;
  searchable?: boolean;
  className?: string;
}

export function FAQSection({
  items = [],
  searchable,
  className,
  ...props
}: FAQSectionProps) {
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState<number | null>(0);
  const filtered = items.filter(
    (i) =>
      !q ||
      i.q.toLowerCase().includes(q.toLowerCase()) ||
      i.a.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div
      data-slot="faq-section"
      className={cn("space-y-3", className)}
      {...props}
    >
      {searchable && (
        <div className="space-y-1.5">
          <Label htmlFor="faq-search">搜索常见问题</Label>
          <Input
            id="faq-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="输入关键词..."
          />
        </div>
      )}
      <div className="divide-y rounded-md border">
        {filtered.map((item, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="hover:bg-muted/30 flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
              aria-expanded={open === i}
            >
              {item.q}
              <span className="text-muted-foreground">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="text-muted-foreground px-4 pb-3 text-sm">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
