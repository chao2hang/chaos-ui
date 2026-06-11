import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./input-Dt_ZSsjM.js";import{M as i,t as a}from"./lucide-react-CxNzvEkP.js";import{n as o,t as s}from"./label-B5g1qXOL.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S;e((()=>{c=t(),n(),o(),a(),l={title:`Components/Input`,component:r,tags:[`autodocs`],argTypes:{type:{control:{type:`select`},options:[`text`,`email`,`password`,`number`,`tel`,`url`,`search`,`date`],description:`The type of the input`},placeholder:{control:`text`,description:`Placeholder text`},disabled:{control:`boolean`,description:`Whether the input is disabled`},required:{control:`boolean`,description:`Whether the input is required`}}},u={args:{placeholder:`Enter text...`}},d={args:{type:`email`,placeholder:`Enter your email`}},f={args:{type:`password`,placeholder:`Enter password`}},p={args:{type:`number`,placeholder:`0`}},m={args:{type:`search`,placeholder:`Search...`}},h={args:{disabled:!0,placeholder:`Disabled input`}},g={args:{required:!0,placeholder:`Required field`}},_={args:{defaultValue:`Hello World`}},v={args:{"aria-invalid":!0,placeholder:`Invalid input`}},y={render:()=>(0,c.jsxs)(`div`,{className:`space-y-2`,children:[(0,c.jsx)(s,{htmlFor:`email-input`,children:`Email`}),(0,c.jsx)(r,{id:`email-input`,type:`email`,placeholder:`Enter your email`})]})},b={render:()=>(0,c.jsxs)(`div`,{className:`relative max-w-sm`,children:[(0,c.jsx)(i,{className:`absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`}),(0,c.jsx)(r,{className:`pl-8`,placeholder:`Search...`})]})},x={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-col gap-4 max-w-sm`,children:[(0,c.jsx)(r,{placeholder:`Default`}),(0,c.jsx)(r,{placeholder:`Disabled`,disabled:!0}),(0,c.jsx)(r,{placeholder:`Required`,required:!0}),(0,c.jsx)(r,{placeholder:`Invalid`,"aria-invalid":!0})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: "email",
    placeholder: "Enter your email"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: "password",
    placeholder: "Enter password"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: "number",
    placeholder: "0"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: "search",
    placeholder: "Search..."
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Disabled input"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    required: true,
    placeholder: "Required field"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "Hello World"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-invalid": true,
    placeholder: "Invalid input"
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">\r
      <Label htmlFor="email-input">Email</Label>\r
      <Input id="email-input" type="email" placeholder="Enter your email" />\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="relative max-w-sm">\r
      <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />\r
      <Input className="pl-8" placeholder="Search..." />\r
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 max-w-sm">\r
      <Input placeholder="Default" />\r
      <Input placeholder="Disabled" disabled />\r
      <Input placeholder="Required" required />\r
      <Input placeholder="Invalid" aria-invalid />\r
    </div>
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Email`,`Password`,`Number`,`Search`,`Disabled`,`Required`,`WithValue`,`Invalid`,`WithLabel`,`WithIcon`,`AllStates`]}))();export{x as AllStates,u as Default,h as Disabled,d as Email,v as Invalid,p as Number,f as Password,g as Required,m as Search,b as WithIcon,y as WithLabel,_ as WithValue,S as __namedExportsOrder,l as default};