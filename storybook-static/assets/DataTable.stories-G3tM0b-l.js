import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{a as i,c as a,i as o,n as s,o as c,s as l,t as u}from"./table-C9s2fIyD.js";import{n as d,t as f}from"./status-tag-fOoPgzgx.js";function p({columns:e,data:t,onRowClick:n,className:a}){return(0,m.jsxs)(u,{className:r(a),children:[(0,m.jsx)(c,{children:(0,m.jsx)(l,{children:e.map(e=>(0,m.jsx)(i,{children:e.header},e.key))})}),(0,m.jsx)(s,{children:t.map((t,r)=>(0,m.jsx)(l,{className:n?`cursor-pointer`:void 0,onClick:n?()=>n(t):void 0,children:e.map(e=>(0,m.jsx)(o,{children:e.render?e.render(t):String(t[e.key]??``)},e.key))},r))})]})}var m,h=e((()=>{m=t(),a(),n(),p.__docgenInfo={description:``,methods:[],displayName:`DataTable`,props:{columns:{required:!0,tsType:{name:`Array`,elements:[{name:`Column`,elements:[{name:`T`}],raw:`Column<T>`}],raw:`Column<T>[]`},description:``},data:{required:!0,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``},onRowClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(row: T) => void`,signature:{arguments:[{type:{name:`T`},name:`row`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),g,_,v,y,b,x,S,C;e((()=>{g=t(),h(),d(),_=[{id:`ORD-001`,customer:`Alice Johnson`,email:`alice@example.com`,amount:250,status:`completed`,date:`2024-01-15`},{id:`ORD-002`,customer:`Bob Smith`,email:`bob@example.com`,amount:120.5,status:`pending`,date:`2024-01-16`},{id:`ORD-003`,customer:`Carol White`,email:`carol@example.com`,amount:89.99,status:`approved`,date:`2024-01-17`},{id:`ORD-004`,customer:`Dave Brown`,email:`dave@example.com`,amount:340,status:`rejected`,date:`2024-01-18`}],v=[{key:`id`,header:`Order ID`},{key:`customer`,header:`Customer`},{key:`email`,header:`Email`},{key:`amount`,header:`Amount`,render:e=>`$${e.amount.toFixed(2)}`},{key:`status`,header:`Status`,render:e=>(0,g.jsx)(f,{status:e.status,size:`sm`})},{key:`date`,header:`Date`}],y={title:`Business/DataTable`,component:p,tags:[`autodocs`]},b={args:{columns:v,data:_}},x={args:{columns:v,data:_,onRowClick:e=>alert(`Clicked: ${e.id}`)}},S={args:{columns:v,data:[]}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    columns,
    data: mockData
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    columns,
    data: mockData,
    onRowClick: row => alert(\`Clicked: \${row.id}\`)
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    columns,
    data: []
  }
}`,...S.parameters?.docs?.source}}},C=[`Default`,`WithRowClick`,`Empty`]}))();export{b as Default,S as Empty,x as WithRowClick,C as __namedExportsOrder,y as default};