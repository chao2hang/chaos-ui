"use client";

import * as React from "react";
import {
  BadgeDollarSignIcon,
  MailIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  RadioTowerIcon,
  SmartphoneIcon,
} from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export type MarketingChannel =
  "email" | "sms" | "push" | "social" | "ads" | "offline";

export interface ChannelOption {
  value: MarketingChannel;
  label: string;
  description?: string;
}

export interface ChannelPickerProps {
  value?: MarketingChannel | MarketingChannel[];
  onChange?: (value: MarketingChannel | MarketingChannel[] | undefined) => void;
  options?: ChannelOption[];
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export const defaultChannelOptions: ChannelOption[] = [
  { value: "email", label: "" /* overridden in component */, description: "" },
  { value: "sms", label: "", description: "" },
  { value: "push", label: "", description: "" },
  { value: "social", label: "", description: "" },
  { value: "ads", label: "", description: "" },
  { value: "offline", label: "", description: "" },
];

const channelIcons: Record<
  MarketingChannel,
  React.ComponentType<{ className?: string }>
> = {
  email: MailIcon,
  sms: MessageSquareIcon,
  push: SmartphoneIcon,
  social: MegaphoneIcon,
  ads: BadgeDollarSignIcon,
  offline: RadioTowerIcon,
};

/**
 * @component ChannelPicker
 * @category business/picker
 * @since 0.2.0
 * @description Grid-based marketing channel selector with icon buttons, supporting single or multiple selection / 营销渠道选择器，图标按钮网格布局，支持单选和多选
 * @keywords channel, picker, marketing, email, sms, push, social, ads
 * @example
 * <ChannelPicker value="email" onChange={(v) => console.log(v)} />
 */
export function ChannelPicker({
  value,
  onChange,
  options: optionsProp,
  multiple = false,
  disabled,
  className,
}: ChannelPickerProps) {
  const { t } = useTranslation("marketing");
  const resolvedOptions: ChannelOption[] = React.useMemo(() => {
    const ops = optionsProp ?? defaultChannelOptions;
    return ops.map((opt) => ({
      ...opt,
      label: t(`channelPicker.${opt.value}.label` as any),
      description: t(`channelPicker.${opt.value}.description` as any),
    }));
  }, [optionsProp, t]);
  const selected = React.useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  const toggle = (channel: MarketingChannel) => {
    if (disabled) return;
    if (!multiple) {
      onChange?.(selected.includes(channel) ? undefined : channel);
      return;
    }

    const next = selected.includes(channel)
      ? selected.filter((item) => item !== channel)
      : [...selected, channel];
    onChange?.(next);
  };

  return (
    <div
      data-slot="channel-picker"
      className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {resolvedOptions.map((option) => {
        const Icon = channelIcons[option.value];
        const active = selected.includes(option.value);

        return (
          <Button
            key={option.value}
            type="button"
            variant={active ? "default" : "outline"}
            disabled={disabled}
            aria-pressed={active}
            onClick={() => toggle(option.value)}
            className="h-auto justify-start gap-3 p-3 text-left"
          >
            <Icon className="size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {option.label}
              </span>
              {option.description && (
                <span className="block truncate text-xs opacity-75">
                  {option.description}
                </span>
              )}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
