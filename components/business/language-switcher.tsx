"use client";
import * as React from "react";
import { useMemo } from "react";
import { LanguagesIcon, CheckIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/use-locale";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui";
import { cn } from "@/lib/utils";

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
    <DropdownMenu>
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
        <DropdownMenuLabel>
          {t("languageSwitcher.selectLanguage")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.code}
            onClick={() => onChange(opt.code)}
            className="justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm">{opt.nativeLabel ?? opt.label}</span>
              {opt.nativeLabel && opt.nativeLabel !== opt.label && (
                <span className="text-xs text-muted-foreground">
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
