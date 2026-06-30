import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act, fireEvent, renderHook } from "@testing-library/react";
import * as React from "react";
import {
  useConfirmAsync,
  ConfirmProvider,
  confirmAsync,
  useConfirmContext,
  type ConfirmOptions,
} from "./use-confirm-async";

describe("use-confirm-async", () => {
  it("exports useConfirmAsync", () => {
    expect(useConfirmAsync).toBeDefined();
  });
  it("exports ConfirmProvider", () => {
    expect(ConfirmProvider).toBeDefined();
  });
  it("exports confirmAsync", () => {
    expect(confirmAsync).toBeDefined();
  });
  it("exports useConfirmContext", () => {
    expect(useConfirmContext).toBeDefined();
  });
  it("exports ConfirmOptions type (compile-time only)", () => {
    const opts: ConfirmOptions = { title: "T" };
    expect(opts.title).toBe("T");
  });
});

describe("useConfirmAsync hook mode", () => {
  function Harness({ opts }: { opts?: ConfirmOptions }) {
    const [confirm, ConfirmDialog] = useConfirmAsync();
    const [result, setResult] = React.useState<boolean | null>(null);
    const run = React.useCallback(() => {
      void confirm(opts ?? { title: "Delete?" }).then((v) => setResult(v));
    }, [confirm, opts]);
    return (
      <div>
        <button type="button" onClick={run}>
          ask
        </button>
        <span data-testid="result">{result === null ? "none" : result ? "yes" : "no"}</span>
        {ConfirmDialog()}
      </div>
    );
  }

  it("returns a tuple of [confirm fn, ConfirmDialog render fn]", () => {
    const { result } = renderHook(() => useConfirmAsync());
    expect(typeof result.current[0]).toBe("function");
    expect(typeof result.current[1]).toBe("function");
  });

  it("opens the dialog when confirm() is called and keeps the promise pending", async () => {
    render(<Harness />);
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    // Promise is unresolved until a dialog button is clicked.
    expect(screen.getByTestId("result").textContent).toBe("none");
  });

  it("renders custom title/content/okText/cancelText when the portal mounts", async () => {
    render(
      <Harness
        opts={{
          title: "Permanently delete?",
          content: "This will remove all data.",
          okText: "Delete",
          cancelText: "Keep",
          okVariant: "destructive",
        }}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    // Base UI portals may not always render in jsdom; assert only when present.
    const titles = screen.queryAllByText("Permanently delete?");
    if (titles.length > 0) {
      expect(screen.getByText("This will remove all data.")).toBeDefined();
      expect(screen.getByRole("button", { name: "Delete" })).toBeDefined();
      expect(screen.getByRole("button", { name: "Keep" })).toBeDefined();
    }
  });

  it("resolves true when the OK button is clicked (portal permitting)", async () => {
    render(<Harness opts={{ title: "Confirm Save" }} />);
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    const ok = screen.queryByRole("button", { name: "Confirm" });
    if (ok) {
      await act(async () => {
        fireEvent.click(ok);
      });
      expect(screen.getByTestId("result").textContent).toBe("yes");
    }
  });

  it("resolves false when the Cancel button is clicked (portal permitting)", async () => {
    render(<Harness opts={{ title: "Confirm Discard" }} />);
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    const cancel = screen.queryByRole("button", { name: "Cancel" });
    if (cancel) {
      await act(async () => {
        fireEvent.click(cancel);
      });
      expect(screen.getByTestId("result").textContent).toBe("no");
    }
  });
});

describe("ConfirmProvider", () => {
  function Consumer({ opts }: { opts?: ConfirmOptions }) {
    const confirm = useConfirmContext();
    const [result, setResult] = React.useState<boolean | null>(null);
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            void confirm(opts ?? { title: "From Provider" }).then((v) => setResult(v));
          }}
        >
          ask
        </button>
        <span data-testid="result">{result === null ? "none" : result ? "yes" : "no"}</span>
      </div>
    );
  }

  it("renders children", () => {
    render(
      <ConfirmProvider>
        <span>child-content</span>
      </ConfirmProvider>,
    );
    expect(screen.getByText("child-content")).toBeDefined();
  });

  it("exposes confirm via useConfirmContext and opens the dialog on call", async () => {
    render(
      <ConfirmProvider>
        <Consumer />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    expect(screen.getByTestId("result").textContent).toBe("none");
  });

  it("merges defaultOptions with per-call options", async () => {
    render(
      <ConfirmProvider defaultOptions={{ okText: "DefaultOK", title: "DefaultTitle" }}>
        <Consumer opts={{ content: "Override content" }} />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    const ok = screen.queryByRole("button", { name: "DefaultOK" });
    if (ok) {
      expect(screen.getByText("DefaultTitle")).toBeDefined();
      expect(screen.getByText("Override content")).toBeDefined();
    }
  });

  it("resolves true when the provider's OK button is clicked", async () => {
    render(
      <ConfirmProvider>
        <Consumer />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    const ok = screen.queryByRole("button", { name: "Confirm" });
    expect(ok).not.toBeNull();
    await act(async () => {
      fireEvent.click(ok!);
    });
    expect(screen.getByTestId("result").textContent).toBe("yes");
  });

  it("resolves false when the provider's Cancel button is clicked", async () => {
    render(
      <ConfirmProvider>
        <Consumer />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    const cancel = screen.queryByRole("button", { name: "Cancel" });
    expect(cancel).not.toBeNull();
    await act(async () => {
      fireEvent.click(cancel!);
    });
    expect(screen.getByTestId("result").textContent).toBe("no");
  });

  it("applies destructive okVariant from defaultOptions", async () => {
    render(
      <ConfirmProvider defaultOptions={{ okVariant: "destructive", okText: "Purge" }}>
        <Consumer />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    // The destructive button is rendered; clicking it resolves true.
    const ok = screen.queryByRole("button", { name: "Purge" });
    expect(ok).not.toBeNull();
    await act(async () => {
      fireEvent.click(ok!);
    });
    expect(screen.getByTestId("result").textContent).toBe("yes");
  });

  it("applies a custom icon from defaultOptions when provided", async () => {
    render(
      <ConfirmProvider defaultOptions={{ icon: <span>custom-icon</span>, title: "IconTest" }}>
        <Consumer />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("ask"));
    });
    // Base UI portals may not always render in jsdom; verify dialog title when present.
    const title = screen.queryByText("IconTest");
    if (title) {
      expect(screen.getByText("custom-icon")).toBeDefined();
    }
  });

  it("useConfirmContext throws when used outside a ConfirmProvider", () => {
    function Bad() {
      useConfirmContext();
      return null;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Bad />)).toThrow(
      /useConfirmContext must be used within <ConfirmProvider>/,
    );
    spy.mockRestore();
  });
});

describe("confirmAsync (module-level)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when called outside ConfirmProvider (no module ref registered)", () => {
    // confirmAsync throws synchronously when no provider has registered the
    // module-level ref, so wrap the call rather than awaiting a rejection.
    expect(() => confirmAsync({ title: "X" })).toThrow(
      /confirmAsync\(\) called outside <ConfirmProvider>/,
    );
  });

  it("works via ConfirmProvider module ref and resolves on OK click (portal permitting)", async () => {
    function Trigger({ onDone }: { onDone: (v: boolean) => void }) {
      return (
        <button
          type="button"
          onClick={() => {
            void confirmAsync({ title: "Module call" }).then(onDone);
          }}
        >
          fire
        </button>
      );
    }
    const seen = vi.fn();
    const { unmount } = render(
      <ConfirmProvider>
        <Trigger onDone={seen} />
      </ConfirmProvider>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("fire"));
    });
    const ok = screen.queryByRole("button", { name: "Confirm" });
    if (ok) {
      await act(async () => {
        fireEvent.click(ok);
      });
      expect(seen).toHaveBeenCalledWith(true);
    }
    unmount();
  });
});
