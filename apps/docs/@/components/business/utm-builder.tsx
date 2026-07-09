"use client";

import * as React from "react";
import { CopyIcon, LinkIcon } from "@chaos_team/chaos-ui/ui-icons";
import { useTranslation } from "react-i18next";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface UTMBuilderValue {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export interface UTMBuilderProps {
  value?: Partial<UTMBuilderValue>;
  onChange?: (value: UTMBuilderValue, resultUrl: string) => void;
  className?: string;
}

const defaults: UTMBuilderValue = {
  url: "https://example.com/landing",
  source: "newsletter",
  medium: "email",
  campaign: "spring_launch",
  content: "",
  term: "",
};

function buildUrl(value: UTMBuilderValue) {
  try {
    const url = new URL(value.url);
    url.searchParams.set("utm_source", value.source);
    url.searchParams.set("utm_medium", value.medium);
    url.searchParams.set("utm_campaign", value.campaign);
    if (value.content) url.searchParams.set("utm_content", value.content);
    else url.searchParams.delete("utm_content");
    if (value.term) url.searchParams.set("utm_term", value.term);
    else url.searchParams.delete("utm_term");
    return url.toString();
  } catch {
    return "";
  }
}

/**
 * @component UTMBuilder
 * @category business/ux
 * @since 0.2.0
 * @description Form builder for constructing UTM-tagged campaign URLs with copy-to-clipboard / 构建带 UTM 参数的营销活动链接的表单构建器，支持一键复制
 * @keywords utm, builder, campaign, url, marketing, tracking
 * @example
 * <UTMBuilder value={defaultParams} onChange={(value, url) => console.log(url)} />
 */
export function UTMBuilder({ value, onChange, className }: UTMBuilderProps) {
  const { t } = useTranslation("marketing");
  const [form, setForm] = React.useState<UTMBuilderValue>({
    ...defaults,
    ...value,
  });
  const result = buildUrl(form);

  const update = (key: keyof UTMBuilderValue, next: string) => {
    const updated = { ...form, [key]: next };
    setForm(updated);
    onChange?.(updated, buildUrl(updated));
  };

  const copyResult = async () => {
    if (!result || typeof navigator === "undefined" || !navigator.clipboard)
      return;
    await navigator.clipboard.writeText(result);
  };

  return (
    <Card data-slot="utm-builder" className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="size-4" />
          {t("utmBuilder.title")}
        </CardTitle>
        <CardDescription>{t("utmBuilder.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label={t("utmBuilder.url")}
            value={form.url}
            onChange={(v) => update("url", v)}
            className="md:col-span-2"
          />
          <Field
            label={t("utmBuilder.source")}
            value={form.source}
            onChange={(v) => update("source", v)}
          />
          <Field
            label={t("utmBuilder.medium")}
            value={form.medium}
            onChange={(v) => update("medium", v)}
          />
          <Field
            label={t("utmBuilder.campaign")}
            value={form.campaign}
            onChange={(v) => update("campaign", v)}
          />
          <Field
            label={t("utmBuilder.content")}
            value={form.content ?? ""}
            onChange={(v) => update("content", v)}
          />
          <Field
            label={t("utmBuilder.term")}
            value={form.term ?? ""}
            onChange={(v) => update("term", v)}
          />
        </div>
        <div className="bg-muted/30 rounded-lg border p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-xs font-medium">
              {t("utmBuilder.resultUrl")}
            </span>
            <Button
              size="icon-xs"
              variant="ghost"
              aria-label={t("utmBuilder.copyUrl")}
              disabled={!result}
              onClick={copyResult}
            >
              <CopyIcon />
            </Button>
          </div>
          <p className={cn("text-xs break-all", !result && "text-destructive")}>
            {result || t("utmBuilder.invalidUrl")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { UTMBuilder as UtmBuilder };

/**
 * @component Field
 * @category business/ux
 * @since 0.2.0
 * @description Internal form field wrapper for UTMBuilder with label and input / UTMBuilder 内部表单字段包装器，包含标签和输入框
 * @keywords field, form, input, label, utm, internal
 */
function Field({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const id = `utm-${label.toLowerCase()}`;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
