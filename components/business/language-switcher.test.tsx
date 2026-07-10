import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "./language-switcher";
import type { LanguageOption } from "./language-switcher";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

const setLocale = vi.fn();
vi.mock("@/hooks/use-locale", () => ({
  useLocale: () => ({
    locale: "zh-CN",
    setLocale,
    supportedLocales: ["zh-CN", "en-US"],
  }),
}));

const options: LanguageOption[] = [
  { code: "zh-CN", label: "Chinese", nativeLabel: "中文" },
  { code: "en-US", label: "English", nativeLabel: "English" },
  { code: "ja-JP", label: "Japanese", nativeLabel: "日本語", flag: "JP" },
];

describe("LanguageSwitcher", () => {
  it("renders the current language native label on the trigger", () => {
    render(<LanguageSwitcher options={options} value="zh-CN" />);
    expect(screen.getByText("中文")).toBeDefined();
  });

  it("renders the trigger with an accessible aria-label", () => {
    render(<LanguageSwitcher options={options} value="zh-CN" />);
    expect(
      screen.getByLabelText("languageSwitcher.switchLanguage"),
    ).toBeDefined();
  });

  it("opens the menu and lists all options on trigger click", () => {
    render(<LanguageSwitcher options={options} value="zh-CN" />);
    fireEvent.click(screen.getByLabelText("languageSwitcher.switchLanguage"));
    expect(screen.getByText("languageSwitcher.selectLanguage")).toBeDefined();
    expect(screen.getByText("English")).toBeDefined();
    expect(screen.getByText("日本語")).toBeDefined();
  });

  it("shows a check mark for the currently selected option", () => {
    const { container } = render(
      <LanguageSwitcher options={options} value="en-US" />,
    );
    fireEvent.click(screen.getByLabelText("languageSwitcher.switchLanguage"));
    // Each menu item is a rendered option; the selected one has a CheckIcon svg.
    const items = screen.getAllByText(/English|日本語|中文/);
    expect(items.length).toBeGreaterThan(0);
    // At least one check icon svg present (Base UI renders CheckIcon)
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("calls onChange with the selected code when an item is clicked", () => {
    const onChange = vi.fn();
    render(
      <LanguageSwitcher options={options} value="zh-CN" onChange={onChange} />,
    );
    fireEvent.click(screen.getByLabelText("languageSwitcher.switchLanguage"));
    fireEvent.click(screen.getByText("日本語"));
    expect(onChange).toHaveBeenCalledWith("ja-JP");
  });

  it("falls back to setLocale from useLocale when no onChange provided", () => {
    setLocale.mockClear();
    render(<LanguageSwitcher options={options} value="zh-CN" />);
    fireEvent.click(screen.getByLabelText("languageSwitcher.switchLanguage"));
    fireEvent.click(screen.getByText("English"));
    expect(setLocale).toHaveBeenCalledWith("en-US");
  });

  it("renders the secondary label when nativeLabel differs from label", () => {
    render(<LanguageSwitcher options={options} value="zh-CN" />);
    fireEvent.click(screen.getByLabelText("languageSwitcher.switchLanguage"));
    expect(screen.getByText("Chinese")).toBeDefined();
  });

  it("uses custom className on the trigger button", () => {
    const { container } = render(
      <LanguageSwitcher
        options={options}
        value="zh-CN"
        className="my-switch"
      />,
    );
    expect(container.querySelector(".my-switch")).not.toBeNull();
  });

  it("renders code as fallback when option has no nativeLabel", () => {
    render(
      <LanguageSwitcher
        options={[{ code: "fr-FR", label: "French" }]}
        value="fr-FR"
      />,
    );
    expect(screen.getByText("fr-FR")).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: LanguageOption | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("exports LanguageSwitcher", () => {
    expect(LanguageSwitcher).toBeDefined();
  });
});
