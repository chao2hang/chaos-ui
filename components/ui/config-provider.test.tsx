import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ConfigProvider, useConfig, ConfigContext } from "./config-provider";
import type {
  ConfigContextValue,
  ThemeConfig,
  ScrollbarConfig,
} from "./config-provider";

describe("config-provider", () => {
  it("exports ConfigProvider", () => {
    expect(ConfigProvider).toBeDefined();
  });

  it("exports useConfig", () => {
    expect(useConfig).toBeDefined();
  });

  it("exports ConfigContext", () => {
    expect(ConfigContext).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ConfigContextValue | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ThemeConfig | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: ScrollbarConfig | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });

  it("renders children inside a config-provider slot with default locale", () => {
    const { container } = render(
      <ConfigProvider>
        <span data-testid="child">hi</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root).not.toBeNull();
    expect(root.querySelector('[data-testid="child"]')).not.toBeNull();
    expect(root.getAttribute("dir")).toBe("ltr");
  });

  it("applies direction rtl on the wrapper", () => {
    const { container } = render(
      <ConfigProvider direction="rtl">
        <span>x</span>
      </ConfigProvider>,
    );
    expect(
      (
        container.querySelector('[data-slot="config-provider"]') as HTMLElement
      ).getAttribute("dir"),
    ).toBe("rtl");
  });

  it("applies dark class when theme.darkMode is true", () => {
    const { container } = render(
      <ConfigProvider theme={{ darkMode: true }}>
        <span>x</span>
      </ConfigProvider>,
    );
    expect(
      (container.querySelector('[data-slot="config-provider"]') as HTMLElement)
        .className,
    ).toContain("dark");
  });

  it("does not apply dark class when darkMode is false", () => {
    const { container } = render(
      <ConfigProvider theme={{ darkMode: false }}>
        <span>x</span>
      </ConfigProvider>,
    );
    expect(
      (container.querySelector('[data-slot="config-provider"]') as HTMLElement)
        .className,
    ).not.toContain("dark");
  });

  it("injects primary color and border radius as CSS variables", () => {
    const { container } = render(
      <ConfigProvider theme={{ primaryColor: "#ff0000", borderRadius: 8 }}>
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--primary")).toBe("#ff0000");
    expect(root.style.getPropertyValue("--radius")).toBe("8px");
  });

  it("injects custom cssVars from theme", () => {
    const { container } = render(
      <ConfigProvider theme={{ cssVars: { "--my-var": "42px" } }}>
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--my-var")).toBe("42px");
  });

  it("does not inject style vars when no theme provided", () => {
    const { container } = render(
      <ConfigProvider>
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.length).toBe(0);
  });

  it("resolves shorthand scrollbar 'none' config", () => {
    const { container } = render(
      <ConfigProvider theme={{ scrollbar: "none" }}>
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--scrollbar-width")).toBe("none");
  });

  it("resolves shorthand scrollbar 'thin' config", () => {
    const { container } = render(
      <ConfigProvider theme={{ scrollbar: "thin" }}>
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--scrollbar-width")).toBe("thin");
  });

  it("applies custom scrollbar thumb colors", () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          scrollbar: {
            variant: "thin",
            thumbColor: "red",
            thumbHoverColor: "darkred",
          },
        }}
      >
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--scrollbar-thumb")).toBe("red");
    expect(root.style.getPropertyValue("--scrollbar-thumb-hover")).toBe(
      "darkred",
    );
  });

  it("uses default scrollbar thumb colors when none specified", () => {
    const { container } = render(
      <ConfigProvider theme={{ scrollbar: { variant: "thin" } }}>
        <span>x</span>
      </ConfigProvider>,
    );
    const root = container.querySelector(
      '[data-slot="config-provider"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--scrollbar-thumb")).toBe(
      "rgba(15, 23, 42, 0.18)",
    );
    expect(root.style.getPropertyValue("--scrollbar-thumb-hover")).toBe(
      "rgba(15, 23, 42, 0.3)",
    );
  });
});

describe("useConfig", () => {
  it("returns provider value via hook", () => {
    let captured: ConfigContextValue | undefined;
    function Reader() {
      captured = useConfig();
      return null;
    }
    render(
      <ConfigProvider locale="en-US" prefixCls="cx" disableAnimation>
        <Reader />
      </ConfigProvider>,
    );
    expect(captured!.locale).toBe("en-US");
    expect(captured!.prefixCls).toBe("cx");
    expect(captured!.disableAnimation).toBe(true);
  });

  it("returns the default context value when used outside a provider", () => {
    let captured: ConfigContextValue | undefined;
    function Reader() {
      captured = useConfig();
      return null;
    }
    render(<Reader />);
    expect(captured!.locale).toBe("zh-CN");
    expect(captured!.direction).toBe("ltr");
    expect(captured!.prefixCls).toBe("chaos");
  });

  it("exposes theme/renderEmpty/form through context", () => {
    let captured: ConfigContextValue | undefined;
    function Reader() {
      captured = useConfig();
      return null;
    }
    const renderEmpty = (name?: string) => <span>empty-{name ?? "x"}</span>;
    render(
      <ConfigProvider
        theme={{ primaryColor: "#000" }}
        renderEmpty={renderEmpty}
        form={{ validateMessages: { required: "req" } }}
      >
        <Reader />
      </ConfigProvider>,
    );
    expect(captured!.theme?.primaryColor).toBe("#000");
    expect(typeof captured!.renderEmpty).toBe("function");
    expect(captured!.form?.validateMessages!.required).toBe("req");
  });

  it("ConfigContext.Provider can override value directly", () => {
    let captured: ConfigContextValue | undefined;
    function Reader() {
      captured = useConfig();
      return null;
    }
    render(
      <ConfigContext.Provider
        value={{ locale: "ja-JP", direction: "ltr", prefixCls: "cust" }}
      >
        <Reader />
      </ConfigContext.Provider>,
    );
    expect(captured!.locale).toBe("ja-JP");
  });
});
