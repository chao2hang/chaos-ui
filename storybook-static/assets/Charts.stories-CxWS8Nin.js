import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{A as i,E as a,O as o,S as s,b as c,c as l,f as u,g as d,i as f,m as p,n as m,o as h,t as g,u as _,v,w as y}from"./es6-Br71Nq8X.js";function b({children:e,className:t}){return(0,E.jsx)(`div`,{className:r(`w-full min-w-[320px] h-[350px]`,t),children:(0,E.jsx)(i,{width:`100%`,height:`100%`,children:e})})}function x({active:e,payload:t,label:n,formatter:r}){return!e||!t?.length?null:(0,E.jsxs)(`div`,{className:`rounded-lg border bg-popover p-2 shadow-md text-sm`,children:[(0,E.jsx)(`p`,{className:`font-medium mb-1`,children:n}),t.map((e,t)=>(0,E.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,E.jsx)(`div`,{className:`size-2 rounded-full`,style:{backgroundColor:e.color}}),(0,E.jsxs)(`span`,{className:`text-muted-foreground`,children:[e.name,`:`]}),(0,E.jsx)(`span`,{className:`font-medium`,children:r?r(e.value):String(e.value??``)})]},t))]})}function S({data:e,categories:t,index:n,colors:r=D,className:i}){return(0,E.jsx)(b,{className:i,children:(0,E.jsxs)(l,{data:e,children:[(0,E.jsx)(c,{strokeDasharray:`3 3`,stroke:`hsl(var(--border) / 0.5)`}),(0,E.jsx)(u,{dataKey:n,tick:{fontSize:12},stroke:`hsl(var(--border))`,tickLine:!1,className:`text-muted-foreground`}),(0,E.jsx)(_,{tick:{fontSize:12},stroke:`hsl(var(--border))`,tickLine:!1,className:`text-muted-foreground`}),(0,E.jsx)(a,{content:(0,E.jsx)(x,{})}),(0,E.jsx)(o,{}),t.map((e,t)=>(0,E.jsx)(v,{type:`monotone`,dataKey:e,stroke:r[t%r.length],strokeWidth:2,dot:{r:3,fill:r[t%r.length]}},e))]})})}function C({data:e,categories:t,index:n,colors:r=D,className:i,stacked:s=!1}){return(0,E.jsx)(b,{className:i,children:(0,E.jsxs)(h,{data:e,children:[(0,E.jsx)(c,{strokeDasharray:`3 3`,stroke:`hsl(var(--border) / 0.5)`}),(0,E.jsx)(u,{dataKey:n,tick:{fontSize:12},stroke:`hsl(var(--border))`,tickLine:!1,className:`text-muted-foreground`}),(0,E.jsx)(_,{tick:{fontSize:12},stroke:`hsl(var(--border))`,tickLine:!1,className:`text-muted-foreground`}),(0,E.jsx)(a,{content:(0,E.jsx)(x,{})}),(0,E.jsx)(o,{}),t.map((e,t)=>(0,E.jsx)(p,{dataKey:e,fill:r[t%r.length],radius:[4,4,0,0],stackId:s?`stack`:void 0},e))]})})}function w({data:e,categories:t,index:n,colors:r=D,className:i}){return(0,E.jsx)(b,{className:i,children:(0,E.jsxs)(m,{data:e,children:[(0,E.jsx)(c,{strokeDasharray:`3 3`,stroke:`hsl(var(--border) / 0.5)`}),(0,E.jsx)(u,{dataKey:n,tick:{fontSize:12},stroke:`hsl(var(--border))`,tickLine:!1,className:`text-muted-foreground`}),(0,E.jsx)(_,{tick:{fontSize:12},stroke:`hsl(var(--border))`,tickLine:!1,className:`text-muted-foreground`}),(0,E.jsx)(a,{content:(0,E.jsx)(x,{})}),(0,E.jsx)(o,{}),t.map((e,t)=>(0,E.jsx)(d,{type:`monotone`,dataKey:e,fill:r[t%r.length],fillOpacity:.15,stroke:r[t%r.length],strokeWidth:2},e))]})})}function T({data:e,category:t,index:n,colors:r=D,className:i}){return(0,E.jsx)(b,{className:i,children:(0,E.jsxs)(f,{children:[(0,E.jsx)(s,{data:e,dataKey:t,nameKey:n,cx:`50%`,cy:`50%`,outerRadius:120,label:!0,children:e.map((e,t)=>(0,E.jsx)(y,{fill:r[t%r.length]},t))}),(0,E.jsx)(a,{content:(0,E.jsx)(x,{})}),(0,E.jsx)(o,{})]})})}var E,D,O,k,A=e((()=>{E=t(),g(),n(),D=[`hsl(var(--chart-1))`,`hsl(var(--chart-2))`,`hsl(var(--chart-3))`,`hsl(var(--chart-4))`,`hsl(var(--chart-5))`],O=[`hsl(var(--brand-500))`,`hsl(var(--brand-600))`,`hsl(var(--brand-400))`,`hsl(var(--brand-700))`,`hsl(var(--brand-300))`],k=[`hsl(var(--primary))`,`hsl(var(--success))`,`hsl(var(--warning))`,`hsl(var(--info))`,`hsl(var(--destructive))`],S.__docgenInfo={description:``,methods:[],displayName:`LineChart`,props:{data:{required:!0,tsType:{name:`any`},description:``},categories:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},index:{required:!0,tsType:{name:`string`},description:``},colors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``,defaultValue:{value:`[
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}},C.__docgenInfo={description:``,methods:[],displayName:`BarChart`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`any`}],raw:`any[]`},description:``},categories:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},index:{required:!0,tsType:{name:`string`},description:``},colors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``,defaultValue:{value:`[
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},stacked:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}},w.__docgenInfo={description:``,methods:[],displayName:`AreaChart`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`any`}],raw:`any[]`},description:``},categories:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``},index:{required:!0,tsType:{name:`string`},description:``},colors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``,defaultValue:{value:`[
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}},T.__docgenInfo={description:``,methods:[],displayName:`PieChart`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`any`}],raw:`any[]`},description:``},category:{required:!0,tsType:{name:`string`},description:``},index:{required:!0,tsType:{name:`string`},description:``},colors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:``,defaultValue:{value:`[
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}},b.__docgenInfo={description:``,methods:[],displayName:`ChartContainer`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}},x.__docgenInfo={description:``,methods:[],displayName:`ChartTooltip`,props:{active:{required:!1,tsType:{name:`boolean`},description:``},payload:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ color: string; name: string; value: unknown }`,signature:{properties:[{key:`color`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`unknown`,required:!0}}]}}],raw:`Array<{ color: string; name: string; value: unknown }>`},description:``},label:{required:!1,tsType:{name:`string`},description:``},formatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(v: unknown) => string`,signature:{arguments:[{type:{name:`unknown`},name:`v`}],return:{name:`string`}}},description:``}}}})),j,M,N,P,F,I,L,R,z,B,V,H,U,W;e((()=>{j=t(),A(),M=[{month:`Jan`,revenue:4e3,expenses:2400,profit:1600},{month:`Feb`,revenue:3e3,expenses:1398,profit:1602},{month:`Mar`,revenue:2e3,expenses:9800,profit:-7800},{month:`Apr`,revenue:2780,expenses:3908,profit:-1128},{month:`May`,revenue:1890,expenses:4800,profit:-2910},{month:`Jun`,revenue:2390,expenses:3800,profit:-1410}],N=[{name:`Electronics`,value:400},{name:`Clothing`,value:300},{name:`Food`,value:300},{name:`Books`,value:200},{name:`Other`,value:100}],P={title:`Business/Charts`,tags:[`autodocs`],parameters:{layout:`padded`}},F={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(S,{data:M,categories:[`revenue`,`expenses`],index:`month`})})},I={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(C,{data:M,categories:[`revenue`,`expenses`],index:`month`})})},L={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(C,{data:M,categories:[`revenue`,`expenses`],index:`month`,stacked:!0})})},R={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(w,{data:M,categories:[`revenue`,`expenses`],index:`month`})})},z={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(T,{data:N,category:`value`,index:`name`})})},B={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(S,{data:M,categories:[`revenue`,`expenses`,`profit`],index:`month`,colors:[`#2563eb`,`#dc2626`,`#16a34a`]})})},V={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(C,{data:M,categories:[`revenue`,`expenses`],index:`month`,colors:O})})},H={render:()=>(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(T,{data:N,category:`value`,index:`name`,colors:k})})},U={render:()=>(0,j.jsxs)(`div`,{className:`space-y-8`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`h3`,{className:`text-lg font-semibold mb-4`,children:`Line Chart`}),(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(S,{data:M,categories:[`revenue`,`expenses`],index:`month`})})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`h3`,{className:`text-lg font-semibold mb-4`,children:`Bar Chart`}),(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(C,{data:M,categories:[`revenue`,`expenses`],index:`month`})})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`h3`,{className:`text-lg font-semibold mb-4`,children:`Area Chart`}),(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(w,{data:M,categories:[`revenue`,`expenses`],index:`month`})})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`h3`,{className:`text-lg font-semibold mb-4`,children:`Pie Chart`}),(0,j.jsx)(`div`,{className:`w-full max-w-3xl`,children:(0,j.jsx)(T,{data:N,category:`value`,index:`name`})})]})]})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <LineChart data={sampleData} categories={["revenue", "expenses"]} index="month" />\r
    </div>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" />\r
    </div>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" stacked />\r
    </div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <AreaChart data={sampleData} categories={["revenue", "expenses"]} index="month" />\r
    </div>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <PieChart data={pieData} category="value" index="name" />\r
    </div>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <LineChart data={sampleData} categories={["revenue", "expenses", "profit"]} index="month" colors={["#2563eb", "#dc2626", "#16a34a"]} />\r
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" colors={brandColors} />\r
    </div>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-3xl">\r
      <PieChart data={pieData} category="value" index="name" colors={statusColors} />\r
    </div>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Line Chart</h3>\r
        <div className="w-full max-w-3xl">\r
          <LineChart data={sampleData} categories={["revenue", "expenses"]} index="month" />\r
        </div>\r
      </div>\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>\r
        <div className="w-full max-w-3xl">\r
          <BarChart data={sampleData} categories={["revenue", "expenses"]} index="month" />\r
        </div>\r
      </div>\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Area Chart</h3>\r
        <div className="w-full max-w-3xl">\r
          <AreaChart data={sampleData} categories={["revenue", "expenses"]} index="month" />\r
        </div>\r
      </div>\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>\r
        <div className="w-full max-w-3xl">\r
          <PieChart data={pieData} category="value" index="name" />\r
        </div>\r
      </div>\r
    </div>
}`,...U.parameters?.docs?.source}}},W=[`LineChartExample`,`BarChartExample`,`StackedBarChartExample`,`AreaChartExample`,`PieChartExample`,`CustomColors`,`BrandColors`,`StatusColors`,`AllChartTypes`]}))();export{U as AllChartTypes,R as AreaChartExample,I as BarChartExample,V as BrandColors,B as CustomColors,F as LineChartExample,z as PieChartExample,L as StackedBarChartExample,H as StatusColors,W as __namedExportsOrder,P as default};