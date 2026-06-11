import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{r as n,t as r}from"./button-CoDyUfHr.js";import{P as i,g as a,ot as o,t as s,vt as c}from"./lucide-react-CxNzvEkP.js";import{n as l,t as u}from"./empty-state-Duq4L86H.js";var d,f,p,m,h,g,_;e((()=>{d=t(),l(),n(),s(),f={title:`Business/EmptyState`,component:u,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`default`,`search`,`error`,`network`]}}},p={render:()=>(0,d.jsx)(u,{icon:o,title:`No items`,description:`Get started by creating a new item.`,action:(0,d.jsx)(r,{children:`Create Item`})})},m={args:{variant:`search`},render:()=>(0,d.jsx)(u,{variant:`search`,icon:i,title:`No results found`,description:`Try adjusting your search or filters`})},h={args:{variant:`error`},render:()=>(0,d.jsx)(u,{variant:`error`,icon:a,title:`Something went wrong`,description:`Please try again later`,action:(0,d.jsx)(r,{children:`Retry`})})},g={render:()=>(0,d.jsx)(u,{icon:c,title:`No files`,description:`Upload your first file to get started`,action:(0,d.jsx)(r,{children:`Upload File`})})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState icon={InboxIcon} title="No items" description="Get started by creating a new item." action={<Button>Create Item</Button>} />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "search"
  },
  render: () => <EmptyState variant="search" icon={SearchXIcon} title="No results found" description="Try adjusting your search or filters" />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error"
  },
  render: () => <EmptyState variant="error" icon={AlertTriangleIcon} title="Something went wrong" description="Please try again later" action={<Button>Retry</Button>} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <EmptyState icon={FileXIcon} title="No files" description="Upload your first file to get started" action={<Button>Upload File</Button>} />
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Search`,`Error`,`Empty`]}))();export{p as Default,g as Empty,h as Error,m as Search,_ as __namedExportsOrder,f as default};