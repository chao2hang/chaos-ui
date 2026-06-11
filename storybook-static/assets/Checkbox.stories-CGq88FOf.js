import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./checkbox-sPz8JGcz.js";import{n as i,t as a}from"./label-B5g1qXOL.js";var o,s,c,l,u,d,f,p,m;e((()=>{o=t(),n(),i(),s={title:`Components/Checkbox`,component:r,tags:[`autodocs`],argTypes:{checked:{control:`boolean`,description:`Whether the checkbox is checked`},disabled:{control:`boolean`,description:`Whether the checkbox is disabled`}}},c={},l={args:{checked:!0}},u={args:{disabled:!0}},d={args:{disabled:!0,checked:!0}},f={render:()=>(0,o.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,o.jsx)(r,{id:`terms`}),(0,o.jsx)(a,{htmlFor:`terms`,children:`Accept terms and conditions`})]})},p={render:()=>(0,o.jsxs)(`div`,{className:`space-y-3`,children:[(0,o.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,o.jsx)(r,{id:`option1`}),(0,o.jsx)(a,{htmlFor:`option1`,children:`Option 1`})]}),(0,o.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,o.jsx)(r,{id:`option2`,defaultChecked:!0}),(0,o.jsx)(a,{htmlFor:`option2`,children:`Option 2 (checked)`})]}),(0,o.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,o.jsx)(r,{id:`option3`}),(0,o.jsx)(a,{htmlFor:`option3`,children:`Option 3`})]})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    checked: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center space-x-2">\r
      <Checkbox id="terms" />\r
      <Label htmlFor="terms">Accept terms and conditions</Label>\r
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">\r
      <div className="flex items-center space-x-2">\r
        <Checkbox id="option1" />\r
        <Label htmlFor="option1">Option 1</Label>\r
      </div>\r
      <div className="flex items-center space-x-2">\r
        <Checkbox id="option2" defaultChecked />\r
        <Label htmlFor="option2">Option 2 (checked)</Label>\r
      </div>\r
      <div className="flex items-center space-x-2">\r
        <Checkbox id="option3" />\r
        <Label htmlFor="option3">Option 3</Label>\r
      </div>\r
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Checked`,`Disabled`,`DisabledChecked`,`WithLabel`,`CheckboxGroup`]}))();export{p as CheckboxGroup,l as Checked,c as Default,u as Disabled,d as DisabledChecked,f as WithLabel,m as __namedExportsOrder,s as default};