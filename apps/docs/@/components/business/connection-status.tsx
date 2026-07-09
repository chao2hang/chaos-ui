"use client";
import * as React from "react";
import { WifiOffIcon, RefreshCwIcon, CheckIcon } from "lucide-react";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

type SyncState = "online" | "offline" | "syncing";

interface ConnectionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  onSync?: () => Promise<void> | void;
  showWhenOnline?: boolean;
  variant?: "banner" | "inline" | "toast";
  className?: string;
}

export function ConnectionStatus({
  onSync,
  showWhenOnline = false,
  variant = "banner",
  className,
  ...props
}: ConnectionStatusProps) {
  const online = useOnlineStatus();
  const [state, setState] = React.useState<SyncState>(
    online ? "online" : "offline",
  );
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    if (!online) {
      setState("offline");
    } else if (state === "offline") {
      setState("syncing");
      const t = setTimeout(() => setState("online"), 800);
      return () => clearTimeout(t);
    }
  }, [online, state]);

  if (state === "online" && !showWhenOnline) return null;

  const handleSync = async () => {
    if (!onSync) return;
    setPending(true);
    try {
      await onSync();
    } finally {
      setPending(false);
      setState("online");
    }
  };

  const config = {
    online: { icon: CheckIcon, text: "已连接", color: "text-success" },
    offline: { icon: WifiOffIcon, text: "网络断开", color: "text-destructive" },
    syncing: { icon: RefreshCwIcon, text: "正在同步...", color: "text-info" },
  }[state];

  const Icon = config.icon;

  if (variant === "toast") {
    return (
      <div
        data-slot="connection-status"
        data-state={state}
        role="status"
        className={cn(
          "bg-popover flex items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-md",
          className,
        )}
        {...props}
      >
        <Icon
          className={cn(
            "size-4",
            config.color,
            state === "syncing" && "animate-spin",
          )}
        />
        <span>{config.text}</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        data-slot="connection-status"
        data-state={state}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs",
          config.color,
          className,
        )}
        {...props}
      >
        <Icon className={cn("size-3", state === "syncing" && "animate-spin")} />
        {config.text}
      </div>
    );
  }

  return (
    <div
      data-slot="connection-status"
      data-state={state}
      role="status"
      className={cn(
        "bg-muted/30 flex items-center justify-center gap-3 border-b px-4 py-1.5 text-xs",
        className,
      )}
      {...props}
    >
      <Icon
        className={cn(
          "size-3.5",
          config.color,
          state === "syncing" && "animate-spin",
        )}
      />
      <span>{config.text}</span>
      {onSync && state === "offline" && (
        <Button
          variant="ghost"
          size="xs"
          onClick={handleSync}
          disabled={pending}
        >
          重试
        </Button>
      )}
    </div>
  );
}
