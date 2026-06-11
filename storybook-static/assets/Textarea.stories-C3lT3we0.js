import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./label-B5g1qXOL.js";import{n as i,t as a}from"./textarea-VEKEu-37.js";var o,s,c,l,u,d,f,p,m;e((()=>{o=t(),i(),n(),s={title:`Components/Textarea`,component:a,tags:[`autodocs`]},c={args:{placeholder:`Type your message here.`}},l={args:{defaultValue:`This is a textarea with content.`}},u={args:{disabled:!0,placeholder:`Disabled textarea`}},d={render:()=>(0,o.jsxs)(`div`,{className:`grid w-full gap-1.5`,children:[(0,o.jsx)(r,{htmlFor:`message`,children:`Your message`}),(0,o.jsx)(a,{id:`message`,placeholder:`Type your message here.`})]})},f={args:{"aria-invalid":!0,placeholder:`Invalid input`}},p={render:()=>(0,o.jsxs)(`div`,{className:`grid w-full gap-1.5`,children:[(0,o.jsx)(r,{htmlFor:`comment`,children:`Comment`}),(0,o.jsx)(a,{id:`comment`,placeholder:`Share your thoughts...`,rows:5}),(0,o.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Your comment will be visible to other users.`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Type your message here."
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "This is a textarea with content."
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Disabled textarea"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full gap-1.5">\r
      <Label htmlFor="message">Your message</Label>\r
      <Textarea id="message" placeholder="Type your message here." />\r
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-invalid": true,
    placeholder: "Invalid input"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid w-full gap-1.5">\r
      <Label htmlFor="comment">Comment</Label>\r
      <Textarea id="comment" placeholder="Share your thoughts..." rows={5} />\r
      <p className="text-xs text-muted-foreground">\r
        Your comment will be visible to other users.\r
      </p>\r
    </div>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`WithValue`,`Disabled`,`WithLabel`,`Invalid`,`Comment`]}))();export{p as Comment,c as Default,u as Disabled,f as Invalid,d as WithLabel,l as WithValue,m as __namedExportsOrder,s as default};