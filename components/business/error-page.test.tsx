import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorPage, NotFound, InternalError, Unauthorized } from "./error-page";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ErrorPage", () => {
  it("exports ErrorPage", () => {
    expect(ErrorPage).toBeDefined();
  });

  it("renders 404 error by default", () => {
    render(<ErrorPage />);
    // 404 is the default status, rendered twice (badge + large number)
    const elements = screen.getAllByText("404");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders 403 error page", () => {
    render(<ErrorPage status={403} />);
    const elements = screen.getAllByText("403");
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Access restricted")).toBeDefined();
  });

  it("renders 500 error page", () => {
    render(<ErrorPage status={500} />);
    const elements = screen.getAllByText("500");
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Server incident")).toBeDefined();
  });

  it("renders 503 error page", () => {
    render(<ErrorPage status={503} />);
    const elements = screen.getAllByText("503");
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Maintenance window")).toBeDefined();
  });

  it("renders custom title", () => {
    render(<ErrorPage title="Custom Error Title" />);
    expect(screen.getByText("Custom Error Title")).toBeDefined();
  });

  it("renders custom description", () => {
    render(<ErrorPage description="Something specific went wrong" />);
    expect(screen.getByText("Something specific went wrong")).toBeDefined();
  });

  it("renders home link when showHome is true", () => {
    render(<ErrorPage showHome />);
    expect(screen.getByText("errorPage.home")).toBeDefined();
  });

  it("hides home link when showHome is false", () => {
    render(<ErrorPage showHome={false} />);
    expect(screen.queryByText("errorPage.home")).toBeNull();
  });

  it("renders back button when showBack is true", () => {
    render(<ErrorPage showBack />);
    expect(screen.getByText("errorPage.back")).toBeDefined();
  });

  it("hides back button when showBack is false", () => {
    render(<ErrorPage showBack={false} />);
    expect(screen.queryByText("errorPage.back")).toBeNull();
  });

  it("fires onBack when back button is clicked", () => {
    const onBack = vi.fn();
    render(<ErrorPage onBack={onBack} />);
    fireEvent.click(screen.getByText("errorPage.back"));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("renders custom homeHref", () => {
    render(<ErrorPage homeHref="/dashboard" />);
    const link = screen.getByText("errorPage.home").closest("a");
    expect(link?.getAttribute("href")).toBe("/dashboard");
  });

  it("renders custom illustration", () => {
    render(
      <ErrorPage
        illustration={<div data-testid="custom-illust">Custom</div>}
      />,
    );
    expect(screen.getByTestId("custom-illust")).toBeDefined();
  });

  it("renders with custom className", () => {
    const { container } = render(<ErrorPage className="my-error" />);
    expect(container.querySelector(".my-error")).not.toBeNull();
  });

  it("renders data-slot attribute", () => {
    const { container } = render(<ErrorPage />);
    expect(container.querySelector("[data-slot='error-page']")).not.toBeNull();
  });

  it("renders context section with impact and action", () => {
    render(<ErrorPage status={500} />);
    expect(screen.getByText("服务端响应异常")).toBeDefined();
    expect(
      screen.getByText("稍后重试；如果持续出现，请提交错误上下文。"),
    ).toBeDefined();
  });
});

describe("NotFound", () => {
  it("renders 404 page", () => {
    render(<NotFound />);
    const elements = screen.getAllByText("404");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});

describe("InternalError", () => {
  it("renders 500 page", () => {
    render(<InternalError />);
    const elements = screen.getAllByText("500");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Unauthorized", () => {
  it("renders 403 page", () => {
    render(<Unauthorized />);
    const elements = screen.getAllByText("403");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});
