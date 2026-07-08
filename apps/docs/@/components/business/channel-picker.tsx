"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { XIcon, ChevronDownIcon } from "lucide-react";

const CHANNELS = [
  { id: "wechat", label: "微信", icon: "💬" },
  { id: "weibo", label: "微博", icon: "📢" },
  { id: "douyin", label: "抖音", icon: "🎵" },
  { id: "xiaohongshu", label: "小红书", icon: "📕" },
  { id: "bilibili", label: "B站", icon: "📺" },
  { id: "zhihu", label: "知乎", icon: "💡" },
  { id: "email", label: "邮件", icon: "📧" },
  { id: "sms", label: "短信", icon: "📱" },
];

interface ChannelPickerProps extends React.ComponentProps<"div"> {
  value?: string[];
  onChange?: (channels: string[]) => void;
  className?: string;
}

function ChannelPicker({
  value = [],
  onChange,
  className,
  ...props
}: ChannelPickerProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (id: string) => {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange?.(next);
  };

  const remove = (id: string) => {
    onChange?.(value.filter((v) => v !== id));
  };

  return (
    <div data-slot="channel-picker" className={cn("", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button variant="outline" className="w-full justify-between">
            <span className="truncate">
              {value.length === 0 ? "选择渠道" : `已选 ${value.length} 个渠道`}
            </span>
            <ChevronDownIcon className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <div className="space-y-1">
            {CHANNELS.map((ch) => (
              <label
                key={ch.id}
                className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm"
              >
                <Checkbox
                  checked={value.includes(ch.id)}
                  onCheckedChange={() => toggle(ch.id)}
                />
                <span>{ch.icon}</span>
                <span>{ch.label}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {value.map((id) => {
            const ch = CHANNELS.find((c) => c.id === id);
            return (
              <Badge key={id} variant="secondary" className="gap-1 text-xs">
                {ch?.icon} {ch?.label}
                <button
                  onClick={() => remove(id)}
                  className="hover:text-foreground ml-0.5"
                >
                  <XIcon className="size-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { ChannelPicker, CHANNELS };
export type { ChannelPickerProps };
