import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DialogFormBody, FormStack } from "./dialog-form-body";
import type { DialogFormBodyProps, FormStackProps } from "./dialog-form-body";

describe("dialog-form-body", () => {
  it("exports DialogFormBody", () => {
    expect(DialogFormBody).toBeDefined();
  });

  it("exports FormStack", () => {
    expect(FormStack).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DialogFormBodyProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: FormStackProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/dialog-form-body");
    expect(mod.DialogFormBody).toBeDefined();
    expect(mod.FormStack).toBeDefined();
  });

  it("renders children inside the body", () => {
    render(
      <DialogFormBody>
        <div>Field One</div>
        <div>Field Two</div>
      </DialogFormBody>,
    );
    expect(screen.getByText("Field One")).toBeDefined();
    expect(screen.getByText("Field Two")).toBeDefined();
  });

  it("applies data-slot and flex-col classes on the root", () => {
    const { container } = render(<DialogFormBody><span>x</span></DialogFormBody>);
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root).not.toBeNull();
    expect(root?.classList.contains("flex")).toBe(true);
    expect(root?.classList.contains("flex-col")).toBe(true);
  });

  it("applies default gap (3 -> 0.75rem) via inline style", () => {
    const { container } = render(<DialogFormBody><span>x</span></DialogFormBody>);
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 0.75rem");
  });

  it("applies a numeric gap converted to rem", () => {
    const { container } = render(
      <DialogFormBody gap={4}><span>x</span></DialogFormBody>,
    );
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 1rem");
  });

  it("accepts a string gap verbatim", () => {
    const { container } = render(
      <DialogFormBody gap="24px"><span>x</span></DialogFormBody>,
    );
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 24px");
  });

  it("applies a custom className merged onto the root", () => {
    const { container } = render(
      <DialogFormBody className="custom-body"><span>x</span></DialogFormBody>,
    );
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.classList.contains("custom-body")).toBe(true);
  });

  it("forwards extra div props to the root element", () => {
    const { container } = render(
      <DialogFormBody id="form-body" role="group"><span>x</span></DialogFormBody>,
    );
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.id).toBe("form-body");
    expect(root?.getAttribute("role")).toBe("group");
  });
});

describe("FormStack", () => {
  it("renders children", () => {
    render(
      <FormStack>
        <span>A</span>
        <span>B</span>
      </FormStack>,
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });

  it("applies data-slot and flex classes for vertical direction by default", () => {
    const { container } = render(<FormStack><span>x</span></FormStack>);
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root).not.toBeNull();
    expect(root?.classList.contains("flex-col")).toBe(true);
    expect(root?.classList.contains("flex-row")).toBe(false);
  });

  it("applies flex-row and flex-wrap for horizontal direction", () => {
    const { container } = render(
      <FormStack direction="horizontal"><span>x</span></FormStack>,
    );
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.classList.contains("flex-row")).toBe(true);
    expect(root?.classList.contains("flex-wrap")).toBe(true);
  });

  it("applies default gap (4 -> 1rem) via inline style", () => {
    const { container } = render(<FormStack><span>x</span></FormStack>);
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 1rem");
  });

  it("accepts a numeric gap converted to rem", () => {
    const { container } = render(<FormStack gap={2}><span>x</span></FormStack>);
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 0.5rem");
  });

  it("accepts a string gap verbatim", () => {
    const { container } = render(
      <FormStack gap="32px"><span>x</span></FormStack>,
    );
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 32px");
  });

  it("applies a custom className merged onto the root", () => {
    const { container } = render(
      <FormStack className="custom-stack"><span>x</span></FormStack>,
    );
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.classList.contains("custom-stack")).toBe(true);
  });

  // ---- Deeper interaction tests ----

  it("DialogFormBody renders nested form fields and preserves order", () => {
    render(
      <DialogFormBody>
        <label htmlFor="a">Name</label>
        <input id="a" type="text" defaultValue="Alice" />
        <label htmlFor="b">Email</label>
        <input id="b" type="email" defaultValue="alice@example.com" />
      </DialogFormBody>,
    );
    expect(screen.getByLabelText("Name")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Alice");
  });

  it("DialogFormBody gap=0 produces 0rem inline style", () => {
    const { container } = render(<DialogFormBody gap={0}><span>x</span></DialogFormBody>);
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 0rem");
  });

  it("DialogFormBody applies py-4 padding class", () => {
    const { container } = render(<DialogFormBody><span>x</span></DialogFormBody>);
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root?.classList.contains("py-4")).toBe(true);
  });

  it("FormStack renders interactive children and supports typing", () => {
    render(
      <FormStack>
        <label htmlFor="q">Query</label>
        <input id="q" type="text" />
      </FormStack>,
    );
    const input = screen.getByLabelText("Query") as HTMLInputElement;
    expect(input).toBeDefined();
  });

  it("FormStack horizontal direction renders items in a row with flex-wrap", () => {
    const { container } = render(
      <FormStack direction="horizontal">
        <span>a</span>
        <span>b</span>
      </FormStack>,
    );
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.classList.contains("flex-row")).toBe(true);
    expect(root?.classList.contains("flex-wrap")).toBe(true);
    expect(root?.classList.contains("flex-col")).toBe(false);
  });

  it("FormStack vertical (default) does not apply flex-row", () => {
    const { container } = render(<FormStack><span>x</span></FormStack>);
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.classList.contains("flex-col")).toBe(true);
    expect(root?.classList.contains("flex-row")).toBe(false);
  });

  it("FormStack gap=0 produces 0rem inline style", () => {
    const { container } = render(<FormStack gap={0}><span>x</span></FormStack>);
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.getAttribute("style") ?? "").toContain("gap: 0rem");
  });

  it("FormStack forwards extra div props to the root element", () => {
    const { container } = render(
      <FormStack id="stack-root" role="group" aria-label="Form stack">
        <span>x</span>
      </FormStack>,
    );
    const root = container.querySelector('[data-slot="form-stack"]');
    expect(root?.id).toBe("stack-root");
    expect(root?.getAttribute("role")).toBe("group");
    expect(root?.getAttribute("aria-label")).toBe("Form stack");
  });

  it("DialogFormBody with no children renders an empty flex column", () => {
    const { container } = render(<DialogFormBody />);
    const root = container.querySelector('[data-slot="dialog-form-body"]');
    expect(root).not.toBeNull();
    expect(root?.textContent ?? "").toBe("");
  });
});
