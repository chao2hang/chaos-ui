import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { usePageTitle } from "./use-page-title";

function TitleHarness({
  title,
  template,
  defaultTitle,
}: {
  title?: string;
  template?: string;
  defaultTitle?: string;
}) {
  // Build options conditionally so undefined props are omitted entirely
  // (exactOptionalPropertyTypes forbids passing `undefined` to `?: string`).
  const options: { template?: string; defaultTitle?: string } = {};
  if (template !== undefined) options.template = template;
  if (defaultTitle !== undefined) options.defaultTitle = defaultTitle;
  usePageTitle(title, options);
  return <div data-testid="mounted">mounted</div>;
}

describe("use-page-title", () => {
  beforeEach(() => {
    document.title = "";
  });

  it("exports usePageTitle", () => {
    expect(usePageTitle).toBeDefined();
  });

  it("sets document.title from the title arg", () => {
    render(<TitleHarness title="Orders" />);
    expect(document.title).toBe("Orders");
    expect(screen.getByTestId("mounted")).toBeDefined();
  });

  it("applies a template with {title} placeholder", () => {
    render(
      <TitleHarness
        title="Orders"
        template="{title} · 清香园营销管理系统"
      />,
    );
    expect(document.title).toBe("Orders · 清香园营销管理系统");
  });

  it("uses defaultTitle when title is undefined", () => {
    render(<TitleHarness defaultTitle="Home" />);
    expect(document.title).toBe("Home");
  });

  it("empty title and empty default render template with empty placeholder", () => {
    render(<TitleHarness template="{title} | App" />);
    // resolved = title ?? defaultTitle = undefined ?? "" = "" (falsy), so the
    // hook falls to `defaultTitle || template.replace("{title}", "")`.
    // defaultTitle="" is falsy → template.replace yields "| App".
    expect(document.title).toBe("| App");
  });

  it("updates title when the title prop changes", () => {
    const { rerender } = render(<TitleHarness title="One" />);
    expect(document.title).toBe("One");
    rerender(<TitleHarness title="Two" />);
    expect(document.title).toBe("Two");
  });

  it("updates when template changes", () => {
    const { rerender } = render(
      <TitleHarness title="X" template="{title} - A" />,
    );
    expect(document.title).toBe("X - A");
    rerender(<TitleHarness title="X" template="{title} - B" />);
    expect(document.title).toBe("X - B");
  });

  it("does not set a non-empty value when title and defaultTitle are empty", () => {
    render(<TitleHarness />);
    // template defaults to "{title}", defaultTitle "", resolved "" -> ""
    expect(document.title).toBe("");
  });

  it("uses defaultTitle inside the template when title is undefined", () => {
    render(
      <TitleHarness template="{title} · App" defaultTitle="Home" />,
    );
    // resolved = undefined ?? "Home" = "Home" (truthy) → template.replace.
    expect(document.title).toBe("Home · App");
  });

  it("falls back to template when title is an empty string and defaultTitle empty", () => {
    render(<TitleHarness title="" template="{title} · App" />);
    // resolved = "" ?? defaultTitle → "" (not null/undefined, so ?? keeps "").
    // "" is falsy → defaultTitle || template.replace("{title}", "") = " · App",
    // but the browser/jsdom trims leading whitespace in document.title → "· App".
    expect(document.title).toBe("· App");
  });

  it("defaultTitle alone (no template override) renders just the default", () => {
    render(<TitleHarness defaultTitle="Dashboard" />);
    // template default "{title}", resolved = undefined ?? "Dashboard" = "Dashboard".
    expect(document.title).toBe("Dashboard");
  });

  it("reacts to interactions within the rendered tree", () => {
    function Interactive() {
      usePageTitle("Static");
      return (
        <button type="button" onClick={() => {}}>
          click
        </button>
      );
    }
    render(<Interactive />);
    expect(document.title).toBe("Static");
    act(() => {
      fireEvent.click(screen.getByText("click"));
    });
    expect(document.title).toBe("Static");
  });
});
