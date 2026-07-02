import type { Meta, StoryObj } from "@storybook/react";
import { I18nFormField } from "@/components/business/i18n-form-field";
import type { LocaleTranslation } from "@/components/business/i18n-form-field";

const meta = {
  title: "Business/I18nFormField",
  component: I18nFormField,
  tags: ["autodocs"],
} satisfies Meta<typeof I18nFormField>;
export default meta;
type Story = StoryObj<typeof meta>;

const translations: LocaleTranslation[] = [
  { locale: "en-US", label: "English", text: "Welcome to our online store. Browse our latest collection of premium products.", isSource: true, flag: "🇺🇸" },
  { locale: "zh-CN", label: "中文", text: "欢迎光临我们的在线商店。浏览我们最新的优质产品系列。", flag: "🇨🇳" },
  { locale: "ja-JP", label: "日本語", text: "当社のオンラインストアへようこそ。最新のプレミアム製品コレクションをご覧ください。", flag: "🇯🇵" },
  { locale: "ko-KR", label: "한국어", text: "저희 온라인 상점에 오신 것을 환영합니다. 최신 프리미엄 제품 컬렉션을 둘러보세요.", flag: "🇰🇷" },
  { locale: "es-ES", label: "Español", text: "", flag: "🇪🇸" },
  { locale: "fr-FR", label: "Français", text: "Bienvenue dans notre boutique en ligne.", flag: "🇫🇷" },
];

export const Default: Story = {
  args: {
    fieldKey: "home.welcome_message",
    label: "Welcome Message",
    translations,
    multiline: true,
    maxLength: 200,
  },
};

export const SingleLine: Story = {
  args: {
    fieldKey: "product.name",
    label: "Product Name",
    translations: translations.map((t) => ({ ...t, text: t.text.split("。")[0] || t.text.split(".")[0] || t.text })),
  },
};

export const ReadOnly: Story = {
  args: { ...Default.args, readOnly: true },
};

export const PartialTranslation: Story = {
  args: {
    fieldKey: "marketing.banner_title",
    label: "Banner Title",
    translations: [
      { locale: "en-US", label: "English", text: "Summer Sale — Up to 50% Off!", isSource: true, flag: "🇺🇸" },
      { locale: "zh-CN", label: "中文", text: "夏季大促 — 低至5折！", flag: "🇨🇳" },
      { locale: "ja-JP", label: "日本語", text: "", flag: "🇯🇵" },
      { locale: "de-DE", label: "Deutsch", text: "", flag: "🇩🇪" },
      { locale: "pt-BR", label: "Português", text: "", flag: "🇧🇷" },
    ],
  },
};
