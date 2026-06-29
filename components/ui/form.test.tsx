import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type {
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
} from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";

// FormLabel/FormDescription/FormMessage use useFormField() which requires
// <FormField> context. We test FormItem (context-free) + type exports here.

describe("Form", () => {
  it("renders FormItem with data-slot", () => {
    const { container } = render(<FormItem>content</FormItem>);
    expect(container.querySelector('[data-slot="form-item"]')).not.toBeNull();
  });

  it("Form*Props types are importable", () => {
    const _i: FormItemProps = {};
    const _l: FormLabelProps = { required: true };
    const _c: FormControlProps = {};
    const _d: FormDescriptionProps = {};
    const _m: FormMessageProps = {};
    expect(_l.required).toBe(true);
    expect(_i).toBeDefined();
    expect(_c).toBeDefined();
    expect(_d).toBeDefined();
    expect(_m).toBeDefined();
  });

  it("Form module is importable", async () => {
    const mod = await import("@/components/ui/form");
    expect(mod.Form).toBeDefined();
    expect(mod.FormItem).toBeDefined();
    expect(mod.FormField).toBeDefined();
  });
});
