import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{i as n,n as r,t as i}from"./avatar-BgbfBbAy.js";import{r as a,t as o}from"./button-CoDyUfHr.js";import{A as s,B as c,M as l,O as u,et as d,m as f,nn as p,t as m}from"./lucide-react-CxNzvEkP.js";import{c as h,o as g,r as _,s as v,t as y}from"./card-kUQbP-z5.js";import{a as b,i as x,n as S,o as C,r as w,s as T,t as E}from"./breadcrumb-DNSLvoKU.js";import{n as D,t as O}from"./separator-rZ-_XyCs.js";import{a as k,c as A,d as j,h as M,i as N,l as P,m as F,n as I,o as L,p as R,r as z,s as B,t as V,u as H}from"./sidebar-DvjxGI90.js";function U({children:e,title:t}){return(0,W.jsxs)(j,{children:[(0,W.jsxs)(V,{children:[(0,W.jsx)(L,{children:(0,W.jsxs)(`div`,{className:`flex items-center gap-2 px-2 py-1`,children:[(0,W.jsx)(`div`,{className:`flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm`,children:`A`}),(0,W.jsx)(`span`,{className:`font-semibold text-lg`,children:`Acme`})]})}),(0,W.jsx)(R,{}),(0,W.jsx)(I,{children:(0,W.jsx)(N,{children:(0,W.jsx)(k,{children:(0,W.jsx)(A,{children:G.map(e=>(0,W.jsx)(H,{children:(0,W.jsxs)(P,{isActive:e.isActive,tooltip:e.title,children:[(0,W.jsx)(e.icon,{}),(0,W.jsx)(`span`,{children:e.title})]})},e.title))})})})}),(0,W.jsx)(R,{}),(0,W.jsx)(z,{children:(0,W.jsxs)(`div`,{className:`flex items-center gap-2 px-2 py-1`,children:[(0,W.jsx)(i,{className:`size-8`,children:(0,W.jsx)(r,{children:`JD`})}),(0,W.jsxs)(`div`,{className:`flex flex-col`,children:[(0,W.jsx)(`span`,{className:`text-sm font-medium`,children:`John Doe`}),(0,W.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`john@acme.com`})]})]})})]}),(0,W.jsxs)(B,{children:[(0,W.jsxs)(`header`,{className:`flex h-14 items-center gap-2 border-b px-4`,children:[(0,W.jsx)(F,{}),(0,W.jsx)(O,{orientation:`vertical`,className:`mr-2 h-4`}),t&&(0,W.jsx)(E,{children:(0,W.jsxs)(x,{children:[(0,W.jsx)(S,{children:(0,W.jsx)(w,{href:`#`,children:`Home`})}),(0,W.jsx)(C,{}),(0,W.jsx)(S,{children:(0,W.jsx)(b,{children:t})})]})}),(0,W.jsxs)(`div`,{className:`ml-auto flex items-center gap-2`,children:[(0,W.jsx)(o,{variant:`ghost`,size:`icon-sm`,children:(0,W.jsx)(l,{})}),(0,W.jsx)(o,{variant:`ghost`,size:`icon-sm`,children:(0,W.jsx)(p,{})})]})]}),(0,W.jsx)(`div`,{className:`flex-1 p-6`,children:e})]})]})}var W,G,K=e((()=>{W=t(),M(),D(),T(),a(),n(),m(),G=[{title:`Dashboard`,icon:d,href:`#`,isActive:!0},{title:`Orders`,icon:u,href:`#`},{title:`Products`,icon:c,href:`#`},{title:`Suppliers`,icon:f,href:`#`},{title:`Settings`,icon:s,href:`#`}],U.__docgenInfo={description:``,methods:[],displayName:`DashboardLayout`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},title:{required:!1,tsType:{name:`string`},description:``}}}})),q,J,Y,X,Z;e((()=>{q=t(),K(),h(),J={title:`Layouts/DashboardLayout`,component:U,tags:[`autodocs`]},Y={render:()=>(0,q.jsx)(`div`,{className:`h-[600px] border rounded-lg overflow-hidden`,children:(0,q.jsx)(U,{title:`Dashboard`,children:(0,q.jsx)(`div`,{className:`grid gap-4 md:grid-cols-3`,children:Array.from({length:6}).map((e,t)=>(0,q.jsxs)(y,{children:[(0,q.jsx)(g,{children:(0,q.jsxs)(v,{children:[`Card `,t+1]})}),(0,q.jsx)(_,{children:(0,q.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Dashboard content`})})]},t))})})})},X={render:()=>(0,q.jsx)(`div`,{className:`h-[600px] border rounded-lg overflow-hidden`,children:(0,q.jsx)(U,{title:`Orders`,children:(0,q.jsx)(y,{children:(0,q.jsx)(_,{className:`pt-6`,children:(0,q.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Orders page content`})})})})})},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[600px] border rounded-lg overflow-hidden">\r
      <DashboardLayout title="Dashboard">\r
        <div className="grid gap-4 md:grid-cols-3">\r
          {Array.from({
          length: 6
        }).map((_, i) => <Card key={i}>\r
              <CardHeader>\r
                <CardTitle>Card {i + 1}</CardTitle>\r
              </CardHeader>\r
              <CardContent>\r
                <p className="text-sm text-muted-foreground">Dashboard content</p>\r
              </CardContent>\r
            </Card>)}\r
        </div>\r
      </DashboardLayout>\r
    </div>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-[600px] border rounded-lg overflow-hidden">\r
      <DashboardLayout title="Orders">\r
        <Card>\r
          <CardContent className="pt-6">\r
            <p className="text-sm text-muted-foreground">Orders page content</p>\r
          </CardContent>\r
        </Card>\r
      </DashboardLayout>\r
    </div>
}`,...X.parameters?.docs?.source}}},Z=[`Default`,`Orders`]}))();export{Y as Default,X as Orders,Z as __namedExportsOrder,J as default};