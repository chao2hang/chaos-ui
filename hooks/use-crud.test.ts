import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useCrud } from "@/hooks/use-crud";
import type { UseCrudConfig } from "@/hooks/use-crud";

// Mock the message lib so useCrud's success/error calls are observable and
// don't depend on sonner portal rendering in jsdom.
vi.mock("@/lib/message", () => {
  const message = {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(() => 0),
    promise: vi.fn(<T,>(p: Promise<T>) => p),
    destroy: vi.fn(),
  };
  return { message };
});

import { message } from "@/lib/message";

type Row = { id: number; name: string };

function makeConfig(overrides?: Partial<UseCrudConfig<Row, Partial<Row>>>) {
  const fetcher = vi.fn(
    async (
      _page: number,
      _pageSize: number,
      _filters: Record<string, unknown>,
    ) => ({ list: [{ id: 1, name: "alpha" }] as Row[], total: 1 }),
  );
  return {
    fetcher,
    config: {
      fetcher,
      emptyForm: { name: "" } as Partial<Row>,
      rowKey: "id" as const,
      defaultPageSize: 10,
      ...overrides,
    } satisfies UseCrudConfig<Row, Partial<Row>>,
  };
}

describe("useCrud", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(globalThis, "confirm").mockReturnValue(true);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("module is importable with expected exports", async () => {
    const mod = await import("@/hooks/use-crud");
    expect(mod.useCrud).toBeDefined();
  });

  it("initial fetch on mount sets data and total", async () => {
    const { fetcher, config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await waitFor(() => expect(result.current.data.length).toBe(1));
    expect(result.current.total).toBe(1);
    expect(result.current.loading).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("setFilters triggers a single fetch and resets to page 1", async () => {
    const { fetcher, config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));

    await act(async () => {});
    act(() => result.current.pagination.setPage(3));
    await act(async () => {});
    fetcher.mockClear();
    act(() => result.current.setFilters({ keyword: "abc" }));
    await act(async () => {});
    const lastCall = fetcher.mock.calls[fetcher.mock.calls.length - 1];
    expect(lastCall?.[0]).toBe(1);
    expect(lastCall?.[2]).toEqual({ keyword: "abc" });
    expect(fetcher.mock.calls.length).toBe(1);
  });

  it("setFilters identity is stable across renders", () => {
    const { config } = makeConfig();
    const { result, rerender } = renderHook(() =>
      useCrud<Row, Partial<Row>>(config),
    );
    const first = result.current.setFilters;
    rerender();
    rerender();
    expect(result.current.setFilters).toBe(first);
  });

  it("resetFilters replaces filters entirely and resets to page 1", async () => {
    const { fetcher, config } = makeConfig({
      defaultFilters: { keyword: "x" },
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.pagination.setPage(4));
    await act(async () => {});
    fetcher.mockClear();
    act(() => result.current.resetFilters({ status: "OPEN" }));
    await act(async () => {});
    const lastCall = fetcher.mock.calls[fetcher.mock.calls.length - 1];
    expect(lastCall?.[0]).toBe(1);
    // resetFilters replaces (not merges) filters.
    expect(lastCall?.[2]).toEqual({ status: "OPEN" });
  });

  it("handleAdd opens modal with empty form and clears editing", async () => {
    const { config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    expect(result.current.modalOpen).toBe(false);
    expect(result.current.isEdit).toBe(false);
    act(() => result.current.handleAdd());
    expect(result.current.modalOpen).toBe(true);
    expect(result.current.editing).toBeNull();
    expect(result.current.isEdit).toBe(false);
    expect(result.current.form).toEqual({ name: "" });
  });

  it("handleEdit opens modal populated with the record and sets isEdit", async () => {
    const { config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    const record: Row = { id: 5, name: "beta" };
    act(() => result.current.handleEdit(record));
    expect(result.current.modalOpen).toBe(true);
    expect(result.current.editing).toEqual(record);
    expect(result.current.isEdit).toBe(true);
    expect(result.current.form).toEqual({ id: 5, name: "beta" });
  });

  it("updateFormField updates a single form field", async () => {
    const { config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    act(() => result.current.updateFormField("name", "gamma"));
    expect(result.current.form.name).toBe("gamma");
  });

  it("onValidate blocks submit and shows error message", async () => {
    const { config } = makeConfig({
      onValidate: (form) => (form.name ? null : "Name is required"),
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(message.error).toHaveBeenCalledWith("Name is required");
    expect(result.current.modalOpen).toBe(true); // modal stays open on validation fail
  });

  it("handleSubmit create path calls onCreate and shows success", async () => {
    const onCreate = vi.fn(async (_form: Partial<Row>) => undefined);
    const { fetcher, config } = makeConfig({
      onCreate,
      successMessage: "Saved!",
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    act(() => result.current.updateFormField("name", "newone"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(onCreate).toHaveBeenCalledWith({ name: "newone" });
    expect(message.success).toHaveBeenCalledWith("Saved!");
    expect(result.current.modalOpen).toBe(false);
    // re-fetched after submit
    expect(fetcher.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("handleSubmit update path calls onUpdate with rowKey id", async () => {
    const onUpdate = vi.fn(
      async (_id: string | number, _form: Partial<Row>) => undefined,
    );
    const { config } = makeConfig({
      onUpdate,
      successMessage: { update: "Updated!" },
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    const record: Row = { id: 9, name: "old" };
    act(() => result.current.handleEdit(record));
    act(() => result.current.updateFormField("name", "new"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(onUpdate).toHaveBeenCalledWith(9, { id: 9, name: "new" });
    expect(message.success).toHaveBeenCalledWith("Updated!");
  });

  it("handleSubmit create error shows fallback error message", async () => {
    const onCreate = vi.fn(async () => {
      throw new Error("boom");
    });
    const { config } = makeConfig({ onCreate });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    act(() => result.current.updateFormField("name", "z"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(message.error).toHaveBeenCalledWith("Operation failed");
  });

  it("successMessage false disables success messages", async () => {
    const onCreate = vi.fn(async () => undefined);
    const { config } = makeConfig({ onCreate, successMessage: false });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    act(() => result.current.updateFormField("name", "n"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(onCreate).toHaveBeenCalled();
    expect(message.success).not.toHaveBeenCalled();
  });

  it("handleDelete calls onDelete with rowKey id and shows delete success", async () => {
    const onDelete = vi.fn(async (_id: string | number) => undefined);
    const { fetcher, config } = makeConfig({
      onDelete,
      successMessage: { delete: "Deleted!" },
      deleteConfirmTitle: "Sure?",
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    fetcher.mockClear();
    await act(async () => {
      await result.current.handleDelete({ id: 7, name: "del" });
    });
    expect(onDelete).toHaveBeenCalledWith(7);
    expect(message.success).toHaveBeenCalledWith("Deleted!");
    expect(fetcher).toHaveBeenCalled();
  });

  it("handleDelete does nothing when onDelete is missing", async () => {
    // Omit onDelete entirely (exactOptionalPropertyTypes forbids `undefined`).
    const { config } = makeConfig({});
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    await act(async () => {
      await result.current.handleDelete({ id: 1, name: "x" });
    });
    expect(message.success).not.toHaveBeenCalled();
  });

  it("handleDelete is cancelled when confirm returns false", async () => {
    vi.spyOn(globalThis, "confirm").mockReturnValue(false);
    const onDelete = vi.fn(async () => undefined);
    const { config } = makeConfig({ onDelete });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    await act(async () => {
      await result.current.handleDelete({ id: 1, name: "x" });
    });
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("refresh re-runs the fetcher", async () => {
    const { fetcher, config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    fetcher.mockClear();
    // Use await act so the async fetchData() promise (setLoading/setData/setTotal)
    // fully flushes before the test ends — otherwise the trailing setState leaks
    // into the next test and nulls its renderHook result.
    await act(async () => {
      result.current.refresh();
      await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    });
  });

  it("successMessage undefined falls back to default per-operation messages", async () => {
    const onCreate = vi.fn(async () => undefined);
    const { config } = makeConfig({ onCreate }); // successMessage undefined
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    act(() => result.current.updateFormField("name", "n"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(message.success).toHaveBeenCalledWith("Created successfully");
  });

  it("handleSubmit update error shows fallback error message", async () => {
    const onUpdate = vi.fn(async () => {
      throw new Error("update boom");
    });
    const { config } = makeConfig({ onUpdate });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleEdit({ id: 3, name: "old" }));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(message.error).toHaveBeenCalledWith("Operation failed");
  });

  it("handleDelete error shows delete error message", async () => {
    const onDelete = vi.fn(async () => {
      throw new Error("delete boom");
    });
    const { config } = makeConfig({ onDelete });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    await act(async () => {
      await result.current.handleDelete({ id: 2, name: "x" });
    });
    expect(message.error).toHaveBeenCalledWith("Delete failed");
  });

  it("successMessage map without a create entry falls back to default", async () => {
    const onCreate = vi.fn(async () => undefined);
    // Only `delete` is set; create should fall back to "Created successfully".
    const { config } = makeConfig({
      onCreate,
      successMessage: { delete: "Deleted!" },
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    act(() => result.current.updateFormField("name", "n"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(message.success).toHaveBeenCalledWith("Created successfully");
  });

  it("setForm can replace the form directly via setForm dispatch", async () => {
    const { config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.setForm({ id: 42, name: "direct" }));
    expect(result.current.form).toEqual({ id: 42, name: "direct" });
  });

  it("setModalOpen closes the modal", async () => {
    const { config } = makeConfig();
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await act(async () => {});
    act(() => result.current.handleAdd());
    expect(result.current.modalOpen).toBe(true);
    act(() => result.current.setModalOpen(false));
    expect(result.current.modalOpen).toBe(false);
  });

  it("defaultFilters are applied to the initial fetch", async () => {
    const { fetcher, config } = makeConfig({
      defaultFilters: { keyword: "init", status: "OPEN" },
    });
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await waitFor(() => expect(fetcher).toHaveBeenCalled());
    expect(result.current.filters).toEqual({ keyword: "init", status: "OPEN" });
    const firstCall = fetcher.mock.calls[0];
    expect(firstCall?.[2]).toEqual({ keyword: "init", status: "OPEN" });
  });

  it("loading toggles true while the fetcher is in flight", async () => {
    let resolveFetch: (v: { list: Row[]; total: number }) => void = () => {};
    const fetcher = vi.fn(
      () =>
        new Promise<{ list: Row[]; total: number }>((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const config = {
      fetcher,
      emptyForm: { name: "" } as Partial<Row>,
      rowKey: "id" as const,
    } satisfies UseCrudConfig<Row, Partial<Row>>;
    const { result } = renderHook(() => useCrud<Row, Partial<Row>>(config));
    await waitFor(() => expect(result.current.loading).toBe(true));
    await act(async () => {
      resolveFetch({ list: [{ id: 1, name: "a" }], total: 1 });
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
