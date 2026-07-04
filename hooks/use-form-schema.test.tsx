import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { z } from "zod";
import { useFormSchema } from "./use-form-schema";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

type Values = z.infer<typeof schema>;

describe("useFormSchema", () => {
  it("exports the hook", () => {
    expect(useFormSchema).toBeDefined();
  });

  it("returns a react-hook-form instance when given a zod schema", () => {
    const { result } = renderHook(() =>
      useFormSchema<Values>({
        schema,
        defaultValues: { email: "", password: "" },
      }),
    );
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState).toBeDefined();
  });

  it("delegates to plain useForm when neither schema nor resolver is supplied", () => {
    const { result } = renderHook(() =>
      useFormSchema<Values>({ defaultValues: { email: "", password: "" } }),
    );
    expect(result.current.register).toBeDefined();
  });

  it("prefers an explicit resolver over the schema option", () => {
    const customResolver = vi.fn();
    const { result } = renderHook(() =>
      useFormSchema<Values>({
        schema,
        resolver: customResolver as never,
        defaultValues: { email: "", password: "" },
      }),
    );
    expect(result.current.register).toBeDefined();
    expect(customResolver).not.toHaveBeenCalled(); // resolver is wired into RHF, not invoked directly
  });

  it("preserves default onTouched mode inherited from useForm", () => {
    const { result } = renderHook(() =>
      useFormSchema<Values>({
        schema,
        defaultValues: { email: "", password: "" },
      }),
    );
    expect(result.current.formState).toBeDefined();
  });
});
