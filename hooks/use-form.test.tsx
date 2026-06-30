import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { useForm } from "./use-form";
import type { FieldValues } from "react-hook-form";

interface FormValues extends FieldValues {
  name: string;
}

function NameForm({
  onSubmit,
  required = true,
}: {
  onSubmit: (v: FormValues) => void;
  required?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: { name: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((v) => onSubmit(v as FormValues))}
      data-testid="form"
    >
      <input
        aria-label="name"
        {...register("name", { required: required ? "Name is required" : false })}
      />
      {errors.name ? (
        <span data-testid="error">{errors.name.message as string}</span>
      ) : null}
      {isSubmitSuccessful ? <span data-testid="ok">submitted</span> : null}
      <button type="submit">save</button>
    </form>
  );
}

describe("use-form", () => {
  it("exports useForm", () => {
    expect(useForm).toBeDefined();
  });

  it("renders a registered input", () => {
    render(<NameForm onSubmit={() => {}} />);
    expect(screen.getByLabelText("name")).toBeDefined();
  });

  it("applies onTouched mode: validation fires only after first blur + change", async () => {
    render(<NameForm onSubmit={() => {}} />);
    // No error initially.
    expect(screen.queryByTestId("error")).toBeNull();
    // Typing alone (without blur) should NOT trigger validation in onTouched mode.
    await act(async () => {
      fireEvent.change(screen.getByLabelText("name"), {
        target: { value: "a" },
      });
    });
    expect(screen.queryByTestId("error")).toBeNull();
  });

  it("shows validation error after blur when field is empty", async () => {
    render(<NameForm onSubmit={() => {}} />);
    await act(async () => {
      fireEvent.blur(screen.getByLabelText("name"));
    });
    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe("Name is required");
    });
  });

  it("submits valid values to onSubmit handler", async () => {
    const submit = vi.fn();
    render(<NameForm onSubmit={submit} />);
    await act(async () => {
      fireEvent.change(screen.getByLabelText("name"), {
        target: { value: "Alice" },
      });
    });
    await act(async () => {
      fireEvent.blur(screen.getByLabelText("name"));
    });
    await act(async () => {
      fireEvent.click(screen.getByText("save"));
    });
    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
    expect(submit.mock.calls[0]?.[0]).toEqual({ name: "Alice" });
    expect(screen.getByTestId("ok")).toBeDefined();
  });

  it("blocks submit when validation fails", async () => {
    const submit = vi.fn();
    render(<NameForm onSubmit={submit} />);
    await act(async () => {
      fireEvent.blur(screen.getByLabelText("name"));
    });
    await act(async () => {
      fireEvent.click(screen.getByText("save"));
    });
    await waitFor(() => expect(screen.getByTestId("error")).toBeDefined());
    expect(submit).not.toHaveBeenCalled();
  });

  it("allows overriding mode via props", async () => {
    function ModeForm({ onSubmit }: { onSubmit: (v: { nm: string }) => void }) {
      const { register, handleSubmit } = useForm<{ nm: string }>({
        mode: "onChange",
        defaultValues: { nm: "" },
      });
      return (
        <form onSubmit={handleSubmit((v) => onSubmit(v))}>
          <input aria-label="nm" {...register("nm", { required: "req" })} />
          <button type="submit">go</button>
        </form>
      );
    }
    const submit = vi.fn();
    render(<ModeForm onSubmit={submit} />);
    // onChange fires validation immediately on change (no blur needed).
    await act(async () => {
      fireEvent.change(screen.getByLabelText("nm"), { target: { value: "" } });
    });
    await act(async () => {
      fireEvent.click(screen.getByText("go"));
    });
    await waitFor(() => expect(submit).not.toHaveBeenCalled());
  });

  it("reset() restores default values and clears errors", async () => {
    function ResetForm() {
      const { register, handleSubmit, reset, formState: { errors } } =
        useForm<FormValues>({ defaultValues: { name: "" } });
      return (
        <form onSubmit={handleSubmit(() => {})} data-testid="form">
          <input
            aria-label="rn"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name ? (
            <span data-testid="rerror">{errors.name.message as string}</span>
          ) : null}
          <button type="button" onClick={() => reset({ name: "defaulted" })}>
            reset
          </button>
        </form>
      );
    }
    render(<ResetForm />);
    await act(async () => {
      fireEvent.blur(screen.getByLabelText("rn"));
    });
    await waitFor(() => expect(screen.getByTestId("rerror")).toBeDefined());
    await act(async () => {
      fireEvent.click(screen.getByText("reset"));
    });
    expect(screen.queryByTestId("rerror")).toBeNull();
    expect((screen.getByLabelText("rn") as HTMLInputElement).value).toBe(
      "defaulted",
    );
  });

  it("watch() reflects the current input value", async () => {
    function WatchForm() {
      const { register, watch } = useForm<{ name: string }>({
        defaultValues: { name: "" },
      });
      const value = watch("name");
      return (
        <form>
          <input aria-label="wn" {...register("name")} />
          <span data-testid="watched">{value}</span>
        </form>
      );
    }
    render(<WatchForm />);
    expect(screen.getByTestId("watched").textContent).toBe("");
    await act(async () => {
      fireEvent.change(screen.getByLabelText("wn"), {
        target: { value: "Bob" },
      });
    });
    expect(screen.getByTestId("watched").textContent).toBe("Bob");
  });

  it("supports the TContext generic without errors", () => {
    type Ctx = { role: string };
    function CtxForm() {
      const form = useForm<{ name: string }, Ctx>({
        defaultValues: { name: "" },
        context: { role: "admin" },
      });
      return (
        <form>
          <input aria-label="cn" {...form.register("name")} />
          <span data-testid="ctx-ok">{form.control ? "yes" : "no"}</span>
        </form>
      );
    }
    render(<CtxForm />);
    expect(screen.getByTestId("ctx-ok").textContent).toBe("yes");
  });

  it("isDirty tracks manual edits", async () => {
    function DirtyForm() {
      const { register, formState: { isDirty } } = useForm<{ name: string }>({
        defaultValues: { name: "" },
      });
      return (
        <form>
          <input aria-label="dn" {...register("name")} />
          <span data-testid="dirty">{isDirty ? "dirty" : "clean"}</span>
        </form>
      );
    }
    render(<DirtyForm />);
    expect(screen.getByTestId("dirty").textContent).toBe("clean");
    await act(async () => {
      fireEvent.change(screen.getByLabelText("dn"), {
        target: { value: "ed" },
      });
    });
    await waitFor(() =>
      expect(screen.getByTestId("dirty").textContent).toBe("dirty"),
    );
  });

  it("applies default onTouched mode when no mode prop is given", async () => {
    // onTouched: validation triggers after the first blur, then on every change.
    function DefaultModeForm() {
      const { register, formState: { errors } } = useForm<{ name: string }>({
        defaultValues: { name: "" },
      });
      return (
        <form>
          <input
            aria-label="dmn"
            {...register("name", { required: "need name" })}
          />
          {errors.name ? (
            <span data-testid="dmerror">{errors.name.message as string}</span>
          ) : null}
        </form>
      );
    }
    render(<DefaultModeForm />);
    // No error before interaction.
    expect(screen.queryByTestId("dmerror")).toBeNull();
    await act(async () => {
      fireEvent.change(screen.getByLabelText("dmn"), {
        target: { value: "x" },
      });
    });
    // onTouched: change alone (no blur yet) should NOT surface the error.
    expect(screen.queryByTestId("dmerror")).toBeNull();
    // After blur, validation engages and re-running change to empty shows error.
    await act(async () => {
      fireEvent.blur(screen.getByLabelText("dmn"));
    });
    await act(async () => {
      fireEvent.change(screen.getByLabelText("dmn"), {
        target: { value: "" },
      });
    });
    await waitFor(() =>
      expect(screen.getByTestId("dmerror").textContent).toBe("need name"),
    );
  });
});
