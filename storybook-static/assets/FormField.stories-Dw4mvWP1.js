import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./input-Dt_ZSsjM.js";import{n as i,t as a}from"./form-field-LByK9WG8.js";import{n as o,t as s}from"./textarea-VEKEu-37.js";var c,l,u,d,f,p,m;e((()=>{c=t(),i(),n(),o(),l={title:`Business/FormField`,component:a,tags:[`autodocs`]},u={render:()=>(0,c.jsx)(a,{label:`Email`,description:`We'll never share your email`,required:!0,children:(0,c.jsx)(r,{type:`email`,placeholder:`Enter your email`})})},d={render:()=>(0,c.jsx)(a,{label:`Message`,description:`Your feedback helps us improve`,required:!0,children:(0,c.jsx)(s,{placeholder:`Type your message...`})})},f={render:()=>(0,c.jsx)(a,{label:`Username`,error:`Username is already taken`,required:!0,children:(0,c.jsx)(r,{defaultValue:`john`,"aria-invalid":!0})})},p={render:()=>(0,c.jsx)(a,{label:`Bio`,description:`Tell us about yourself (optional)`,children:(0,c.jsx)(s,{placeholder:`A short bio...`})})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <FormField label="Email" description="We'll never share your email" required>\r
      <Input type="email" placeholder="Enter your email" />\r
    </FormField>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <FormField label="Message" description="Your feedback helps us improve" required>\r
      <Textarea placeholder="Type your message..." />\r
    </FormField>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <FormField label="Username" error="Username is already taken" required>\r
      <Input defaultValue="john" aria-invalid />\r
    </FormField>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <FormField label="Bio" description="Tell us about yourself (optional)">\r
      <Textarea placeholder="A short bio..." />\r
    </FormField>
}`,...p.parameters?.docs?.source}}},m=[`WithInput`,`WithTextarea`,`WithError`,`Optional`]}))();export{p as Optional,f as WithError,u as WithInput,d as WithTextarea,m as __namedExportsOrder,l as default};