import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{r as n,t as r}from"./button-CoDyUfHr.js";import{n as i,t as a}from"./input-Dt_ZSsjM.js";import{n as o,t as s}from"./label-B5g1qXOL.js";import{a as c,c as l,i as u,l as d,n as f,o as p,r as m,s as h,t as g}from"./dialog-DUiQ0ThU.js";var _,v,y,b,x,S;e((()=>{_=t(),d(),n(),i(),o(),v={title:`Components/Dialog`,component:g,tags:[`autodocs`]},y={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Open Dialog`}),(0,_.jsxs)(m,{children:[(0,_.jsxs)(p,{children:[(0,_.jsx)(h,{children:`Are you absolutely sure?`}),(0,_.jsx)(u,{children:`This action cannot be undone. This will permanently delete your account.`})]}),(0,_.jsx)(c,{showCloseButton:!0,children:(0,_.jsx)(r,{variant:`destructive`,children:`Confirm`})})]})]})},b={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{}),children:`Edit Profile`}),(0,_.jsxs)(m,{children:[(0,_.jsxs)(p,{children:[(0,_.jsx)(h,{children:`Edit Profile`}),(0,_.jsx)(u,{children:`Make changes to your profile here.`})]}),(0,_.jsxs)(`div`,{className:`grid gap-4 py-4`,children:[(0,_.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,_.jsx)(s,{htmlFor:`name`,className:`text-right`,children:`Name`}),(0,_.jsx)(a,{id:`name`,defaultValue:`John Doe`,className:`col-span-3`})]}),(0,_.jsxs)(`div`,{className:`grid grid-cols-4 items-center gap-4`,children:[(0,_.jsx)(s,{htmlFor:`email`,className:`text-right`,children:`Email`}),(0,_.jsx)(a,{id:`email`,defaultValue:`john@example.com`,className:`col-span-3`})]})]}),(0,_.jsx)(c,{showCloseButton:!0,children:(0,_.jsx)(r,{children:`Save changes`})})]})]})},x={render:()=>(0,_.jsxs)(g,{children:[(0,_.jsx)(l,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Open`}),(0,_.jsxs)(m,{showCloseButton:!1,children:[(0,_.jsxs)(p,{children:[(0,_.jsx)(h,{children:`No Close Button`}),(0,_.jsx)(u,{children:`Use the actions below to close.`})]}),(0,_.jsxs)(c,{children:[(0,_.jsx)(f,{render:(0,_.jsx)(r,{variant:`outline`}),children:`Cancel`}),(0,_.jsx)(r,{children:`Confirm`})]})]})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>\r
      <DialogTrigger render={<Button variant="outline" />}>\r
        Open Dialog\r
      </DialogTrigger>\r
      <DialogContent>\r
        <DialogHeader>\r
          <DialogTitle>Are you absolutely sure?</DialogTitle>\r
          <DialogDescription>\r
            This action cannot be undone. This will permanently delete your account.\r
          </DialogDescription>\r
        </DialogHeader>\r
        <DialogFooter showCloseButton>\r
          <Button variant="destructive">Confirm</Button>\r
        </DialogFooter>\r
      </DialogContent>\r
    </Dialog>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>\r
      <DialogTrigger render={<Button />}>Edit Profile</DialogTrigger>\r
      <DialogContent>\r
        <DialogHeader>\r
          <DialogTitle>Edit Profile</DialogTitle>\r
          <DialogDescription>Make changes to your profile here.</DialogDescription>\r
        </DialogHeader>\r
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
        <DialogFooter showCloseButton>\r
          <Button>Save changes</Button>\r
        </DialogFooter>\r
      </DialogContent>\r
    </Dialog>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>\r
      <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>\r
      <DialogContent showCloseButton={false}>\r
        <DialogHeader>\r
          <DialogTitle>No Close Button</DialogTitle>\r
          <DialogDescription>Use the actions below to close.</DialogDescription>\r
        </DialogHeader>\r
        <DialogFooter>\r
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>\r
          <Button>Confirm</Button>\r
        </DialogFooter>\r
      </DialogContent>\r
    </Dialog>
}`,...x.parameters?.docs?.source}}},S=[`Default`,`WithForm`,`WithoutCloseButton`]}))();export{y as Default,b as WithForm,x as WithoutCloseButton,S as __namedExportsOrder,v as default};