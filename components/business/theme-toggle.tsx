"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showSystem?: boolean;
  align?: "start" | "center" | "end";
}

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

export function useResolvedTheme(): "light" | "dark" {
  const { theme, resolvedTheme } = useTheme();
  if (theme === "system") return (resolvedTheme ?? "light") as "light" | "dark";
  return (theme ?? "light") as "light" | "dark";
}
