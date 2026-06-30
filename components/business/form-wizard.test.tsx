import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormWizard } from "./form-wizard";
import type { WizardRenderContext } from "./form-wizard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

// Helpers: the nav buttons render their label text adjacent to an svg icon,
// so `getByText` is unreliable (text "broken up by multiple elements"). Use
// role+name queries against the <button> elements instead.
function nextButton(): HTMLElement {
  return screen.getByRole("button", { name: /formWizard\.next/ });
}
function backButton(): HTMLElement {
  return screen.getByRole("button", { name: /formWizard\.back/ });
}
function submitButton(): HTMLElement {
  return screen.getByRole("button", { name: /formWizard\.submit/ });
}

describe("FormWizard", () => {
  const steps = [
    {
      title: "Account",
      description: "Set up your account",
      render: ({ formData, updateField }: WizardRenderContext) => (
        <input
          aria-label="name"
          value={String(formData.name ?? "")}
          onChange={(e) => updateField("name", e.target.value)}
        />
      ),
    },
    {
      title: "Confirm",
      render: () => <span>confirm-step</span>,
    },
  ];

  it("renders the first step title and description", () => {
    render(<FormWizard steps={steps} />);
    // "Account" appears both in the Stepper label and the body <h3>.
    expect(screen.getAllByText("Account").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Set up your account")).toBeDefined();
    // First step renders the name input; step two content is not yet shown.
    expect(screen.getByLabelText("name")).toBeDefined();
    expect(screen.queryByText("confirm-step")).toBeNull();
  });

  it("disables back button on the first step", () => {
    render(<FormWizard steps={steps} />);
    expect((backButton() as HTMLButtonElement).disabled).toBe(true);
  });

  it("advances to the next step on Next click", () => {
    render(<FormWizard steps={steps} />);
    fireEvent.click(nextButton());
    // Second step content visible, first step input gone
    expect(screen.getByText("confirm-step")).toBeDefined();
    expect(screen.queryByLabelText("name")).toBeNull();
  });

  it("enables back and returns to previous step on Back click", () => {
    render(<FormWizard steps={steps} />);
    fireEvent.click(nextButton());
    expect((backButton() as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(backButton());
    expect(screen.getByLabelText("name")).toBeDefined();
  });

  it("blocks Next when validate returns errors and shows them", () => {
    const failing = [
      {
        title: "Step1",
        render: ({ errors }: WizardRenderContext) => (
          <div>
            <span>step-one</span>
            {errors.name && <span>{errors.name}</span>}
          </div>
        ),
        validate: (data: Record<string, unknown>) =>
          data.name ? {} : { name: "Name is required" },
      },
      { title: "Step2", render: () => <span>step-two</span> },
    ];
    render(<FormWizard steps={failing} />);
    fireEvent.click(nextButton());
    expect(screen.getByText("Name is required")).toBeDefined();
    expect(screen.getByText("step-one")).toBeDefined();
    expect(screen.queryByText("step-two")).toBeNull();
  });

  it("passes validation and advances when data is valid", () => {
    const failing = [
      {
        title: "Step1",
        render: ({ updateField }: WizardRenderContext) => (
          <input
            aria-label="name"
            onChange={(e) => updateField("name", e.target.value)}
          />
        ),
        validate: (data: Record<string, unknown>) =>
          data.name ? {} : { name: "required" },
      },
      { title: "Step2", render: () => <span>step-two</span> },
    ];
    render(<FormWizard steps={failing} />);
    fireEvent.change(screen.getByLabelText("name"), { target: { value: "ok" } });
    fireEvent.click(nextButton());
    expect(screen.getByText("step-two")).toBeDefined();
  });

  it("calls onComplete with form data on the last step submit", () => {
    const onComplete = vi.fn();
    render(<FormWizard steps={steps} onComplete={onComplete} />);
    fireEvent.click(nextButton());
    // Now on last step -> submit button
    fireEvent.click(submitButton());
    expect(onComplete).toHaveBeenCalledTimes(1);
    const data = onComplete.mock.calls[0]![0] as Record<string, unknown>;
    expect(data).toEqual({});
  });

  it("clears field error when updateField modifies that field", () => {
    // Two steps so the first step shows a "Next" button (single-step wizards
    // show a "Submit" button instead).
    const failing = [
      {
        title: "Step1",
        render: ({ updateField, errors }: WizardRenderContext) => (
          <div>
            <input
              aria-label="name"
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
        ),
        validate: (data: Record<string, unknown>) =>
          data.name ? {} : { name: "required" },
      },
      { title: "Step2", render: () => <span>step-two</span> },
    ];
    render(<FormWizard steps={failing} />);
    fireEvent.click(nextButton());
    expect(screen.getByText("required")).toBeDefined();
    fireEvent.change(screen.getByLabelText("name"), { target: { value: "x" } });
    expect(screen.queryByText("required")).toBeNull();
  });

  it("shows submit button label only on the last step", () => {
    render(<FormWizard steps={steps} />);
    expect(screen.queryByRole("button", { name: /formWizard\.submit/ })).toBeNull();
    expect(nextButton()).toBeDefined();
    fireEvent.click(nextButton());
    expect(submitButton()).toBeDefined();
  });

  it("renders step description when provided and omits it when absent", () => {
    render(<FormWizard steps={steps} />);
    expect(screen.getByText("Set up your account")).toBeDefined();
    fireEvent.click(nextButton());
    // Step 2 has no description -> the paragraph is not rendered.
    expect(screen.queryByText("Set up your account")).toBeNull();
  });

  it("exports FormWizard", () => {
    expect(FormWizard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WizardRenderContext | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
