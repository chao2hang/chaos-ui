import { describe, it, expect, vi, afterEach, beforeAll } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BatchSelector } from "./batch-selector";
import type { BatchSelectorProps, BatchNode } from "./batch-selector";

// Mock the Dialog components to avoid base-ui portal/focus-trap issues in jsdom
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children }: any) => <div data-slot="dialog">{children}</div>,
  DialogContent: ({ children, className }: any) => (
    <div data-slot="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-slot="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <h2 data-slot="dialog-title">{children}</h2>
  ),
  DialogBody: ({ children, className }: any) => (
    <div data-slot="dialog-body" className={className}>
      {children}
    </div>
  ),
  DialogFooter: ({ children }: any) => (
    <div data-slot="dialog-footer">{children}</div>
  ),
  DialogDescription: ({ children }: any) => (
    <p data-slot="dialog-description">{children}</p>
  ),
  DialogTrigger: ({ children }: any) => <div>{children}</div>,
  DialogClose: ({ children }: any) => <button>{children}</button>,
  DialogPortal: ({ children }: any) => <>{children}</>,
  DialogOverlay: () => <div data-slot="dialog-overlay" />,
}));

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

// Mock Checkbox to avoid base-ui focus/pointer-event issues in jsdom
vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange, className, ...props }: any) => (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={() => onCheckedChange?.(!checked)}
      aria-label={props["aria-label"]}
    />
  ),
}));

// Mock Badge to avoid useRender issues
vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, className, variant, ...props }: any) => (
    <span className={className} {...props}>
      {children}
    </span>
  ),
  badgeVariants: () => "",
}));

// Mock Button to avoid @base-ui/react ButtonPrimitive issues in jsdom
vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    className,
    variant,
    disabled,
    icon,
    onClick,
    ...props
  }: any) => (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon}
      {children}
    </button>
  ),
}));

// Mock Input to avoid base-ui input rendering issues in jsdom
vi.mock("@/components/ui/input", () => ({
  Input: ({ className, value, onChange, placeholder }: any) => (
    <input
      className={className}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
}));

// Mock icons to avoid lucide SVG rendering overhead in jsdom
vi.mock("@/components/ui/icons", () => ({
  ChevronDownIcon: (props: any) => (
    <span data-testid="chevron-down" {...props} />
  ),
  ChevronRightIcon: (props: any) => (
    <span data-testid="chevron-right" {...props} />
  ),
  PackageIcon: (props: any) => <span data-testid="package" {...props} />,
  SearchIcon: (props: any) => <span data-testid="search" {...props} />,
}));

// Increase timeout for all tests in this file
const TEST_TIMEOUT = 15000;

beforeAll(() => {
  vi.setConfig({ testTimeout: TEST_TIMEOUT });
});

afterEach(() => {
  cleanup();
});

const BATCH_DATA: BatchNode[] = [
  {
    id: "b1",
    batchNo: "B-2024-001",
    productName: "Widget A",
    quantity: 500,
    status: "completed",
    productionDate: "2024-01-15",
    expiryDate: "2025-01-15",
    children: [
      {
        id: "b1a",
        batchNo: "B-2024-001-A",
        productName: "Widget A (Sub-batch)",
        quantity: 250,
        status: "in-progress",
        productionDate: "2024-01-20",
      },
      {
        id: "b1b",
        batchNo: "B-2024-001-B",
        productName: "Widget A (Sub-batch 2)",
        quantity: 250,
        status: "pending",
      },
    ],
  },
  {
    id: "b2",
    batchNo: "B-2024-002",
    productName: "Widget B",
    quantity: 1000,
    status: "expired",
    productionDate: "2023-06-01",
    expiryDate: "2024-06-01",
  },
  {
    id: "b3",
    batchNo: "B-2024-003",
    productName: "Widget C",
    status: "pending",
  },
];

/** Helper: render with dialog open (controlled mode). */
function renderOpen(props?: Partial<BatchSelectorProps>) {
  const onOpenChange = vi.fn();
  return {
    onOpenChange,
    ...render(
      <BatchSelector
        data={BATCH_DATA}
        open={true}
        onOpenChange={onOpenChange}
        {...props}
      />,
    ),
  };
}

describe("BatchSelector", () => {
  it("exports the component and types", () => {
    expect(BatchSelector).toBeDefined();
    const _p: BatchSelectorProps = { data: [] };
    expect(_p.data).toEqual([]);
  });

  it("renders the default trigger button", () => {
    render(<BatchSelector data={BATCH_DATA} open={false} />);
    expect(screen.getByText("Select Batch")).toBeDefined();
  });

  it("renders dialog content when open", () => {
    renderOpen();
    expect(screen.getByText("B-2024-001")).toBeDefined();
    expect(screen.getByText("B-2024-002")).toBeDefined();
    expect(screen.getByText("B-2024-003")).toBeDefined();
  });

  it("does not render dialog content when closed", () => {
    render(<BatchSelector data={BATCH_DATA} open={false} />);
    expect(screen.queryByText("B-2024-001")).toBeNull();
  });

  it("renders the dialog title", () => {
    renderOpen({ title: "Pick a Batch" });
    expect(screen.getByText("Pick a Batch")).toBeDefined();
  });

  it("renders batch tree with metadata when showMetadata is true", () => {
    renderOpen({ showMetadata: true });
    expect(screen.getByText("Widget A")).toBeDefined();
    expect(screen.getByText("Widget B")).toBeDefined();
  });

  it("expands tree nodes to show children", () => {
    renderOpen();
    expect(screen.getByText("B-2024-001")).toBeDefined();
    const expandButtons = screen.getAllByLabelText("Expand");
    fireEvent.click(expandButtons[0]!);
    expect(screen.getByText("B-2024-001-A")).toBeDefined();
    expect(screen.getByText("B-2024-001-B")).toBeDefined();
  });

  it("collapses tree nodes", () => {
    renderOpen();
    const expandButtons = screen.getAllByLabelText("Expand");
    fireEvent.click(expandButtons[0]!);
    expect(screen.getByText("B-2024-001-A")).toBeDefined();
    const collapseButtons = screen.getAllByLabelText("Collapse");
    fireEvent.click(collapseButtons[0]!);
    expect(screen.queryByText("B-2024-001-A")).toBeNull();
  });

  it("search filters by batch number", () => {
    renderOpen();
    const searchInput = screen.getByPlaceholderText(
      "Search batch or product...",
    );
    fireEvent.change(searchInput, { target: { value: "002" } });
    expect(screen.getByText("B-2024-002")).toBeDefined();
    expect(screen.queryByText("B-2024-003")).toBeNull();
  });

  it("search filters by product name", () => {
    renderOpen();
    const searchInput = screen.getByPlaceholderText(
      "Search batch or product...",
    );
    fireEvent.change(searchInput, { target: { value: "Widget C" } });
    expect(screen.getByText("B-2024-003")).toBeDefined();
    expect(screen.queryByText("B-2024-001")).toBeNull();
  });

  it("single mode: selecting a batch only keeps one selected", () => {
    const onChange = vi.fn();
    renderOpen({ mode: "single", onChange });
    fireEvent.click(screen.getByLabelText("Select B-2024-001"));
    fireEvent.click(screen.getByLabelText("Select B-2024-002"));
    fireEvent.click(screen.getByText("OK"));
    expect(onChange).toHaveBeenCalled();
    const [ids] = onChange.mock.calls[0]!;
    expect(ids).toEqual(["b2"]);
  });

  it("multiple mode: can select multiple batches with checkboxes", () => {
    const onChange = vi.fn();
    renderOpen({ mode: "multiple", onChange });
    fireEvent.click(screen.getByLabelText("Select B-2024-001"));
    fireEvent.click(screen.getByLabelText("Select B-2024-002"));
    fireEvent.click(screen.getByText("OK"));
    expect(onChange).toHaveBeenCalled();
    const [ids, nodes] = onChange.mock.calls[0]!;
    expect(ids).toContain("b1");
    expect(ids).toContain("b2");
    expect(nodes.length).toBe(2);
  });

  it("status badges display correctly when showStatus is true", () => {
    renderOpen({ showStatus: true });
    expect(screen.getByText("completed")).toBeDefined();
    expect(screen.getByText("expired")).toBeDefined();
    expect(screen.getByText("pending")).toBeDefined();
  });

  it("status badges are hidden when showStatus is false", () => {
    renderOpen({ showStatus: false });
    expect(screen.queryByText("completed")).toBeNull();
    expect(screen.queryByText("expired")).toBeNull();
  });

  it("Cancel calls onOpenChange(false) without firing onChange", () => {
    const onChange = vi.fn();
    const { onOpenChange } = renderOpen({ value: ["b1"], onChange });
    fireEvent.click(screen.getByLabelText("Select B-2024-002"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(onChange).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("disabled state prevents opening dialog", () => {
    render(<BatchSelector data={BATCH_DATA} disabled />);
    const triggerWrapper = screen
      .getByText("Select Batch")
      .closest('[data-slot="batch-selector"]');
    expect(triggerWrapper?.className).toContain("pointer-events-none");
  });

  it("renders custom trigger when provided", () => {
    render(
      <BatchSelector
        data={BATCH_DATA}
        open={false}
        trigger={<span>Custom Trigger</span>}
      />,
    );
    expect(screen.getByText("Custom Trigger")).toBeDefined();
  });

  it("shows selected count in default trigger", () => {
    render(
      <BatchSelector data={BATCH_DATA} open={false} value={["b1", "b2"]} />,
    );
    expect(screen.getByText("2 batches selected")).toBeDefined();
  });
});
