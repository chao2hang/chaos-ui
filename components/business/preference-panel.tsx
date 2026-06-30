"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Separator,
  Switch,
  Button,
} from "@/components/ui";
import { SunIcon, MoonIcon, MonitorIcon, BellIcon, LanguagesIcon } from "@/components/ui/icons";

/**
 * @component PreferencePanel
 * @category business/ux
 * @since 0.7.0
 * @description 偏好设置面板（侧滑抽屉）。包含主题、通知、语言等可切换偏好项。
 * @param open 面板是否打开
 * @param onOpenChange 打开状态变化回调
 * @example
 * <PreferencePanel open={open} onOpenChange={setOpen} />
 */

interface PreferencePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

type Theme = "light" | "dark" | "system";

interface PrefItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function PrefItem({ icon, label, description, checked, onChange }: PrefItemProps) {
  return (
    <li className="flex items-center gap-3 py-3">
      <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label={`${label} 开关`}
      />
    </li>
  );
}

function PreferencePanel({ open, onOpenChange, className }: PreferencePanelProps) {
  const [theme, setTheme] = React.useState<Theme>("system");
  const [notifyBill, setNotifyBill] = React.useState(true);
  const [notifyApproval, setNotifyApproval] = React.useState(true);
  const [compactMode, setCompactMode] = React.useState(false);
  const [autoSave, setAutoSave] = React.useState(true);

  const themeLabel: Record<Theme, string> = {
    light: "浅色",
    dark: "深色",
    system: "跟随系统",
  };

  const cycleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={cn("w-full sm:max-w-sm", className)}>
        <SheetHeader>
          <SheetTitle>偏好设置</SheetTitle>
          <SheetDescription>调整界面主题、通知与显示偏好。</SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-between px-1 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              {theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <MonitorIcon />}
            </span>
            <div>
              <p className="text-sm font-medium">主题模式</p>
              <p className="text-xs text-muted-foreground">{themeLabel[theme]}</p>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={cycleTheme}>
            切换
          </Button>
        </div>

        <Separator />

        <ul className="flex flex-col px-1" role="list">
          <PrefItem
            icon={<BellIcon />}
            label="账单到期提醒"
            description="账单即将到期时推送通知"
            checked={notifyBill}
            onChange={setNotifyBill}
          />
          <PrefItem
            icon={<BellIcon />}
            label="审批结果通知"
            description="审批通过 / 驳回时通知"
            checked={notifyApproval}
            onChange={setNotifyApproval}
          />
          <PrefItem
            icon={<MonitorIcon />}
            label="紧凑模式"
            description="压缩表格行高以显示更多数据"
            checked={compactMode}
            onChange={setCompactMode}
          />
          <PrefItem
            icon={<LanguagesIcon />}
            label="自动保存草稿"
            description="编辑表单时自动保存草稿"
            checked={autoSave}
            onChange={setAutoSave}
          />
        </ul>

        <div className="mt-auto flex items-center justify-end gap-2 border-t pt-4">
          <SheetClose render={<Button type="button" variant="outline">关闭</Button>} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { PreferencePanel };
export type { PreferencePanelProps };
