import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nFormField } from "./i18n-form-field";
import type { LocaleTranslation } from "./i18n-form-field";

const translations: LocaleTranslation[] = [
  { locale: "en-US", label: "English", text: "Welcome to our store", isSource: true, flag: "🇺🇸" },
  { locale: "zh-CN", label: "中文", text: "欢迎光临我们的商店", flag: "🇨🇳" },
  { locale: "ja-JP", label: "日本語", text: "", flag: "🇯🇵" },
  { locale: "ko-KR", label: "한국어", text: "저희 상점에 오신 것을 환영합니다", flag: "🇰🇷" },
];

describe("I18nFormField", () => {
  it("renders with data-slot", () => {
    const { container } = render(<I18nFormField fieldKey="home.welcome" translations={translations} />);
    expect(container.querySelector('[data-slot="i18n-form-field"]')).toBeTruthy();
  });

  it("renders field key", () => {
    render(<I18nFormField fieldKey="home.welcome" translations={translations} />);
    expect(screen.getByText("home.welcome")).toBeTruthy();
  });

  it("renders label", () => {
    render(<I18nFormField fieldKey="home.welcome" label="Welcome Message" translations={translations} />);
    expect(screen.getByText("Welcome Message")).toBeTruthy();
  });

  it("renders all locale tabs", () => {
    render(<I18nFormField fieldKey="key" translations={translations} />);
    expect(screen.getByText("English")).toBeTruthy();
    expect(screen.getByText("中文")).toBeTruthy();
    expect(screen.getByText("日本語")).toBeTruthy();
    expect(screen.getByText("한국어")).toBeTruthy();
  });

  it("renders source badge", () => {
    render(<I18nFormField fieldKey="key" translations={translations} />);
    expect(screen.getByText("SRC")).toBeTruthy();
  });

  it("renders completion percentage", () => {
    render(<I18nFormField fieldKey="key" translations={translations} />);
    // 2 out of 3 non-source translations are filled = 66.7%
    expect(screen.getByText("67%")).toBeTruthy();
  });

  it("shows source text in first tab", () => {
    render(<I18nFormField fieldKey="key" translations={translations} />);
    expect(screen.getByDisplayValue("Welcome to our store")).toBeTruthy();
  });

  it("shows source reference when editing non-source", () => {
    const { container } = render(<I18nFormField fieldKey="key" translations={translations} />);
    // Click on zh-CN tab
    fireEvent.click(screen.getByText("中文"));
    const ref = container.querySelector('[data-slot="source-reference"]');
    expect(ref).toBeTruthy();
    expect(screen.getByText(/Source \(English\):/)).toBeTruthy();
  });

  it("does not show source reference when editing source", () => {
    const { container } = render(<I18nFormField fieldKey="key" translations={translations} />);
    // English is active by default and is source
    const ref = container.querySelector('[data-slot="source-reference"]');
    expect(ref).toBeNull();
  });

  it("calls onTranslationChange when text edited", () => {
    const onChange = vi.fn();
    render(<I18nFormField fieldKey="key" translations={translations} onTranslationChange={onChange} />);
    const input = screen.getByDisplayValue("Welcome to our store");
    fireEvent.change(input, { target: { value: "Welcome!" } });
    expect(onChange).toHaveBeenCalledWith("en-US", "Welcome!");
  });

  it("renders textarea in multiline mode", () => {
    render(<I18nFormField fieldKey="key" translations={translations} multiline />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("renders character count when maxLength set", () => {
    render(<I18nFormField fieldKey="key" translations={translations} maxLength={50} />);
    expect(screen.getByText(/23 \/ 50/)).toBeTruthy();
  });

  it("disables input in read-only mode", () => {
    render(<I18nFormField fieldKey="key" translations={translations} readOnly />);
    const input = screen.getByDisplayValue("Welcome to our store");
    expect(input).toBeDisabled();
  });

  it("shows empty indicator for unfilled translations", () => {
    render(<I18nFormField fieldKey="key" translations={translations} />);
    // ja-JP has empty text, should have unfilled indicator
    const jaTab = screen.getByText("日本語").closest("button");
    expect(jaTab).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<I18nFormField fieldKey="key" translations={translations} className="my-i18n" />);
    const el = container.querySelector('[data-slot="i18n-form-field"]') as HTMLElement;
    expect(el.className).toContain("my-i18n");
  });
});
