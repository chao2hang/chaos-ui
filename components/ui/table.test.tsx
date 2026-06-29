import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { TableProps, TableRowProps } from "@/components/ui/table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

describe("Table", () => {
  it("renders table structure", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
  });

  it("renders a table element", () => {
    const { container } = render(<Table />);
    expect(container.querySelector('[data-slot="table"]')).not.toBeNull();
  });

  it("TableProps/TableRowProps types are importable", () => {
    const _t: TableProps = {};
    const _r: TableRowProps = {};
    expect(_t).toBeDefined();
    expect(_r).toBeDefined();
  });
});
