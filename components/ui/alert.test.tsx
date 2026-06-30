import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription, alertVariants } from "./alert";
import type { AlertProps, AlertVariant } from "./alert";

describe("Alert", () => {
  it("exports Alert", () => {
    expect(Alert).toBeDefined();
  });

  it("exports AlertTitle", () => {
    expect(AlertTitle).toBeDefined();
  });

  it("exports AlertDescription", () => {
    expect(AlertDescription).toBeDefined();
  });

  it("exports alertVariants", () => {
    expect(alertVariants).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AlertProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: AlertVariant | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders with role=alert and omits data-variant by default", () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );
    const root = container.querySelector('[data-slot="alert"]') as HTMLElement;
    expect(root.getAttribute("role")).toBe("alert");
    // variant defaults to undefined → React omits the data-variant attribute.
    expect(root.getAttribute("data-variant")).toBeNull();
    expect(screen.getByText("Heads up")).toBeDefined();
    expect(screen.getByText("Something happened.")).toBeDefined();
  });

  it("renders data-variant=default when variant is explicit", () => {
    const { container } = render(<Alert variant="default">body</Alert>);
    const root = container.querySelector('[data-slot="alert"]') as HTMLElement;
    expect(root.getAttribute("data-variant")).toBe("default");
  });

  it("applies each variant as data-variant", () => {
    const variants: AlertVariant[] = [
      "default",
      "info",
      "success",
      "warning",
      "destructive",
    ];
    for (const variant of variants) {
      const { unmount } = render(<Alert variant={variant}>x</Alert>);
      const root = document.querySelector(
        '[data-slot="alert"]',
      ) as HTMLElement;
      expect(root.getAttribute("data-variant")).toBe(variant);
      unmount();
    }
  });

  it("renders the icon slot when an icon is provided", () => {
    const { container } = render(
      <Alert icon={<span data-testid="my-icon">!</span>}>body</Alert>,
    );
    expect(container.querySelector('[data-slot="alert-icon"]')).not.toBeNull();
    expect(screen.getByTestId("my-icon")).toBeDefined();
  });

  it("does not render an icon slot when icon is omitted", () => {
    const { container } = render(<Alert>body</Alert>);
    expect(container.querySelector('[data-slot="alert-icon"]')).toBeNull();
  });

  it("merges a custom className", () => {
    const { container } = render(
      <Alert className="my-alert">body</Alert>,
    );
    const root = container.querySelector('[data-slot="alert"]') as HTMLElement;
    expect(root.className).toContain("my-alert");
  });

  it("AlertTitle renders an h5 with content and merges className", () => {
    const { container } = render(
      <AlertTitle className="extra">Title text</AlertTitle>,
    );
    const title = container.querySelector(
      '[data-slot="alert-title"]',
    ) as HTMLElement;
    expect(title.tagName).toBe("H5");
    expect(title.textContent).toBe("Title text");
    expect(title.className).toContain("extra");
  });

  it("AlertDescription renders a div with content and merges className", () => {
    const { container } = render(
      <AlertDescription className="desc-extra">Desc text</AlertDescription>,
    );
    const desc = container.querySelector(
      '[data-slot="alert-description"]',
    ) as HTMLElement;
    expect(desc.tagName).toBe("DIV");
    expect(desc.textContent).toBe("Desc text");
    expect(desc.className).toContain("desc-extra");
  });

  it("forwards extra HTML attributes to the root", () => {
    render(<Alert data-testid="alert-root">x</Alert>);
    expect(screen.getByTestId("alert-root")).toBeDefined();
  });

  it("alertVariants returns class strings per variant", () => {
    const out = alertVariants({ variant: "destructive" });
    expect(typeof out).toBe("string");
    expect(out).toContain("bg-destructive");
  });
});
