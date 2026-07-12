"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { NativeSelect } from "@/components/ui/native-select";
import {
  PlusIcon,
  Trash2Icon,
  BellIcon,
  MailIcon,
  MessageSquareIcon,
  GlobeIcon,
} from "@/components/ui/icons";

/**
 * @component NotificationRuleBuilder
 * @category business/workflow
 * @since 1.0.0
 * @description Visual notification rule builder for configuring who gets
 * notified, under what conditions, and via which channels. Supports event
 * triggers, condition groups, recipient selection, and multi-channel delivery.
 * @keywords notification, rule, builder, alert, trigger, condition, channel, recipient
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Comparison operators for conditions. */
type Operator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";

/** Notification channel type. */
type ChannelType = "email" | "sms" | "inApp" | "webhook";

/** A condition in a notification rule. */
interface RuleCondition {
  id: string;
  field: string;
  operator: Operator;
  value: string;
}

/** A recipient for notifications. */
interface RuleRecipient {
  id: string;
  /** Recipient type */
  type: "user" | "role" | "group" | "field";
  /** Recipient identifier (user id, role name, etc.) */
  target: string;
}

/** A notification rule. */
interface NotificationRule {
  id: string;
  /** Rule name */
  name: string;
  /** Event trigger (e.g., "order.created", "invoice.overdue") */
  event: string;
  /** Is the rule active? */
  enabled: boolean;
  /** Conditions (all must match) */
  conditions: RuleCondition[];
  /** Recipients */
  recipients: RuleRecipient[];
  /** Enabled channels */
  channels: ChannelType[];
  /** Message template id */
  templateId?: string;
  /** Priority level */
  priority?: "low" | "normal" | "high" | "urgent";
}

/** Available event trigger option. */
interface EventOption {
  value: string;
  label: string;
  group?: string;
}

/** Available field option for conditions. */
interface FieldOption {
  value: string;
  label: string;
  type?: "string" | "number" | "date" | "enum";
}

/** Props for NotificationRuleBuilder. */
interface NotificationRuleBuilderProps {
  /** Rule data */
  rule: NotificationRule;
  /** Change callback */
  onChange?: (rule: NotificationRule) => void;
  /** Available events */
  events?: EventOption[];
  /** Available fields for conditions */
  fields?: FieldOption[];
  /** Available recipients */
  recipientOptions?: {
    type: RuleRecipient["type"];
    label: string;
    value: string;
  }[];
  /** Available templates */
  templates?: { id: string; name: string }[];
  /** Read-only mode */
  readOnly?: boolean;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const operatorLabels: Record<Operator, string> = {
  eq: "equals",
  neq: "not equals",
  gt: "greater than",
  gte: "≥",
  lt: "less than",
  lte: "≤",
  contains: "contains",
  in: "in",
};

const channelConfig: Record<
  ChannelType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  email: { label: "Email", icon: MailIcon, color: "text-blue-600" },
  sms: { label: "SMS", icon: MessageSquareIcon, color: "text-green-600" },
  inApp: { label: "In-App", icon: BellIcon, color: "text-purple-600" },
  webhook: { label: "Webhook", icon: GlobeIcon, color: "text-orange-600" },
};

const defaultEvents: EventOption[] = [
  { value: "order.created", label: "Order Created", group: "Sales" },
  { value: "order.updated", label: "Order Updated", group: "Sales" },
  { value: "invoice.overdue", label: "Invoice Overdue", group: "Finance" },
  { value: "payment.received", label: "Payment Received", group: "Finance" },
  { value: "stock.low", label: "Low Stock Alert", group: "Inventory" },
  { value: "approval.required", label: "Approval Required", group: "Workflow" },
  { value: "task.assigned", label: "Task Assigned", group: "Workflow" },
];

const defaultFields: FieldOption[] = [
  { value: "amount", label: "Amount", type: "number" },
  { value: "status", label: "Status", type: "enum" },
  { value: "department", label: "Department", type: "string" },
  { value: "priority", label: "Priority", type: "enum" },
  { value: "createdDate", label: "Created Date", type: "date" },
  { value: "dueDate", label: "Due Date", type: "date" },
];

function generateId(): string {
  return `nr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function NotificationRuleBuilder({
  rule,
  onChange,
  events = defaultEvents,
  fields = defaultFields,
  recipientOptions = [],
  templates = [],
  readOnly = false,
  className,
}: NotificationRuleBuilderProps) {
  /* ---- handlers ---- */
  const update = (patch: Partial<NotificationRule>) => {
    if (!onChange) return;
    onChange({ ...rule, ...patch });
  };

  const addCondition = () => {
    update({
      conditions: [
        ...rule.conditions,
        {
          id: generateId(),
          field: fields[0]?.value ?? "",
          operator: "eq",
          value: "",
        },
      ],
    });
  };

  const removeCondition = (id: string) => {
    update({ conditions: rule.conditions.filter((c) => c.id !== id) });
  };

  const updateCondition = (
    id: string,
    field: keyof RuleCondition,
    value: string,
  ) => {
    update({
      conditions: rule.conditions.map((c) =>
        c.id === id ? { ...c, [field]: value } : c,
      ),
    });
  };

  const addRecipient = () => {
    if (recipientOptions.length === 0) return;
    const opt = recipientOptions[0]!;
    update({
      recipients: [
        ...rule.recipients,
        { id: generateId(), type: opt.type, target: opt.value },
      ],
    });
  };

  const removeRecipient = (id: string) => {
    update({ recipients: rule.recipients.filter((r) => r.id !== id) });
  };

  const updateRecipient = (
    id: string,
    field: keyof RuleRecipient,
    value: string,
  ) => {
    update({
      recipients: rule.recipients.map((r) =>
        r.id === id ? { ...r, [field]: value } : r,
      ),
    });
  };

  const toggleChannel = (channel: ChannelType) => {
    const has = rule.channels.includes(channel);
    update({
      channels: has
        ? rule.channels.filter((c) => c !== channel)
        : [...rule.channels, channel],
    });
  };

  return (
    <div
      data-slot="notification-rule-builder"
      className={cn(
        "border-border bg-card space-y-5 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header: name + enabled toggle */}
      <div className="border-border flex items-center justify-between gap-4 border-b pb-4">
        <div className="flex-1">
          {readOnly ? (
            <span className="text-foreground text-lg font-semibold">
              {rule.name}
            </span>
          ) : (
            <Input
              className="h-9 text-lg font-semibold"
              value={rule.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="Rule name"
              aria-label="Rule name"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Enabled</span>
          <Switch
            checked={rule.enabled}
            onCheckedChange={(checked) => update({ enabled: checked })}
            disabled={readOnly}
            aria-label="Enable rule"
          />
        </div>
      </div>

      {/* Event trigger */}
      <div data-slot="rule-event-section">
        <label className="text-foreground mb-1.5 block text-sm font-medium">
          When event fires:
        </label>
        <NativeSelect
          aria-label="Event trigger"
          value={rule.event}
          onChange={(e) => update({ event: e.target.value })}
          disabled={readOnly}
          options={events.map((ev) => ({
            value: ev.value,
            label: `${ev.group ? `${ev.group}: ` : ""}${ev.label}`,
          }))}
        />
      </div>

      {/* Conditions */}
      <div data-slot="rule-conditions-section">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-foreground text-sm font-medium">
            Conditions (all must match):
          </label>
          {!readOnly && (
            <Button variant="outline" size="sm" onClick={addCondition}>
              <PlusIcon className="mr-1 size-3.5" />
              Add
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {rule.conditions.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No conditions — notify on every event occurrence.
            </p>
          ) : (
            rule.conditions.map((cond) => (
              <div
                key={cond.id}
                data-slot="rule-condition"
                className="flex items-center gap-2"
              >
                <div className="min-w-0 flex-1">
                  <NativeSelect
                    size="sm"
                    aria-label="Condition field"
                    value={cond.field}
                    onChange={(e) =>
                      updateCondition(cond.id, "field", e.target.value)
                    }
                    disabled={readOnly}
                    options={fields.map((f) => ({
                      value: f.value,
                      label: f.label,
                    }))}
                  />
                </div>
                <div className="w-32 shrink-0">
                  <NativeSelect
                    size="sm"
                    aria-label="Condition operator"
                    value={cond.operator}
                    onChange={(e) =>
                      updateCondition(cond.id, "operator", e.target.value)
                    }
                    disabled={readOnly}
                    options={Object.entries(operatorLabels).map(
                      ([val, label]) => ({
                        value: val,
                        label,
                      }),
                    )}
                  />
                </div>
                <Input
                  className="h-8 flex-1 text-sm"
                  value={cond.value}
                  onChange={(e) =>
                    updateCondition(cond.id, "value", e.target.value)
                  }
                  placeholder="Value"
                  disabled={readOnly}
                  aria-label="Condition value"
                />
                {!readOnly && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeCondition(cond.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove condition"
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recipients */}
      <div data-slot="rule-recipients-section">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-foreground text-sm font-medium">
            Notify who:
          </label>
          {!readOnly && recipientOptions.length > 0 && (
            <Button variant="outline" size="sm" onClick={addRecipient}>
              <PlusIcon className="mr-1 size-3.5" />
              Add
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {rule.recipients.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No recipients configured.
            </p>
          ) : (
            rule.recipients.map((rec) => (
              <div
                key={rec.id}
                data-slot="rule-recipient"
                className="flex items-center gap-2"
              >
                <div className="w-24 shrink-0">
                  <NativeSelect
                    size="sm"
                    aria-label="Recipient type"
                    value={rec.type}
                    onChange={(e) =>
                      updateRecipient(rec.id, "type", e.target.value)
                    }
                    disabled={readOnly}
                    options={[
                      { value: "user", label: "User" },
                      { value: "role", label: "Role" },
                      { value: "group", label: "Group" },
                      { value: "field", label: "Field" },
                    ]}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <NativeSelect
                    size="sm"
                    aria-label="Recipient target"
                    value={rec.target}
                    onChange={(e) =>
                      updateRecipient(rec.id, "target", e.target.value)
                    }
                    disabled={readOnly}
                    options={recipientOptions
                      .filter((o) => o.type === rec.type)
                      .map((o) => ({ value: o.value, label: o.label }))}
                  />
                </div>
                {!readOnly && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeRecipient(rec.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove recipient"
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Channels */}
      <div data-slot="rule-channels-section">
        <label className="text-foreground mb-2 block text-sm font-medium">
          Delivery channels:
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(channelConfig) as ChannelType[]).map((channel) => {
            const config = channelConfig[channel];
            const Icon = config.icon;
            const isActive = rule.channels.includes(channel);
            return (
              <button
                key={channel}
                type="button"
                data-slot="rule-channel"
                data-active={isActive}
                onClick={() => !readOnly && toggleChannel(channel)}
                disabled={readOnly}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-muted",
                )}
                aria-pressed={isActive}
              >
                <Icon className={cn("size-4", isActive && config.color)} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Template + Priority */}
      {(templates.length > 0 || rule.priority) && (
        <div className="flex flex-wrap gap-4">
          {templates.length > 0 && (
            <div className="flex-1">
              <label className="text-foreground mb-1.5 block text-sm font-medium">
                Template:
              </label>
              <NativeSelect
                aria-label="Message template"
                value={rule.templateId ?? ""}
                onChange={(e) => update({ templateId: e.target.value })}
                disabled={readOnly}
                options={[
                  { value: "", label: "Default template" },
                  ...templates.map((tpl) => ({
                    value: tpl.id,
                    label: tpl.name,
                  })),
                ]}
              />
            </div>
          )}
          <div>
            <label className="text-foreground mb-1.5 block text-sm font-medium">
              Priority:
            </label>
            <div className="w-32">
              <NativeSelect
                aria-label="Priority"
                value={rule.priority ?? "normal"}
                onChange={(e) => {
                  if (e.target.value) {
                    update({
                      priority: e.target.value,
                    } as Partial<NotificationRule>);
                  }
                }}
                disabled={readOnly}
                options={[
                  { value: "low", label: "Low" },
                  { value: "normal", label: "Normal" },
                  { value: "high", label: "High" },
                  { value: "urgent", label: "Urgent" },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { NotificationRuleBuilder };
export type {
  NotificationRuleBuilderProps,
  NotificationRule,
  RuleCondition,
  RuleRecipient,
  ChannelType,
  Operator,
  EventOption,
  FieldOption,
};
