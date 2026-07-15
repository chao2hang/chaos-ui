import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { ProTable } from "./pro-table";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

vi.mock("@/components/ui/icons", () => ({
  Columns3Icon: (props: Record<string, unknown>) => (
    <svg data-testid="columns-icon" {...props} />
  ),
  ChevronDownIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-down" {...props} />
  ),
  ChevronRightIcon: (props: Record<string, unknown>) => (
    <svg data-testid="chevron-right" {...props} />
  ),
  GripVerticalIcon: (props: Record<string, unknown>) => (
    <svg data-testid="grip" {...props} />
  ),
  MaximizeIcon: (props: Record<string, unknown>) => (
    <svg data-testid="maximize" {...props} />
  ),
  MinimizeIcon: (props: Record<string, unknown>) => (
    <svg data-testid="minimize" {...props} />
  ),
  SaveIcon: (props: Record<string, unknown>) => (
    <svg data-testid="save" {...props} />
  ),
  EyeIcon: (props: Record<string, unknown>) => (
    <svg data-testid="eye" {...props} />
  ),
  EyeOffIcon: (props: Record<string, unknown>) => (
    <svg data-testid="eye-off" {...props} />
  ),
  DownloadIcon: (props: Record<string, unknown>) => (
    <svg data-testid="download" {...props} />
  ),
}));

type Row = { id: string; name: string };

const columns = [{ key: "name", title: "Name", dataIndex: "name" }];
const data: Row[] = [{ id: "1", name: "Alice" }];

describe("ProTable", () => {
  it("pads toolbar, body, and pagination under flush cards (CUI-LIST-03 / #27)", () => {
    const { container } = render(
      <ProTable
        columns={columns}
        data={data}
        rowKey="id"
        columnSettings={false}
        pagination={{
          current: 0,
          pageSize: 10,
          total: 1,
          onChange: () => {},
        }}
      />,
    );

    const toolbar = container.querySelector(
      '[data-slot="pro-table-toolbar"]',
    ) as HTMLElement;
    expect(toolbar).not.toBeNull();
    expect(toolbar.className).toMatch(/px-\[var\(--card-spacing/);

    const body = container.querySelector(
      '[data-slot="pro-table-body"]',
    ) as HTMLElement;
    expect(body).not.toBeNull();
    expect(body.className).toMatch(/px-\[var\(--card-spacing/);
    const tableWrap = body.querySelector(".overflow-x-auto") as HTMLElement;
    expect(tableWrap).not.toBeNull();
    expect(tableWrap.className).toMatch(/border/);
    expect(tableWrap.className).not.toMatch(/px-\[var\(--card-spacing/);

    const pagination = container.querySelector(
      '[data-slot="pro-table-pagination"]',
    ) as HTMLElement;
    expect(pagination).not.toBeNull();
    expect(pagination.className).toMatch(/px-\[var\(--card-spacing/);
  });
});
