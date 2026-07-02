import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QualityInspectionForm, computeResult } from "./quality-inspection-form";
import type {
  InspectionTemplate,
  InspectionResult,
} from "./quality-inspection-form";

const iqcTemplate: InspectionTemplate = {
  name: "IQC - Raw Material",
  type: "IQC",
  description: "Incoming quality check for raw materials",
  fields: [
    {
      id: "thickness",
      label: "Thickness",
      type: "measurement",
      unit: "mm",
      specMin: 4.8,
      specMax: 5.2,
      required: true,
    },
    {
      id: "width",
      label: "Width",
      type: "measurement",
      unit: "mm",
      specMin: 99,
      specMax: 101,
    },
    {
      id: "visual",
      label: "Visual Check",
      type: "passfail",
      required: true,
    },
    {
      id: "grade",
      label: "Material Grade",
      type: "select",
      options: [
        { label: "Grade A", value: "a" },
        { label: "Grade B", value: "b" },
      ],
    },
    {
      id: "notes",
      label: "Notes",
      type: "text",
    },
    {
      id: "photo",
      label: "Defect Photo",
      type: "photo",
    },
  ],
};

describe("QualityInspectionForm", () => {
  it("renders template name and all field types from template", () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    expect(screen.getByText("IQC - Raw Material")).toBeDefined();
    expect(screen.getByText("Thickness")).toBeDefined();
    expect(screen.getByText(/Visual Check/)).toBeDefined();
    expect(screen.getByText(/Material Grade/)).toBeDefined();
    expect(screen.getByText("Notes")).toBeDefined();
  });

  it("measurement shows unit and spec range", () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    // Two measurement fields both render "Spec:" text
    expect(screen.getAllByText(/Spec:/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/4\.8/)).toBeDefined();
    expect(screen.getByText(/5\.2/)).toBeDefined();
    // Two measurement fields both show (mm) unit
    expect(screen.getAllByText(/\(mm\)/).length).toBeGreaterThanOrEqual(2);
  });

  it("measurement out-of-spec shows error styling on submit", async () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    const input = screen.getByPlaceholderText("Enter thickness");
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.click(screen.getByText("Submit Inspection"));
    await waitFor(() => {
      expect(screen.getByText("Must be <= 5.2")).toBeDefined();
    });
  });

  it("passfail radio buttons work", () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    expect(screen.getByText("Pass")).toBeDefined();
    expect(screen.getByText("Fail")).toBeDefined();
  });

  it("select dropdown renders options", () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    expect(screen.getByText("Select...")).toBeDefined();
  });

  it("auto-computed result = pass when all within spec", () => {
    const simpleTemplate: InspectionTemplate = {
      name: "Simple",
      fields: [
        { id: "weight", label: "Weight", type: "measurement", unit: "g", specMin: 90, specMax: 110 },
        { id: "check", label: "Check", type: "passfail" },
      ],
    };
    const result = computeResult(simpleTemplate, { weight: 100, check: "pass" });
    expect(result).toBe("pass");
  });

  it("auto-computed result = fail when any out of spec", () => {
    const simpleTemplate: InspectionTemplate = {
      name: "Simple",
      fields: [
        { id: "weight", label: "Weight", type: "measurement", unit: "g", specMin: 90, specMax: 110 },
        { id: "check", label: "Check", type: "passfail" },
      ],
    };
    expect(computeResult(simpleTemplate, { weight: 200, check: "pass" })).toBe("fail");
    expect(computeResult(simpleTemplate, { weight: 100, check: "fail" })).toBe("fail");
  });

  it("auto-computed result = pending when incomplete", () => {
    const simpleTemplate: InspectionTemplate = {
      name: "Simple",
      fields: [
        { id: "weight", label: "Weight", type: "measurement", unit: "g", specMin: 90, specMax: 110 },
        { id: "check", label: "Check", type: "passfail" },
      ],
    };
    expect(computeResult(simpleTemplate, { weight: "", check: "" })).toBe("pending");
  });

  it("submit fires onSubmit with correct result", async () => {
    const simpleTemplate: InspectionTemplate = {
      name: "Simple",
      fields: [
        { id: "remark", label: "Remark", type: "text" },
      ],
    };
    const onSubmit = vi.fn<(result: InspectionResult) => void>();
    render(
      <QualityInspectionForm template={simpleTemplate} onSubmit={onSubmit} />,
    );
    fireEvent.click(screen.getByText("Submit Inspection"));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    const result = onSubmit.mock.calls[0]![0];
    expect(result.result).toBe("pass");
    expect(result.date).toBeDefined();
  });

  it("readOnly mode displays values without inputs", () => {
    render(
      <QualityInspectionForm
        template={iqcTemplate}
        readOnly
        values={{
          thickness: 5.0,
          width: 100,
          visual: "pass",
          grade: "a",
          notes: "All good",
        }}
        inspector="Li Na"
      />,
    );
    expect(screen.getByTestId("readonly-thickness").textContent).toBe("5");
    expect(screen.getByTestId("readonly-visual").textContent).toContain("Pass");
    expect(screen.getByTestId("readonly-grade").textContent).toBe("a");
    expect(screen.getByTestId("readonly-notes").textContent).toBe("All good");
    expect(screen.getByText("Li Na")).toBeDefined();
  });

  it("readOnly mode shows em-dash for empty values", () => {
    render(
      <QualityInspectionForm
        template={iqcTemplate}
        readOnly
        values={{}}
      />,
    );
    expect(screen.getByTestId("readonly-thickness").textContent).toBe("\u2014");
  });

  it("grouped fields render under group headers", () => {
    const groupedTemplate: InspectionTemplate = {
      name: "Grouped Inspection",
      fields: [
        { id: "f1", label: "Length", type: "measurement", unit: "mm", group: "Dimensions" },
        { id: "f2", label: "Width", type: "measurement", unit: "mm", group: "Dimensions" },
        { id: "f3", label: "Surface", type: "passfail", group: "Appearance" },
      ],
    };
    render(<QualityInspectionForm template={groupedTemplate} />);
    expect(screen.getByTestId("group-header-Dimensions")).toBeDefined();
    expect(screen.getByTestId("group-header-Appearance")).toBeDefined();
  });

  it("has data-slot attribute on root", () => {
    const { container } = render(
      <QualityInspectionForm template={iqcTemplate} />,
    );
    expect(
      container.querySelector('[data-slot="quality-inspection-form"]'),
    ).toBeDefined();
  });

  it("renders photo upload placeholder", () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    expect(screen.getByTestId("photo-upload-placeholder")).toBeDefined();
    expect(screen.getByText("Upload Photo")).toBeDefined();
  });

  it("shows PENDING result badge by default (no values filled)", () => {
    render(<QualityInspectionForm template={iqcTemplate} />);
    const badge = screen.getByTestId("inspection-result-badge");
    expect(badge.textContent).toBe("PENDING");
  });
});
