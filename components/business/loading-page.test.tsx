import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingPage, FullPageLoader } from "./loading-page";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("LoadingPage", () => {
  it("renders the default title (translation key) and spinner variant", () => {
    const { container } = render(<LoadingPage />);
    expect(screen.getByText("loadingPage.title")).toBeDefined();
    expect(
      container.querySelector('[data-slot="loading-page"]'),
    ).not.toBeNull();
    expect(container.querySelector('[role="status"]')).not.toBeNull();
  });

  it("renders a custom title and description", () => {
    render(<LoadingPage title="Loading data" description="Please wait" />);
    expect(screen.getByText("Loading data")).toBeDefined();
    expect(screen.getByText("Please wait")).toBeDefined();
  });

  it("renders a custom icon when provided", () => {
    const { container } = render(
      <LoadingPage
        title="X"
        icon={<span data-testid="custom-icon">IC</span>}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeDefined();
    // No default Loader2 svg rendered when icon is provided
    expect(container.querySelectorAll("svg").length).toBe(0);
  });

  it("renders the dots variant (3 bouncing spans)", () => {
    const { container } = render(<LoadingPage title="X" variant="dots" />);
    expect(container.querySelectorAll(".animate-bounce").length).toBe(3);
  });

  it("renders the pulse variant", () => {
    const { container } = render(<LoadingPage title="X" variant="pulse" />);
    expect(container.querySelector(".animate-ping")).not.toBeNull();
  });

  it("does not render dots/pulse for spinner variant", () => {
    const { container } = render(<LoadingPage title="X" variant="spinner" />);
    expect(container.querySelector(".animate-bounce")).toBeNull();
    expect(container.querySelector(".animate-ping")).toBeNull();
  });
});

describe("FullPageLoader", () => {
  it("renders the overlay when show=true (default)", () => {
    const { container } = render(<FullPageLoader />);
    expect(container.querySelector(".fixed.inset-0")).not.toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders children behind the overlay", () => {
    render(
      <FullPageLoader show>
        <div>background-content</div>
      </FullPageLoader>,
    );
    expect(screen.getByText("background-content")).toBeDefined();
  });

  it("renders only children when show=false", () => {
    const { container } = render(
      <FullPageLoader show={false}>
        <div>only-content</div>
      </FullPageLoader>,
    );
    expect(screen.getByText("only-content")).toBeDefined();
    expect(container.querySelector(".fixed.inset-0")).toBeNull();
  });

  it("exports both components", () => {
    expect(LoadingPage).toBeDefined();
    expect(FullPageLoader).toBeDefined();
  });
});
