import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{r as n,t as r}from"./button-CoDyUfHr.js";import{n as i,t as a}from"./input-Dt_ZSsjM.js";import{n as o,t as s}from"./label-B5g1qXOL.js";import{a as c,c as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g}from"./sheet-H2Om6PBk.js";var _,v,y,b,x,S,C;e((()=>{_=t(),d(),n(),i(),o(),v={title:`Components/Sheet`,component:g,tags:[`autodocs`]},y={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Open Right`}),(0,_.jsxs)(m,{side:`right`,children:[(0,_.jsxs)(p,{children:[(0,_.jsx)(h,{children:`Edit Profile`}),(0,_.jsx)(u,{children:`Make changes to your profile here.`})]}),(0,_.jsxs)(`div`,{className:`grid gap-4 py-4`,children:[(0,_.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,_.jsx)(s,{htmlFor:`name`,className:`text-right`,children:`Name`}),(0,_.jsx)(a,{id:`name`,defaultValue:`John Doe`,className:`col-span-3`})]}),(0,_.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,_.jsx)(s,{htmlFor:`email`,className:`text-right`,children:`Email`}),(0,_.jsx)(a,{id:`email`,defaultValue:`john@example.com`,className:`col-span-3`})]})]}),(0,_.jsx)(c,{children:(0,_.jsx)(f,{render:(0,_.jsx)(r,{type:`submit`}),children:`Save changes`})})]})]})},b={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Open Left`}),(0,_.jsxs)(m,{side:`left`,children:[(0,_.jsx)(p,{children:(0,_.jsx)(h,{children:`Navigation`})}),(0,_.jsx)(`div`,{className:`py-4`,children:`Left side navigation content`})]})]})},x={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Open Top`}),(0,_.jsxs)(m,{side:`top`,children:[(0,_.jsx)(p,{children:(0,_.jsx)(h,{children:`Top Sheet`})}),(0,_.jsx)(`div`,{className:`py-4`,children:`Top sheet content`})]})]})},S={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Open Bottom`}),(0,_.jsxs)(m,{side:`bottom`,children:[(0,_.jsx)(p,{children:(0,_.jsx)(h,{children:`Bottom Sheet`})}),(0,_.jsx)(`div`,{className:`py-4`,children:`Bottom sheet content`})]})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>\r
      <SheetTrigger render={<Button variant="outline" />}>Open Right</SheetTrigger>\r
      <SheetContent side="right">\r
        <SheetHeader>\r
          <SheetTitle>Edit Profile</SheetTitle>\r
          <SheetDescription>Make changes to your profile here.</SheetDescription>\r
        </SheetHeader>\r
        <div className="grid gap-4 py-4">\r
          <div className="grid grid-cols-4 items-center gap-4">\r
            <Label htmlFor="name" className="text-right">Name</Label>\r
            <Input id="name" defaultValue="John Doe" className="col-span-3" />\r
          </div>\r
          <div className="grid grid-cols-4 items-center gap-4">\r
            <Label htmlFor="email" className="text-right">Email</Label>\r
            <Input id="email" defaultValue="john@example.com" className="col-span-3" />\r
          </div>\r
        </div>\r
        <SheetFooter>\r
          <SheetClose render={<Button type="submit" />}>Save changes</SheetClose>\r
        </SheetFooter>\r
      </SheetContent>\r
    </Sheet>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>\r
      <SheetTrigger render={<Button variant="outline" />}>Open Left</SheetTrigger>\r
      <SheetContent side="left">\r
        <SheetHeader>\r
          <SheetTitle>Navigation</SheetTitle>\r
        </SheetHeader>\r
        <div className="py-4">Left side navigation content</div>\r
      </SheetContent>\r
    </Sheet>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>\r
      <SheetTrigger render={<Button variant="outline" />}>Open Top</SheetTrigger>\r
      <SheetContent side="top">\r
        <SheetHeader>\r
          <SheetTitle>Top Sheet</SheetTitle>\r
        </SheetHeader>\r
        <div className="py-4">Top sheet content</div>\r
      </SheetContent>\r
    </Sheet>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Sheet>\r
      <SheetTrigger render={<Button variant="outline" />}>Open Bottom</SheetTrigger>\r
      <SheetContent side="bottom">\r
        <SheetHeader>\r
          <SheetTitle>Bottom Sheet</SheetTitle>\r
        </SheetHeader>\r
        <div className="py-4">Bottom sheet content</div>\r
      </SheetContent>\r
    </Sheet>
}`,...S.parameters?.docs?.source}}},C=[`Right`,`Left`,`Top`,`Bottom`]}))();export{S as Bottom,b as Left,y as Right,x as Top,C as __namedExportsOrder,v as default};