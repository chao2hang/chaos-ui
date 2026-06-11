import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./input-Dt_ZSsjM.js";import{n as i,t as a}from"./label-B5g1qXOL.js";import{c as o,i as s,o as c,r as l,s as u,t as d}from"./card-kUQbP-z5.js";import{a as f,i as p,n as m,r as h,t as g}from"./tabs-hLc_jrUQ.js";var _,v,y,b,x,S,C;e((()=>{_=t(),f(),o(),n(),i(),v={title:`Components/Tabs`,component:g,tags:[`autodocs`],argTypes:{orientation:{control:{type:`select`},options:[`horizontal`,`vertical`],description:`The orientation of the tabs`}}},y={render:()=>(0,_.jsxs)(g,{defaultValue:`account`,className:`w-[400px]`,children:[(0,_.jsxs)(h,{children:[(0,_.jsx)(p,{value:`account`,children:`Account`}),(0,_.jsx)(p,{value:`password`,children:`Password`})]}),(0,_.jsx)(m,{value:`account`,children:(0,_.jsxs)(d,{children:[(0,_.jsxs)(c,{children:[(0,_.jsx)(u,{children:`Account`}),(0,_.jsx)(s,{children:`Make changes to your account here.`})]}),(0,_.jsxs)(l,{className:`space-y-2`,children:[(0,_.jsxs)(`div`,{className:`space-y-1`,children:[(0,_.jsx)(a,{htmlFor:`name`,children:`Name`}),(0,_.jsx)(r,{id:`name`,defaultValue:`John Doe`})]}),(0,_.jsxs)(`div`,{className:`space-y-1`,children:[(0,_.jsx)(a,{htmlFor:`email`,children:`Email`}),(0,_.jsx)(r,{id:`email`,defaultValue:`john@example.com`})]})]})]})}),(0,_.jsx)(m,{value:`password`,children:(0,_.jsxs)(d,{children:[(0,_.jsxs)(c,{children:[(0,_.jsx)(u,{children:`Password`}),(0,_.jsx)(s,{children:`Change your password here.`})]}),(0,_.jsxs)(l,{className:`space-y-2`,children:[(0,_.jsxs)(`div`,{className:`space-y-1`,children:[(0,_.jsx)(a,{htmlFor:`current`,children:`Current password`}),(0,_.jsx)(r,{id:`current`,type:`password`})]}),(0,_.jsxs)(`div`,{className:`space-y-1`,children:[(0,_.jsx)(a,{htmlFor:`new`,children:`New password`}),(0,_.jsx)(r,{id:`new`,type:`password`})]})]})]})})]})},b={render:()=>(0,_.jsxs)(g,{defaultValue:`tab1`,className:`w-[400px]`,children:[(0,_.jsxs)(h,{variant:`line`,children:[(0,_.jsx)(p,{value:`tab1`,children:`Tab 1`}),(0,_.jsx)(p,{value:`tab2`,children:`Tab 2`}),(0,_.jsx)(p,{value:`tab3`,children:`Tab 3`})]}),(0,_.jsx)(m,{value:`tab1`,children:`Content for Tab 1`}),(0,_.jsx)(m,{value:`tab2`,children:`Content for Tab 2`}),(0,_.jsx)(m,{value:`tab3`,children:`Content for Tab 3`})]})},x={render:()=>(0,_.jsxs)(g,{orientation:`vertical`,defaultValue:`tab1`,className:`w-[400px]`,children:[(0,_.jsxs)(h,{children:[(0,_.jsx)(p,{value:`tab1`,children:`Overview`}),(0,_.jsx)(p,{value:`tab2`,children:`Settings`}),(0,_.jsx)(p,{value:`tab3`,children:`Help`})]}),(0,_.jsx)(m,{value:`tab1`,children:`Overview content`}),(0,_.jsx)(m,{value:`tab2`,children:`Settings content`}),(0,_.jsx)(m,{value:`tab3`,children:`Help content`})]})},S={render:()=>(0,_.jsxs)(g,{defaultValue:`preview`,className:`w-[400px]`,children:[(0,_.jsxs)(h,{children:[(0,_.jsx)(p,{value:`preview`,children:`Preview`}),(0,_.jsx)(p,{value:`code`,children:`Code`})]}),(0,_.jsx)(m,{value:`preview`,className:`p-4 border rounded-lg`,children:`Preview content`}),(0,_.jsx)(m,{value:`code`,className:`p-4 border rounded-lg`,children:(0,_.jsx)(`pre`,{className:`text-sm font-mono`,children:`const Component = () => {
  return <div>Hello</div>
}`})})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="w-[400px]">\r
      <TabsList>\r
        <TabsTrigger value="account">Account</TabsTrigger>\r
        <TabsTrigger value="password">Password</TabsTrigger>\r
      </TabsList>\r
      <TabsContent value="account">\r
        <Card>\r
          <CardHeader>\r
            <CardTitle>Account</CardTitle>\r
            <CardDescription>Make changes to your account here.</CardDescription>\r
          </CardHeader>\r
          <CardContent className="space-y-2">\r
            <div className="space-y-1">\r
              <Label htmlFor="name">Name</Label>\r
              <Input id="name" defaultValue="John Doe" />\r
            </div>\r
            <div className="space-y-1">\r
              <Label htmlFor="email">Email</Label>\r
              <Input id="email" defaultValue="john@example.com" />\r
            </div>\r
          </CardContent>\r
        </Card>\r
      </TabsContent>\r
      <TabsContent value="password">\r
        <Card>\r
          <CardHeader>\r
            <CardTitle>Password</CardTitle>\r
            <CardDescription>Change your password here.</CardDescription>\r
          </CardHeader>\r
          <CardContent className="space-y-2">\r
            <div className="space-y-1">\r
              <Label htmlFor="current">Current password</Label>\r
              <Input id="current" type="password" />\r
            </div>\r
            <div className="space-y-1">\r
              <Label htmlFor="new">New password</Label>\r
              <Input id="new" type="password" />\r
            </div>\r
          </CardContent>\r
        </Card>\r
      </TabsContent>\r
    </Tabs>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1" className="w-[400px]">\r
      <TabsList variant="line">\r
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>\r
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>\r
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>\r
      </TabsList>\r
      <TabsContent value="tab1">Content for Tab 1</TabsContent>\r
      <TabsContent value="tab2">Content for Tab 2</TabsContent>\r
      <TabsContent value="tab3">Content for Tab 3</TabsContent>\r
    </Tabs>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs orientation="vertical" defaultValue="tab1" className="w-[400px]">\r
      <TabsList>\r
        <TabsTrigger value="tab1">Overview</TabsTrigger>\r
        <TabsTrigger value="tab2">Settings</TabsTrigger>\r
        <TabsTrigger value="tab3">Help</TabsTrigger>\r
      </TabsList>\r
      <TabsContent value="tab1">Overview content</TabsContent>\r
      <TabsContent value="tab2">Settings content</TabsContent>\r
      <TabsContent value="tab3">Help content</TabsContent>\r
    </Tabs>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="preview" className="w-[400px]">\r
      <TabsList>\r
        <TabsTrigger value="preview">Preview</TabsTrigger>\r
        <TabsTrigger value="code">Code</TabsTrigger>\r
      </TabsList>\r
      <TabsContent value="preview" className="p-4 border rounded-lg">\r
        Preview content\r
      </TabsContent>\r
      <TabsContent value="code" className="p-4 border rounded-lg">\r
        <pre className="text-sm font-mono">\r
          {\`const Component = () => {\\n  return <div>Hello</div>\\n}\`}\r
        </pre>\r
      </TabsContent>\r
    </Tabs>
}`,...S.parameters?.docs?.source}}},C=[`Default`,`LineVariant`,`Vertical`,`WithButtons`]}))();export{y as Default,b as LineVariant,x as Vertical,S as WithButtons,C as __namedExportsOrder,v as default};