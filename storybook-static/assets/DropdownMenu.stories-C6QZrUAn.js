import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{r as n,t as r}from"./button-CoDyUfHr.js";import{a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f,u as p}from"./dropdown-menu-BdSvhM42.js";var m,h,g,_,v,y;e((()=>{m=t(),p(),n(),h={title:`Components/DropdownMenu`,component:f,tags:[`autodocs`]},g={render:()=>(0,m.jsxs)(f,{children:[(0,m.jsx)(s,{render:(0,m.jsx)(r,{variant:`outline`}),children:`Open Menu`}),(0,m.jsxs)(u,{children:[(0,m.jsx)(i,{children:`My Account`}),(0,m.jsx)(a,{}),(0,m.jsx)(o,{children:`Profile`}),(0,m.jsx)(o,{children:`Settings`}),(0,m.jsx)(o,{children:`Help`}),(0,m.jsx)(a,{}),(0,m.jsx)(o,{children:`Logout`})]})]})},_={render:()=>(0,m.jsxs)(f,{children:[(0,m.jsx)(s,{render:(0,m.jsx)(r,{variant:`outline`}),children:`View`}),(0,m.jsxs)(u,{children:[(0,m.jsx)(i,{children:`Show`}),(0,m.jsx)(a,{}),(0,m.jsx)(c,{checked:!0,children:`Show Toolbar`}),(0,m.jsx)(c,{children:`Show Sidebar`}),(0,m.jsx)(c,{checked:!0,children:`Show Statusbar`})]})]})},v={render:()=>(0,m.jsxs)(f,{children:[(0,m.jsx)(s,{render:(0,m.jsx)(r,{variant:`outline`}),children:`Position`}),(0,m.jsxs)(u,{children:[(0,m.jsx)(i,{children:`Panel Position`}),(0,m.jsx)(a,{}),(0,m.jsxs)(l,{value:`top`,children:[(0,m.jsx)(d,{value:`top`,children:`Top`}),(0,m.jsx)(d,{value:`bottom`,children:`Bottom`}),(0,m.jsx)(d,{value:`right`,children:`Right`})]})]})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>\r
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open Menu</DropdownMenuTrigger>\r
      <DropdownMenuContent>\r
        <DropdownMenuLabel>My Account</DropdownMenuLabel>\r
        <DropdownMenuSeparator />\r
        <DropdownMenuItem>Profile</DropdownMenuItem>\r
        <DropdownMenuItem>Settings</DropdownMenuItem>\r
        <DropdownMenuItem>Help</DropdownMenuItem>\r
        <DropdownMenuSeparator />\r
        <DropdownMenuItem>Logout</DropdownMenuItem>\r
      </DropdownMenuContent>\r
    </DropdownMenu>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>\r
      <DropdownMenuTrigger render={<Button variant="outline" />}>View</DropdownMenuTrigger>\r
      <DropdownMenuContent>\r
        <DropdownMenuLabel>Show</DropdownMenuLabel>\r
        <DropdownMenuSeparator />\r
        <DropdownMenuCheckboxItem checked>Show Toolbar</DropdownMenuCheckboxItem>\r
        <DropdownMenuCheckboxItem>Show Sidebar</DropdownMenuCheckboxItem>\r
        <DropdownMenuCheckboxItem checked>Show Statusbar</DropdownMenuCheckboxItem>\r
      </DropdownMenuContent>\r
    </DropdownMenu>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu>\r
      <DropdownMenuTrigger render={<Button variant="outline" />}>Position</DropdownMenuTrigger>\r
      <DropdownMenuContent>\r
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>\r
        <DropdownMenuSeparator />\r
        <DropdownMenuRadioGroup value="top">\r
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>\r
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>\r
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>\r
        </DropdownMenuRadioGroup>\r
      </DropdownMenuContent>\r
    </DropdownMenu>
}`,...v.parameters?.docs?.source}}},y=[`Default`,`WithCheckboxes`,`WithRadio`]}))();export{g as Default,_ as WithCheckboxes,v as WithRadio,y as __namedExportsOrder,h as default};