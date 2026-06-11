import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./label-B5g1qXOL.js";var i,a,o,s,c,l,u;e((()=>{i=t(),n(),a={title:`Components/Label`,component:r,tags:[`autodocs`],argTypes:{htmlFor:{control:`text`,description:`The id of the element the label is for`}}},o={args:{children:`Label`}},s={render:()=>(0,i.jsxs)(`div`,{className:`space-y-2`,children:[(0,i.jsx)(r,{htmlFor:`username`,children:`Username`}),(0,i.jsx)(`input`,{id:`username`,className:`flex h-8 w-full rounded-md border border-input bg-transparent px-2.5`})]})},c={render:()=>(0,i.jsxs)(r,{children:[`Email `,(0,i.jsx)(`span`,{className:`text-destructive`,children:`*`})]})},l={render:()=>(0,i.jsx)(`div`,{className:`group`,"data-disabled":`true`,children:(0,i.jsx)(r,{children:`Disabled Label`})})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Label"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">\r
      <Label htmlFor="username">Username</Label>\r
      <input id="username" className="flex h-8 w-full rounded-md border border-input bg-transparent px-2.5" />\r
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Label>\r
      Email <span className="text-destructive">*</span>\r
    </Label>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="group" data-disabled="true">\r
      <Label>Disabled Label</Label>\r
    </div>
}`,...l.parameters?.docs?.source}}},u=[`Default`,`WithInput`,`Required`,`Disabled`]}))();export{o as Default,l as Disabled,c as Required,s as WithInput,u as __namedExportsOrder,a as default};