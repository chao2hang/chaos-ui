import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UTMBuilder } from "./utm-builder";
import type { UTMBuilderValue, UTMBuilderProps } from "./utm-builder";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("UTMBuilder", () => {
  it("exports UTMBuilder", () => {
    expect(UTMBuilder).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: UTMBuilderValue | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: UTMBuilderProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders title, description, and field labels", () => {
    render(<UTMBuilder />);
    expect(screen.getByText("utmBuilder.title")).toBeDefined();
    expect(screen.getByText("utmBuilder.description")).toBeDefined();
    expect(screen.getByText("utmBuilder.url")).toBeDefined();
    expect(screen.getByText("utmBuilder.source")).toBeDefined();
  });

  it("renders the built result URL from defaults", () => {
    render(<UTMBuilder />);
    expect(screen.getByText(/utm_source=newsletter/)).toBeDefined();
    expect(screen.getByText(/utm_medium=email/)).toBeDefined();
  });

  it("shows invalid-url state when url is not parseable", () => {
    render(<UTMBuilder value={{ url: "not a url" }} />);
    expect(screen.getByText("utmBuilder.invalidUrl")).toBeDefined();
  });

  it("calls onChange with updated value and result URL when typing", () => {
    const onChange = vi.fn();
    render(<UTMBuilder value={{ url: "https://x.com" }} onChange={onChange} />);
    const sourceInput = screen.getByLabelText("utmBuilder.source");
    fireEvent.change(sourceInput, { target: { value: "google" } });
    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls[onChange.mock.calls.length - 1]![0];
    expect(last.source).toBe("google");
    const resultUrl = onChange.mock.calls[onChange.mock.calls.length - 1]![1];
    expect(resultUrl).toContain("utm_source=google");
  });

  it("includes utm_content and utm_term when provided", () => {
    render(
      <UTMBuilder
        value={{
          url: "https://x.com",
          source: "s",
          medium: "m",
          campaign: "c",
          content: "mycontent",
          term: "myterm",
        }}
      />,
    );
    const result = screen.getByText(/utm_content=mycontent/);
    expect(result).toBeDefined();
    expect(screen.getByText(/utm_term=myterm/)).toBeDefined();
  });

  it("omits utm_content and utm_term when empty", () => {
    render(
      <UTMBuilder
        value={{
          url: "https://x.com",
          source: "s",
          medium: "m",
          campaign: "c",
          content: "",
          term: "",
        }}
      />,
    );
    expect(screen.queryByText(/utm_content/)).toBeNull();
    expect(screen.queryByText(/utm_term/)).toBeNull();
  });

  it("disables copy button when result URL is empty", () => {
    render(<UTMBuilder value={{ url: "bad url" }} />);
    const copyBtn = screen.getByLabelText("utmBuilder.copyUrl");
    expect((copyBtn as HTMLButtonElement).disabled).toBe(true);
  });

  it("enables copy button when result URL is present", () => {
    render(<UTMBuilder value={{ url: "https://x.com" }} />);
    const copyBtn = screen.getByLabelText("utmBuilder.copyUrl");
    expect((copyBtn as HTMLButtonElement).disabled).toBe(false);
  });

  it("copies result to clipboard when copy clicked", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<UTMBuilder value={{ url: "https://x.com" }} />);
    fireEvent.click(screen.getByLabelText("utmBuilder.copyUrl"));
    expect(writeText).toHaveBeenCalled();
    const arg = writeText.mock.calls[0]![0];
    expect(arg).toContain("https://x.com");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/utm-builder");
    expect(mod.UTMBuilder).toBeDefined();
  });
});
