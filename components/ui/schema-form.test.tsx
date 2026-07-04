import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { z } from "zod";
import { SchemaForm } from "./schema-form";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Values = z.infer<typeof schema>;

const defaults: Values = { email: "", password: "" };

describe("SchemaForm", () => {
  it("renders fields derived from defaultValues with consumer-supplied field overrides", () => {
    render(
      <SchemaForm<Values>
        schema={schema}
        defaultValues={defaults}
        fields={{
          email: { type: "email", label: "Email", required: true },
          password: { type: "password", label: "Password", required: true },
        }}
        submitText="Sign in"
        resetText="Clear"
      />,
    );
    expect(screen.getByLabelText(/Email/)).toBeDefined();
    expect(screen.getByLabelText(/Password/)).toBeDefined();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Clear" })).toBeDefined();
  });

  it("blocks submit and surfaces zod errors when fields are empty", async () => {
    const onSubmit = vi.fn();
    render(
      <SchemaForm<Values>
        schema={schema}
        defaultValues={defaults}
        fields={{
          email: { type: "email", label: "Email", required: true },
          password: { type: "password", label: "Password", required: true },
        }}
        submitText="Sign in"
        resetText={null}
        onSubmit={onSubmit}
      />,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    });

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeDefined();
      expect(screen.getByText("Must be at least 8 characters")).toBeDefined();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits validated values when fields are valid", async () => {
    const onSubmit = vi.fn();
    render(
      <SchemaForm<Values>
        schema={schema}
        defaultValues={defaults}
        fields={{
          email: { type: "email", label: "Email", required: true },
          password: { type: "password", label: "Password", required: true },
        }}
        submitText="Sign in"
        resetText={null}
        onSubmit={onSubmit}
      />,
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Email/), {
        target: { value: "user@example.com" },
      });
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Password/), {
        target: { value: "supersecret" },
      });
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      email: "user@example.com",
      password: "supersecret",
    });
  });

  it("resets form to defaultValues when the reset button is clicked", async () => {
    render(
      <SchemaForm<Values>
        schema={schema}
        defaultValues={defaults}
        fields={{
          email: { type: "email", label: "Email" },
          password: { type: "password", label: "Password" },
        }}
        submitText="Sign in"
        resetText="Reset"
      />,
    );

    const emailInput = screen.getByLabelText(/Email/) as HTMLInputElement;
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "a@b.com" } });
    });
    expect(emailInput.value).toBe("a@b.com");

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    });
    expect(emailInput.value).toBe("");
  });

  it("hides a field marked hidden in overrides", () => {
    render(
      <SchemaForm<Values>
        schema={schema}
        defaultValues={defaults}
        fields={{
          email: { type: "email", label: "Email", hidden: true },
          password: { type: "password", label: "Password" },
        }}
        submitText="Sign in"
        resetText={null}
      />,
    );
    expect(screen.queryByLabelText("Email")).toBeNull();
    expect(screen.getByLabelText(/Password/)).toBeDefined();
  });
});
