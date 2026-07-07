import type { Meta, StoryObj } from "@storybook/react";
import { Row, Col } from "@/components/ui/grid";

const meta: Meta<typeof Row> = {
  title: "Components/Grid",
  component: Row,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Row>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/10 text-primary flex h-12 items-center justify-center rounded-md text-sm">
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Row gutter={16}>
      <Col span={12}>
        <Box>col-12</Box>
      </Col>
      <Col span={12}>
        <Box>col-12</Box>
      </Col>
    </Row>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Row gutter={16}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
      >
        <Box>响应式</Box>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
      >
        <Box>响应式</Box>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
      >
        <Box>响应式</Box>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        md={{ span: 8 }}
        lg={{ span: 6 }}
      >
        <Box>响应式</Box>
      </Col>
    </Row>
  ),
};

export const WithOffset: Story = {
  render: () => (
    <Row gutter={16}>
      <Col span={6} offset={6}>
        <Box>offset=6</Box>
      </Col>
    </Row>
  ),
};
