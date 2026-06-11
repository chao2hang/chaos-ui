import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./status-tag-fOoPgzgx.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{i=t(),n(),a={title:`Business/StatusTag`,component:r,tags:[`autodocs`],argTypes:{status:{control:{type:`select`},options:[`draft`,`pending`,`approved`,`rejected`,`completed`,`cancelled`]},size:{control:{type:`select`},options:[`sm`,`default`]}}},o={args:{status:`draft`}},s={args:{status:`pending`}},c={args:{status:`approved`}},l={args:{status:`rejected`}},u={args:{status:`completed`}},d={args:{status:`cancelled`}},f={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,i.jsx)(r,{status:`draft`}),(0,i.jsx)(r,{status:`pending`}),(0,i.jsx)(r,{status:`approved`}),(0,i.jsx)(r,{status:`rejected`}),(0,i.jsx)(r,{status:`completed`}),(0,i.jsx)(r,{status:`cancelled`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: "draft"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: "pending"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    status: "approved"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    status: "rejected"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    status: "completed"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    status: "cancelled"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">\r
      <StatusTag status="draft" />\r
      <StatusTag status="pending" />\r
      <StatusTag status="approved" />\r
      <StatusTag status="rejected" />\r
      <StatusTag status="completed" />\r
      <StatusTag status="cancelled" />\r
    </div>
}`,...f.parameters?.docs?.source}}},p=[`Draft`,`Pending`,`Approved`,`Rejected`,`Completed`,`Cancelled`,`AllStatuses`]}))();export{f as AllStatuses,c as Approved,d as Cancelled,u as Completed,o as Draft,s as Pending,l as Rejected,p as __namedExportsOrder,a as default};