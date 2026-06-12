import type { Meta } from "@storybook/react"
import {
  LineChart, AreaChart, BarChart, PieChart, RadarChart, RadialChart,
  ScatterChart, ComposedChart, FunnelChart, HeatmapChart, SankeyChart,
  TreemapChart, WaterfallChart,
} from "@/components/business/charts"

export default {
  title: "Business/Charts",
} satisfies Meta

const lineData = Array.from({ length: 12 }, (_, i) => ({
  x: `${i + 1}月`,
  sales: Math.floor(Math.random() * 500) + 100,
  profit: Math.floor(Math.random() * 200) + 50,
}))

const pieData = [
  { name: "直销", value: 400 },
  { name: "代理", value: 300 },
  { name: "在线", value: 300 },
  { name: "其他", value: 200 },
]

const radarData = [
  { subject: "销售", A: 120, B: 110, fullMark: 150 },
  { subject: "管理", A: 98, B: 130, fullMark: 150 },
  { subject: "技术", A: 86, B: 130, fullMark: 150 },
  { subject: "客服", A: 99, B: 100, fullMark: 150 },
  { subject: "研发", A: 85, B: 90, fullMark: 150 },
  { subject: "市场", A: 65, B: 85, fullMark: 150 },
]

const funnelData = [
  { name: "访问", value: 1000 },
  { name: "咨询", value: 800 },
  { name: "订单", value: 600 },
  { name: "点击", value: 400 },
  { name: "转化", value: 200 },
]

const heatmapData = [
  { x: "Mon", y: "9am", value: 10 },
  { x: "Mon", y: "12pm", value: 30 },
  { x: "Mon", y: "3pm", value: 20 },
  { x: "Tue", y: "9am", value: 25 },
  { x: "Tue", y: "12pm", value: 50 },
  { x: "Tue", y: "3pm", value: 35 },
  { x: "Wed", y: "9am", value: 15 },
  { x: "Wed", y: "12pm", value: 45 },
  { x: "Wed", y: "3pm", value: 30 },
]

const sankeyData = [
  { source: "A", target: "X", value: 30 },
  { source: "A", target: "Y", value: 20 },
  { source: "B", target: "X", value: 15 },
  { source: "B", target: "Y", value: 25 },
  { source: "X", target: "Z", value: 35 },
  { source: "Y", target: "Z", value: 45 },
]

const treemapData = [
  { name: "前端", value: 240 },
  { name: "后端", value: 320 },
  { name: "DevOps", value: 180 },
  { name: "测试", value: 120 },
  { name: "设计", value: 90 },
]

const waterfallData = [
  { name: "Q1", value: 100, isTotal: true },
  { name: "Q2", value: 50 },
  { name: "Q3", value: 30 },
  { name: "Q4", value: -40 },
  { name: "Total", value: 140, isTotal: true },
]

export const LineExample = () => <LineChart data={lineData} series={[{ key: "sales", name: "销售" }, { key: "profit", name: "利润" }]} />
export const AreaExample = () => <AreaChart data={lineData} series={[{ key: "sales", name: "销售" }]} />
export const BarExample = () => <BarChart data={lineData} series={[{ key: "sales", name: "销售" }, { key: "profit", name: "利润" }]} />
export const PieExample = () => <PieChart data={pieData} />
export const RadarExample = () => <RadarChart data={radarData} series={[{ key: "A", name: "组A" }, { key: "B", name: "组B" }]} />
export const RadialExample = () => <RadialChart data={pieData} />
export const ScatterExample = () => <ScatterChart data={lineData.map((d) => ({ x: d.sales, y: d.profit }))} />
export const ComposedExample = () => (
  <ComposedChart
    data={lineData}
    series={[
      { key: "sales", name: "销售（柱）" },
      { key: "profit", name: "利润（线）" },
    ]}
  />
)
export const FunnelExample = () => <FunnelChart data={funnelData} />
export const HeatmapExample = () => <HeatmapChart data={heatmapData} xKey="x" yKey="y" valueKey="value" />
export const SankeyExample = () => <SankeyChart data={sankeyData} xKey="source" yKey="target" valueKey="value" />
export const TreemapExample = () => <TreemapChart data={treemapData} />
export const WaterfallExample = () => <WaterfallChart data={waterfallData} />
export const Loading = () => <LineChart data={[]} loading />
export const Empty = () => <LineChart data={[]} empty />
