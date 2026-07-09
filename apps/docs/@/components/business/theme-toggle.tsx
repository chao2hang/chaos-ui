"use client";
import { useTheme } from "@chaos_team/chaos-ui/ui";
import { MoonIcon, SunIcon, MonitorIcon } from "@chaos_team/chaos-ui/ui-icons";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

interface ThemeToggleProps {
  className?: string;
  showSystem?: boolean;
  align?: "start" | "center" | "end";
}

/**
 * @component ThemeToggle
 * @category business/ux
 * @since 0.2.0
 * @description Dropdown toggle for switching between light, dark, and system theme modes / 下拉切换按钮，用于在浅色、深色和跟随系统主题间切换
 * @keywords theme, toggle, dark, light, system, mode
 * @example
 * <ThemeToggle showSystem />
 */
export function ThemeToggle({
  className,
  showSystem = true,
  align = "end",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("relative", className)}
            aria-label="Toggle theme"
          />
        }
      >
        <SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon />
          浅色
          {theme === "light" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
        {showSystem && (
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorIcon />
            跟随系统
            {theme === "system" && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon />
          深色
          {theme === "dark" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * @component useResolvedTheme
 * @category business/ux
 * @since 0.2.0
 * @description Hook that resolves the effective theme ("light" or "dark") from next-themes, accounting for system preference / 从 next-themes 解析实际生效的主题（"light" 或 "dark"），考虑系统偏好设置
 * @keywords theme, hook, resolved, dark, light, system
 * @example
 * const theme = useResolvedTheme();
 */
export function useResolvedTheme(): "light" | "dark" {
  const { theme, resolvedTheme } = useTheme();
  if (theme === "system") return (resolvedTheme ?? "light") as "light" | "dark";
  return (theme ?? "light") as "light" | "dark";
}
