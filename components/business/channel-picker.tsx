"use client"

import * as React from "react"
import {
  BadgeDollarSignIcon,
  MailIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  RadioTowerIcon,
  SmartphoneIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MarketingChannel = "email" | "sms" | "push" | "social" | "ads" | "offline"

export interface ChannelOption {
  value: MarketingChannel
  label: string
  description?: string
}

export interface ChannelPickerProps {
  value?: MarketingChannel | MarketingChannel[]
  onChange?: (value: MarketingChannel | MarketingChannel[] | undefined) => void
  options?: ChannelOption[]
  multiple?: boolean
  disabled?: boolean
  className?: string
}

export const defaultChannelOptions: ChannelOption[] = [
  { value: "email", label: "Email", description: "Lifecycle and newsletters" },
  { value: "sms", label: "SMS", description: "Urgent account messages" },
  { value: "push", label: "Push", description: "Mobile notifications" },
  { value: "social", label: "Social", description: "Organic distribution" },
  { value: "ads", label: "Ads", description: "Paid acquisition" },
  { value: "offline", label: "Offline", description: "Events and retail" },
]

const channelIcons: Record<MarketingChannel, React.ComponentType<{ className?: string }>> = {
  email: MailIcon,
  sms: MessageSquareIcon,
  push: SmartphoneIcon,
  social: MegaphoneIcon,
  ads: BadgeDollarSignIcon,
  offline: RadioTowerIcon,
}

export function ChannelPicker({
  value,
  onChange,
  options = defaultChannelOptions,
  multiple = false,
  disabled,
  className,
}: ChannelPickerProps) {
  const selected = React.useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value]
  )

  const toggle = (channel: MarketingChannel) => {
    if (disabled) return
    if (!multiple) {
      onChange?.(selected.includes(channel) ? undefined : channel)
      return
    }

    const next = selected.includes(channel)
      ? selected.filter((item) => item !== channel)
      : [...selected, channel]
    onChange?.(next)
  }

  return (
    <div data-slot="channel-picker" className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {options.map((option) => {
        const Icon = channelIcons[option.value]
        const active = selected.includes(option.value)

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
              <span className="block truncate text-sm font-medium">{option.label}</span>
              {option.description && (
                <span className="block truncate text-xs opacity-75">{option.description}</span>
              )}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
