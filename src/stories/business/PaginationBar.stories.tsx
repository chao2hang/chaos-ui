import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PaginationBar } from "@/components/business/pagination-bar";

const meta: Meta<typeof PaginationBar> = {
  title: "Business/PaginationBar",
  component: PaginationBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "表格分页栏（button onClick 原子，非路由）。用于 SearchTable / ProTable / ReportTable；ui Pagination（anchor）留给路由。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationBar>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div className="space-y-4">
        <PaginationBar
          total={100}
          page={page}
          pageSize={10}
          onChange={(p) => setPage(p)}
        />
        <p className="text-muted-foreground text-sm">当前页：{page}</p>
      </div>
    );
  },
};

export const WithQuickJumper: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <PaginationBar
        total={500}
        page={page}
        pageSize={10}
        onChange={(p) => setPage(p)}
        showQuickJumper
      />
    );
  },
};

export const CustomPageSizeOptions: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    return (
      <PaginationBar
        total={200}
        page={page}
        pageSize={pageSize}
        onChange={(p, ps) => {
          setPage(p);
          setPageSize(ps);
        }}
        pageSizeOptions={[20, 50, 100]}
      />
    );
  },
};

export const NoSizeChanger: Story = {
  render: () => (
    <PaginationBar
      total={100}
      page={1}
      pageSize={10}
      onChange={() => {}}
      showSizeChanger={false}
    />
  ),
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return (
      <PaginationBar
        total={1000}
        page={page}
        pageSize={10}
        onChange={(p) => setPage(p)}
        showQuickJumper
      />
    );
  },
};
