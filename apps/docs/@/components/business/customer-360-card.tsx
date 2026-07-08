"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @component Customer360Card
 * @category business/crm
 * @since 1.0.0
 * @description Customer 360° view card showing profile, key metrics,
 * contact info, recent activity, and relationship health score.
 * @keywords crm, customer, 360, profile, metrics, health, relationship
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Key metric for the customer. */
interface CustomerMetric {
  label: string;
  value: string | number;
  /** Optional trend indicator. */
  trend?: "up" | "down" | "flat";
  /** Optional delta text. */
  delta?: string;
}

/** Contact person. */
interface CustomerContact {
  id: string;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  isPrimary?: boolean;
}

/** Recent activity item. */
interface CustomerActivity {
  id: string;
  type: "order" | "call" | "email" | "meeting" | "note" | "ticket";
  title: string;
  date: string;
  description?: string;
}

/** Props for Customer360Card. */
interface Customer360CardProps {
  /** Customer name. */
  name: string;
  /** Customer logo URL. */
  logo?: string;
  /** Industry classification. */
  industry?: string;
  /** Customer tier/level. */
  tier?: "platinum" | "gold" | "silver" | "bronze";
  /** Health score 0–100. */
  healthScore?: number;
  /** Key metrics. */
  metrics?: CustomerMetric[];
  /** Contact persons. */
  contacts?: CustomerContact[];
  /** Recent activities. */
  activities?: CustomerActivity[];
  /** Total lifetime value. */
  lifetimeValue?: number;
  /** Currency symbol. */
  currencySymbol?: string;
  /** Tags. */
  tags?: string[];
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const tierConfig: Record<string, { label: string; className: string }> = {
  platinum: { label: "Platinum", className: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200" },
  gold: { label: "Gold", className: "bg-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-200" },
  silver: { label: "Silver", className: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200" },
  bronze: { label: "Bronze", className: "bg-orange-200 text-orange-800 dark:bg-orange-950 dark:text-orange-200" },
};

const activityIcons: Record<string, string> = {
  order: "🛒",
  call: "📞",
  email: "✉️",
  meeting: "🗓️",
  note: "📝",
  ticket: "🎫",
};

function healthColor(score: number): { text: string; bg: string; ring: string } {
  if (score >= 80) return { text: "text-emerald-600", bg: "bg-emerald-500", ring: "text-emerald-500" };
  if (score >= 60) return { text: "text-blue-600", bg: "bg-blue-500", ring: "text-blue-500" };
  if (score >= 40) return { text: "text-amber-600", bg: "bg-amber-500", ring: "text-amber-500" };
  return { text: "text-destructive", bg: "bg-destructive", ring: "text-destructive" };
}

const trendIcons: Record<string, string> = {
  up: "↑",
  down: "↓",
  flat: "→",
};

const trendColors: Record<string, string> = {
  up: "text-emerald-600",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

function formatMoney(v: number, symbol: string): string {
  return `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function Customer360Card({
  name,
  logo,
  industry,
  tier,
  healthScore,
  metrics = [],
  contacts = [],
  activities = [],
  lifetimeValue,
  currencySymbol = "¥",
  tags = [],
  className,
}: Customer360CardProps) {
  const tierInfo = tier ? tierConfig[tier] : null;
  const health = healthScore != null ? healthColor(healthScore) : null;
  const healthPct = healthScore ?? 0;

  return (
    <div
      data-slot="customer-360-card"
      className={cn("space-y-5 rounded-xl border border-border bg-card p-5 shadow-sm", className)}
    >
      {/* Header / Profile */}
      <div className="flex items-start gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={name} className="size-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-primary">{name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-foreground">{name}</h3>
            {tierInfo && (
              <Badge className={cn("text-xs", tierInfo.className)}>{tierInfo.label}</Badge>
            )}
          </div>
          {industry && (
            <p className="mt-0.5 text-sm text-muted-foreground">{industry}</p>
          )}
          {tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Health score gauge */}
        {health && (
          <div className="flex flex-col items-center" data-slot="health-score">
            <div className="relative size-16">
              <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={health.ring}
                  strokeDasharray={`${(healthPct / 100) * 175.9} 175.9`}
                />
              </svg>
              <div className={cn("absolute inset-0 flex items-center justify-center text-lg font-bold", health.text)}>
                {healthPct}
              </div>
            </div>
            <span className="mt-0.5 text-xs text-muted-foreground">Health</span>
          </div>
        )}
      </div>

      {/* Metrics row */}
      {metrics.length > 0 && (
        <div data-slot="customer-metrics" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              data-slot="customer-metric"
              className="rounded-lg border border-border bg-muted/20 p-3"
            >
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="mt-0.5 text-lg font-bold tabular-nums text-foreground">{m.value}</div>
              {m.trend && m.delta && (
                <div className={cn("mt-0.5 flex items-center gap-1 text-xs", trendColors[m.trend])}>
                  <span>{trendIcons[m.trend]}</span>
                  <span>{m.delta}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lifetime value */}
      {lifetimeValue != null && (
        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
          <span className="text-sm text-muted-foreground">Lifetime Value</span>
          <span className="text-xl font-bold tabular-nums text-primary">
            {formatMoney(lifetimeValue, currencySymbol)}
          </span>
        </div>
      )}

      {/* Two column: contacts + activities */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Contacts */}
        {contacts.length > 0 && (
          <div data-slot="customer-contacts">
            <h4 className="mb-2 text-sm font-semibold text-foreground">Key Contacts</h4>
            <div className="space-y-2">
              {contacts.map((c) => (
                <div
                  key={c.id}
                  data-slot="contact-item"
                  className="flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                      {c.isPrimary && (
                        <Badge variant="outline" className="text-[10px]">Primary</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{c.title}</div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    {c.phone && <div>{c.phone}</div>}
                    {c.email && <div className="truncate">{c.email}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent activities */}
        {activities.length > 0 && (
          <div data-slot="customer-activities">
            <h4 className="mb-2 text-sm font-semibold text-foreground">Recent Activity</h4>
            <div className="space-y-2">
              {activities.map((a) => (
                <div
                  key={a.id}
                  data-slot="activity-item"
                  className="flex items-start gap-2 rounded-md border border-border bg-muted/20 px-3 py-2"
                >
                  <span className="text-base">{activityIcons[a.type] ?? "•"}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{a.title}</div>
                    {a.description && (
                      <div className="text-xs text-muted-foreground">{a.description}</div>
                    )}
                    <div className="mt-0.5 text-xs text-muted-foreground">{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {metrics.length === 0 && contacts.length === 0 && activities.length === 0 && lifetimeValue == null && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No customer data available
        </div>
      )}
    </div>
  );
}

export { Customer360Card };
export type { Customer360CardProps, CustomerMetric, CustomerContact, CustomerActivity };
