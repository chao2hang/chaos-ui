import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{en as n,f as r,nt as i,t as a}from"./lucide-react-CxNzvEkP.js";import{n as o,t as s}from"./toggle-CCYMsZcf.js";var c,l,u,d,f,p,m,h,g;e((()=>{c=t(),o(),a(),l={title:`Components/Toggle`,component:s,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`default`,`outline`]},size:{control:{type:`select`},options:[`default`,`sm`,`lg`]},pressed:{control:`boolean`},disabled:{control:`boolean`}}},u={args:{children:`Toggle`}},d={args:{pressed:!0,children:`Pressed`}},f={args:{children:(0,c.jsx)(n,{className:`size-4`}),"aria-label":`Toggle bold`}},p={args:{disabled:!0,children:`Disabled`}},m={args:{variant:`outline`,children:`Outline`}},h={render:()=>(0,c.jsxs)(`div`,{className:`flex items-center gap-1 border rounded-md p-1`,children:[(0,c.jsx)(s,{"aria-label":`Toggle bold`,size:`sm`,children:(0,c.jsx)(n,{className:`size-4`})}),(0,c.jsx)(s,{"aria-label":`Toggle italic`,size:`sm`,children:(0,c.jsx)(i,{className:`size-4`})}),(0,c.jsx)(s,{"aria-label":`Toggle underline`,size:`sm`,children:(0,c.jsx)(r,{className:`size-4`})})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Toggle"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    pressed: true,
    children: "Pressed"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: <Bold className="size-4" />,
    "aria-label": "Toggle bold"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: "Disabled"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: "Outline"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-1 border rounded-md p-1">\r
      <Toggle aria-label="Toggle bold" size="sm">\r
        <Bold className="size-4" />\r
      </Toggle>\r
      <Toggle aria-label="Toggle italic" size="sm">\r
        <Italic className="size-4" />\r
      </Toggle>\r
      <Toggle aria-label="Toggle underline" size="sm">\r
        <Underline className="size-4" />\r
      </Toggle>\r
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Pressed`,`WithIcon`,`Disabled`,`Outline`,`Toolbar`]}))();export{u as Default,p as Disabled,m as Outline,d as Pressed,h as Toolbar,f as WithIcon,g as __namedExportsOrder,l as default};