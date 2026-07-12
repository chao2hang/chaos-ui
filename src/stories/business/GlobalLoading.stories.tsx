import type { Meta, StoryObj } from "@storybook/react";
import {
  GlobalLoadingProvider,
  useGlobalLoading,
} from "@/components/business/global-loading";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/GlobalLoading",
  component: GlobalLoadingProvider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    children: <div />,
  },
} satisfies Meta<typeof GlobalLoadingProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const api = useGlobalLoading();
  return (
    <div className="space-y-3">
      <p className="text-sm">点击触发全局 loading（业务壳）</p>
      <Button
        size="sm"
        onClick={() => {
          api.show("同步中…");
          setTimeout(() => api.hide(), 1200);
        }}
      >
        开始同步
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <GlobalLoadingProvider>
      <Demo />
    </GlobalLoadingProvider>
  ),
};
