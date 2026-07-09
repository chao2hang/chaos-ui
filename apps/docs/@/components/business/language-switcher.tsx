"use client";
import { useMemo } from "react";
import { LanguagesIcon, CheckIcon } from "@chaos_team/chaos-ui/ui-icons";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel?: string;
  flag?: string;
}

interface LanguageSwitcherProps {
  value?: string;
  onChange?: (code: string) => void;
  options?: LanguageOption[];
  className?: string;
  align?: "start" | "center" | "end";
}

/**
 * @component LanguageSwitcher
 * @category business/ux
 * @since 0.2.0
 * @description Dropdown language switcher with i18n integration, configurable options, and current-locale detection / 下拉语言切换器，集成国际化、可配置选项和当前语言检测
 * @keywords language, locale, i18n, switcher, dropdown
 * @example
 * <LanguageSwitcher />
 */
export function LanguageSwitcher({
  value: valueProp,
  onChange: onChangeProp,
  options: optionsProp,
  className,
  align = "end",
}: LanguageSwitcherProps) {
  const { t } = useTranslation("language");
  const { locale, setLocale } = useLocale();

  const DEFAULT_LANGUAGES: LanguageOption[] = useMemo(
    () => [
      {
        code: "zh-CN",
        label: t("language.zhCN.label"),
        nativeLabel: t("language.zhCN"),
      },
      {
        code: "en-US",
        label: t("language.enUS.label"),
        nativeLabel: t("language.enUS"),
      },
    ],
    [t],
  );

  const options = optionsProp ?? DEFAULT_LANGUAGES;
  const value = valueProp ?? locale;
  const onChange = onChangeProp ?? setLocale;

  const current = options.find((o) => o.code === value) ?? options[0];

  return (
    <DropdownMenu data-slot="language-switcher">
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5", className)}
            aria-label={t("languageSwitcher.switchLanguage")}
          />
        }
      >
        <LanguagesIcon />
        <span className="text-xs">{current?.nativeLabel ?? current?.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            {t("languageSwitcher.selectLanguage")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.code}
            onClick={() => onChange(opt.code)}
            className="justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm">{opt.nativeLabel ?? opt.label}</span>
              {opt.nativeLabel && opt.nativeLabel !== opt.label && (
                <span className="text-muted-foreground text-xs">
                  {opt.label}
                </span>
              )}
            </div>
            {opt.code === value && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
