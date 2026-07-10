import type { Meta, StoryObj } from "@storybook/react";
import {
  I18nProvider,
  useI18n,
  useSafeTranslation,
} from "@/components/ui/i18n-provider";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/I18nProvider",
  component: I18nProvider,
  tags: ["autodocs"],
  argTypes: {
    locale: {
      control: "select",
      options: ["zh-CN", "en-US"],
    },
  },
} satisfies Meta<typeof I18nProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const messages = {
  "common.save": {
    "zh-CN": "保存",
    "en-US": "Save",
  },
  "common.cancel": {
    "zh-CN": "取消",
    "en-US": "Cancel",
  },
};

function DemoContent() {
  const { t, locale, setLocale } = useI18n();
  return (
    <div className="flex flex-col gap-3">
      <p>
        Locale: <code>{locale}</code>
      </p>
      <p>
        t(&quot;common.save&quot;) = <strong>{t("common.save")}</strong>
      </p>
      <p>
        t(&quot;common.cancel&quot;) = <strong>{t("common.cancel")}</strong>
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setLocale("zh-CN")}>
          zh-CN
        </Button>
        <Button size="sm" variant="outline" onClick={() => setLocale("en-US")}>
          en-US
        </Button>
      </div>
    </div>
  );
}

export const WithProvider: Story = {
  render: () => (
    <I18nProvider locale="zh-CN" messages={messages}>
      <DemoContent />
    </I18nProvider>
  ),
};

/**
 * When no I18nProvider wraps the tree, `useI18n` returns a no-op fallback
 * instead of throwing. The `t` function simply returns the key as-is.
 */
export const WithoutProvider: Story = {
  render: () => <DemoContent />,
};

/**
 * `useSafeTranslation` wraps react-i18next's `useTranslation` with graceful
 * degradation. When no i18next instance is initialized, it returns a silent
 * fallback `{ t: (key) => key, i18n: { language: "zh-CN" }, ready: true }`
 * without logging warnings.
 */
function SafeTranslationDemo() {
  const { t, i18n, ready } = useSafeTranslation("ui");
  return (
    <div className="flex flex-col gap-2">
      <p>
        i18n.isInitialized = <code>{String(i18n.isInitialized)}</code>
      </p>
      <p>
        ready = <code>{String(ready)}</code>
      </p>
      <p>
        t(&quot;common.save&quot;) = <strong>{t("common.save")}</strong>
      </p>
      <p className="text-muted-foreground text-sm">
        Without an i18next instance, t() returns the key as-is — no warnings, no
        errors.
      </p>
    </div>
  );
}

export const SafeTranslationFallback: Story = {
  render: () => <SafeTranslationDemo />,
};
