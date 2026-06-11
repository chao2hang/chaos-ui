import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./separator-rZ-_XyCs.js";var i,a,o,s,c,l;e((()=>{i=t(),n(),a={title:`Components/Separator`,component:r,tags:[`autodocs`],argTypes:{orientation:{control:{type:`select`},options:[`horizontal`,`vertical`],description:`The orientation of the separator`}}},o={render:()=>(0,i.jsxs)(`div`,{className:`w-full max-w-sm`,children:[(0,i.jsx)(`div`,{className:`text-sm`,children:`Content above`}),(0,i.jsx)(r,{className:`my-4`}),(0,i.jsx)(`div`,{className:`text-sm`,children:`Content below`})]})},s={render:()=>(0,i.jsxs)(`div`,{className:`flex h-8 items-center space-x-4`,children:[(0,i.jsx)(`div`,{className:`text-sm`,children:`Left`}),(0,i.jsx)(r,{orientation:`vertical`}),(0,i.jsx)(`div`,{className:`text-sm`,children:`Right`})]})},c={render:()=>(0,i.jsxs)(`div`,{className:`w-56 p-2 border rounded-lg`,children:[(0,i.jsx)(`div`,{className:`px-2 py-1.5 text-sm`,children:`Profile`}),(0,i.jsx)(`div`,{className:`px-2 py-1.5 text-sm`,children:`Settings`}),(0,i.jsx)(r,{className:`my-1`}),(0,i.jsx)(`div`,{className:`px-2 py-1.5 text-sm`,children:`Help`}),(0,i.jsx)(r,{className:`my-1`}),(0,i.jsx)(`div`,{className:`px-2 py-1.5 text-sm text-destructive`,children:`Logout`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-sm">\r
      <div className="text-sm">Content above</div>\r
      <Separator className="my-4" />\r
      <div className="text-sm">Content below</div>\r
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-8 items-center space-x-4">\r
      <div className="text-sm">Left</div>\r
      <Separator orientation="vertical" />\r
      <div className="text-sm">Right</div>\r
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-56 p-2 border rounded-lg">\r
      <div className="px-2 py-1.5 text-sm">Profile</div>\r
      <div className="px-2 py-1.5 text-sm">Settings</div>\r
      <Separator className="my-1" />\r
      <div className="px-2 py-1.5 text-sm">Help</div>\r
      <Separator className="my-1" />\r
      <div className="px-2 py-1.5 text-sm text-destructive">Logout</div>\r
    </div>
}`,...c.parameters?.docs?.source}}},l=[`Horizontal`,`Vertical`,`InMenu`]}))();export{o as Horizontal,c as InMenu,s as Vertical,l as __namedExportsOrder,a as default};