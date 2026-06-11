import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{W as i,in as a,o,t as s,un as c,v as l,wt as u}from"./lucide-react-CxNzvEkP.js";import{A as d,g as f,n as p,t as m}from"./es6-Br71Nq8X.js";import{c as h,o as g,r as _,s as v,t as y}from"./card-kUQbP-z5.js";function b({title:e,value:t,change:n,changeLabel:o,changeType:s=`neutral`,sparkline:l,target:u,targetLabel:m,icon:h,className:b}){let S={positive:a,negative:c,neutral:i},C={positive:`text-success`,negative:`text-destructive`,neutral:`text-muted-foreground`},w=S[s]??a;return(0,x.jsxs)(y,{className:r(b),children:[(0,x.jsxs)(g,{className:`flex flex-row items-center justify-between pb-2`,children:[(0,x.jsx)(v,{className:`text-sm font-medium text-muted-foreground`,children:e}),h&&(0,x.jsx)(h,{className:`size-4 text-muted-foreground`})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)(`div`,{className:`text-2xl font-bold`,children:t}),n!==void 0&&(0,x.jsxs)(`div`,{className:r(`flex items-center gap-1 mt-1 text-xs`,C[s]),children:[(0,x.jsx)(w,{className:`size-3`}),(0,x.jsx)(`span`,{className:`font-medium`,children:n}),o&&(0,x.jsx)(`span`,{className:`text-muted-foreground`,children:o})]}),l&&l.length>0&&(0,x.jsx)(`div`,{className:`h-10 mt-3`,children:(0,x.jsx)(d,{width:`100%`,height:`100%`,children:(0,x.jsxs)(p,{data:l,children:[(0,x.jsx)(`defs`,{children:(0,x.jsxs)(`linearGradient`,{id:`sparkFill`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,x.jsx)(`stop`,{offset:`0%`,stopColor:`hsl(var(--primary))`,stopOpacity:.3}),(0,x.jsx)(`stop`,{offset:`100%`,stopColor:`hsl(var(--primary))`,stopOpacity:0})]})}),(0,x.jsx)(f,{type:`monotone`,dataKey:`value`,stroke:`hsl(var(--primary))`,fill:`url(#sparkFill)`,strokeWidth:1.5,dot:!1})]})})}),u!==void 0&&(0,x.jsxs)(`div`,{className:`mt-3`,children:[(0,x.jsxs)(`div`,{className:`flex justify-between text-xs mb-1`,children:[(0,x.jsx)(`span`,{className:`text-muted-foreground`,children:m??`Progress`}),(0,x.jsxs)(`span`,{className:`font-medium`,children:[u,`%`]})]}),(0,x.jsx)(`div`,{className:`h-1.5 rounded-full bg-muted overflow-hidden`,children:(0,x.jsx)(`div`,{className:`h-full bg-primary rounded-full transition-all`,style:{width:u+`%`}})})]})]})]})}var x,S=e((()=>{x=t(),m(),n(),h(),s(),b.__docgenInfo={description:``,methods:[],displayName:`KPICard`,props:{title:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`string`},description:``},change:{required:!1,tsType:{name:`string`},description:``},changeLabel:{required:!1,tsType:{name:`string`},description:``},changeType:{required:!1,tsType:{name:`union`,raw:`"positive" | "negative" | "neutral"`,elements:[{name:`literal`,value:`"positive"`},{name:`literal`,value:`"negative"`},{name:`literal`,value:`"neutral"`}]},description:``,defaultValue:{value:`"neutral"`,computed:!1}},sparkline:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ value: number }`,signature:{properties:[{key:`value`,value:{name:`number`,required:!0}}]}}],raw:`{ value: number }[]`},description:``},target:{required:!1,tsType:{name:`number`},description:``},targetLabel:{required:!1,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`ReactElementType`,raw:`React.ElementType`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),C,w,T,E,D,O,k,A;e((()=>{S(),s(),C={title:`Business/KPICard`,component:b,tags:[`autodocs`]},w={args:{title:`Total Revenue`,value:`$45,231.89`,change:`+20.1%`,changeLabel:`from last month`,icon:u}},T={args:{title:`Active Users`,value:`2,350`,change:`+12.5%`,changeLabel:`from last month`,icon:o}},E={args:{title:`Growth Rate`,value:`+12.3%`,change:`-2.1%`,changeLabel:`vs last quarter`,icon:l}},D={args:{title:`Conversion Rate`,value:`3.2%`,change:`0%`,changeType:`neutral`}},O={args:{title:`Revenue Trend`,value:`$45,231`,change:`+20.1%`,changeType:`positive`,icon:u,sparkline:[{value:30},{value:40},{value:35},{value:50},{value:45},{value:60},{value:55}]}},k={args:{title:`Monthly Goal`,value:`$50,000`,change:`+15%`,changeType:`positive`,icon:u,target:75,targetLabel:`Goal Progress`}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeLabel: "from last month",
    icon: DollarSignIcon
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Active Users",
    value: "2,350",
    change: "+12.5%",
    changeLabel: "from last month",
    icon: UsersIcon
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Growth Rate",
    value: "+12.3%",
    change: "-2.1%",
    changeLabel: "vs last quarter",
    icon: TrendingUpIcon
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Conversion Rate",
    value: "3.2%",
    change: "0%",
    changeType: "neutral"
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Revenue Trend",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSignIcon,
    sparkline: [{
      value: 30
    }, {
      value: 40
    }, {
      value: 35
    }, {
      value: 50
    }, {
      value: 45
    }, {
      value: 60
    }, {
      value: 55
    }]
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Monthly Goal",
    value: "$50,000",
    change: "+15%",
    changeType: "positive",
    icon: DollarSignIcon,
    target: 75,
    targetLabel: "Goal Progress"
  }
}`,...k.parameters?.docs?.source}}},A=[`Revenue`,`Users`,`Growth`,`NoChange`,`WithSparkline`,`WithTarget`]}))();export{E as Growth,D as NoChange,w as Revenue,T as Users,O as WithSparkline,k as WithTarget,A as __namedExportsOrder,C as default};