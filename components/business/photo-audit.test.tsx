import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhotoAudit } from "./photo-audit";
import type { PhotoAuditProps } from "./photo-audit";

describe("PhotoAudit", () => {
  it("renders the current photo caption and counter", () => {
    render(
      <PhotoAudit photos={[{ src: "/a.jpg", alt: "收据" }, { src: "/b.jpg" }]} />,
    );
    expect(screen.getByText("收据")).toBeDefined();
    expect(screen.getByText("1 / 2")).toBeDefined();
    expect(screen.getByRole("group", { name: "照片审核" })).toBeDefined();
  });

  it("uses a default caption when alt is missing", () => {
    render(<PhotoAudit photos={[{ src: "/a.jpg" }]} />);
    expect(screen.getByText("照片 1")).toBeDefined();
  });

  it("renders an empty state when there are no photos", () => {
    render(<PhotoAudit photos={[]} />);
    expect(screen.getByText("暂无待审核照片")).toBeDefined();
    expect(screen.getByText("0 / 0")).toBeDefined();
  });

  it("invokes onApprove when the approve button is clicked", () => {
    const onApprove = vi.fn();
    render(
      <PhotoAudit
        photos={[{ src: "/a.jpg", alt: "收据" }]}
        onApprove={onApprove}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "通过" }));
    expect(onApprove).toHaveBeenCalledWith(0);
    expect(screen.getByText("已通过")).toBeDefined();
  });

  it("invokes onReject with a reason when the reject button is clicked", () => {
    const onReject = vi.fn();
    render(
      <PhotoAudit
        photos={[{ src: "/a.jpg", alt: "收据" }]}
        onReject={onReject}
      />,
    );
    fireEvent.change(screen.getByRole("textbox", { name: "驳回理由" }), {
      target: { value: "不清晰" },
    });
    fireEvent.click(screen.getByRole("button", { name: "驳回" }));
    expect(onReject).toHaveBeenCalledWith(0, "不清晰");
    expect(screen.getByText("已驳回")).toBeDefined();
  });

  it("uses the default reject reason when the reason is blank", () => {
    const onReject = vi.fn();
    render(
      <PhotoAudit
        photos={[{ src: "/a.jpg", alt: "收据" }]}
        onReject={onReject}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "驳回" }));
    expect(onReject).toHaveBeenCalledWith(0, "未通过审核");
    expect(screen.getByText("已驳回")).toBeDefined();
  });

  it("navigates between photos with the prev/next buttons", () => {
    render(
      <PhotoAudit photos={[{ src: "/a.jpg", alt: "图一" }, { src: "/b.jpg", alt: "图二" }]} />,
    );
    expect(screen.getByText("1 / 2")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "下一张" }));
    expect(screen.getByText("2 / 2")).toBeDefined();
    expect(screen.getByText("图二")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "上一张" }));
    expect(screen.getByText("1 / 2")).toBeDefined();
  });

  it("disables prev on the first photo and next on the last photo", () => {
    render(
      <PhotoAudit photos={[{ src: "/a.jpg", alt: "图一" }, { src: "/b.jpg", alt: "图二" }]} />,
    );
    expect(screen.getByRole("button", { name: "上一张" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "下一张" })).not.toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "下一张" }));
    expect(screen.getByRole("button", { name: "下一张" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "上一张" })).not.toBeDisabled();
  });

  it("navigates with ArrowRight and ArrowLeft keys on the card", () => {
    render(
      <PhotoAudit photos={[{ src: "/a.jpg", alt: "图一" }, { src: "/b.jpg", alt: "图二" }]} />,
    );
    const card = screen.getByRole("group", { name: "照片审核" });
    fireEvent.keyDown(card, { key: "ArrowRight" });
    expect(screen.getByText("2 / 2")).toBeDefined();
    fireEvent.keyDown(card, { key: "ArrowLeft" });
    expect(screen.getByText("1 / 2")).toBeDefined();
  });

  it("does not navigate past the bounds with arrow keys", () => {
    render(
      <PhotoAudit photos={[{ src: "/a.jpg", alt: "图一" }, { src: "/b.jpg", alt: "图二" }]} />,
    );
    const card = screen.getByRole("group", { name: "照片审核" });
    // already on first; ArrowLeft keeps it on first
    fireEvent.keyDown(card, { key: "ArrowLeft" });
    expect(screen.getByText("1 / 2")).toBeDefined();
    // go to last
    fireEvent.keyDown(card, { key: "ArrowRight" });
    expect(screen.getByText("2 / 2")).toBeDefined();
    // ArrowRight on last stays on last
    fireEvent.keyDown(card, { key: "ArrowRight" });
    expect(screen.getByText("2 / 2")).toBeDefined();
  });

  it("approves the currently active photo after navigating", () => {
    const onApprove = vi.fn();
    render(
      <PhotoAudit
        photos={[{ src: "/a.jpg", alt: "图一" }, { src: "/b.jpg", alt: "图二" }]}
        onApprove={onApprove}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "下一张" }));
    fireEvent.click(screen.getByRole("button", { name: "通过" }));
    expect(onApprove).toHaveBeenCalledWith(1);
  });

  it("renders the image element with the provided src", () => {
    render(<PhotoAudit photos={[{ src: "/a.jpg", alt: "收据" }]} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/a.jpg");
    expect(img).toHaveAttribute("alt", "收据");
  });

  it("applies a custom className", () => {
    const { container } = render(
      <PhotoAudit photos={[]} className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass("custom-cls");
  });

  it("exports types", () => {
    const _tc: PhotoAuditProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
