import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{W as i,b as a,o,t as s,v as c}from"./lucide-react-CxNzvEkP.js";import{c as l,o as u,r as d,s as f,t as p}from"./card-kUQbP-z5.js";function m({title:e,value:t,change:n,changeType:o=`neutral`,icon:s,className:l}){let m=o===`positive`?c:o===`negative`?a:i;return(0,h.jsxs)(p,{className:r(l),children:[(0,h.jsxs)(u,{className:`flex-row items-center justify-between space-y-0 pb-2`,children:[(0,h.jsx)(f,{className:`text-sm font-medium text-muted-foreground`,children:e}),s&&(0,h.jsx)(s,{className:`size-4 text-muted-foreground`})]}),(0,h.jsxs)(d,{children:[(0,h.jsx)(`div`,{className:`text-2xl font-bold`,children:t}),n&&(0,h.jsxs)(`div`,{className:`mt-1 flex items-center gap-1 text-xs`,children:[(0,h.jsx)(m,{className:r(`size-3.5`,o===`positive`&&`text-success`,o===`negative`&&`text-destructive`,o===`neutral`&&`text-muted-foreground`)}),(0,h.jsx)(`span`,{className:r(o===`positive`&&`text-success`,o===`negative`&&`text-destructive`,o===`neutral`&&`text-muted-foreground`),children:n})]})]})]})}var h,g=e((()=>{h=t(),s(),l(),n(),m.__docgenInfo={description:``,methods:[],displayName:`StatCard`,props:{title:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:``},change:{required:!1,tsType:{name:`string`},description:``},changeType:{required:!1,tsType:{name:`union`,raw:`"positive" | "negative" | "neutral"`,elements:[{name:`literal`,value:`"positive"`},{name:`literal`,value:`"negative"`},{name:`literal`,value:`"neutral"`}]},description:``,defaultValue:{value:`"neutral"`,computed:!1}},icon:{required:!1,tsType:{name:`LucideIcon`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),_,v,y,b,x;e((()=>{g(),s(),_={title:`Business/StatCard`,component:m,tags:[`autodocs`]},v={args:{title:`Total Sales`,value:`$125,430`,icon:c,changeType:`positive`,change:`+12.5%`}},y={args:{title:`Refunds`,value:`$3,200`,icon:a,changeType:`negative`,change:`-5.2%`}},b={args:{title:`Customers`,value:`1,234`,icon:o,changeType:`neutral`}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Total Sales",
    value: "$125,430",
    icon: TrendingUpIcon,
    changeType: "positive",
    change: "+12.5%"
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Refunds",
    value: "$3,200",
    icon: TrendingDownIcon,
    changeType: "negative",
    change: "-5.2%"
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Customers",
    value: "1,234",
    icon: UsersIcon,
    changeType: "neutral"
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`DownTrend`,`NoIcon`]}))();export{v as Default,y as DownTrend,b as NoIcon,x as __namedExportsOrder,_ as default};