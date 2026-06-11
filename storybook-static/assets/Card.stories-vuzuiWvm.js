import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{r as n,t as r}from"./button-CoDyUfHr.js";import{n as i,t as a}from"./badge-XiTNG6e3.js";import{a as o,c as s,i as c,n as l,o as u,r as d,s as f,t as p}from"./card-kUQbP-z5.js";var m,h,g,_,v,y,b,x,S;e((()=>{m=t(),s(),n(),i(),h={title:`Components/Card`,component:p,tags:[`autodocs`],argTypes:{size:{control:{type:`select`},options:[`default`,`sm`],description:`The size of the card`}}},g={render:e=>(0,m.jsxs)(p,{...e,className:`max-w-sm`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Card Title`}),(0,m.jsx)(c,{children:`Card description goes here.`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{children:`This is the card content area.`})})]})},_={args:{size:`sm`},render:e=>(0,m.jsxs)(p,{...e,className:`max-w-sm`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Small Card`}),(0,m.jsx)(c,{children:`A smaller card variant.`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{children:`This is a small card.`})})]})},v={render:()=>(0,m.jsxs)(p,{className:`max-w-sm`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Card with Footer`}),(0,m.jsx)(c,{children:`This card has a footer section.`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{children:`Main content goes here.`})}),(0,m.jsxs)(o,{className:`gap-2`,children:[(0,m.jsx)(r,{variant:`outline`,children:`Cancel`}),(0,m.jsx)(r,{children:`Save`})]})]})},y={render:()=>(0,m.jsxs)(p,{className:`max-w-sm`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Card with Action`}),(0,m.jsx)(c,{children:`Action button in header.`}),(0,m.jsx)(l,{children:(0,m.jsx)(r,{variant:`outline`,size:`sm`,children:`Edit`})})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{children:`Main content goes here.`})})]})},b={render:()=>(0,m.jsxs)(p,{className:`max-w-sm`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Project Status`}),(0,m.jsx)(c,{children:`Current project state`}),(0,m.jsx)(l,{children:(0,m.jsx)(a,{children:`Active`})})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Project is currently in development phase.`})})]})},x={render:()=>(0,m.jsxs)(`div`,{className:`grid grid-cols-2 gap-4`,children:[(0,m.jsxs)(p,{size:`default`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Default Size`}),(0,m.jsx)(c,{children:`Standard spacing`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Content`})})]}),(0,m.jsxs)(p,{size:`sm`,children:[(0,m.jsxs)(u,{children:[(0,m.jsx)(f,{children:`Small Size`}),(0,m.jsx)(c,{children:`Compact spacing`})]}),(0,m.jsx)(d,{children:(0,m.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Content`})})]})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <Card {...args} className="max-w-sm">\r
      <CardHeader>\r
        <CardTitle>Card Title</CardTitle>\r
        <CardDescription>Card description goes here.</CardDescription>\r
      </CardHeader>\r
      <CardContent>\r
        <p>This is the card content area.</p>\r
      </CardContent>\r
    </Card>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    size: "sm"
  },
  render: args => <Card {...args} className="max-w-sm">\r
      <CardHeader>\r
        <CardTitle>Small Card</CardTitle>\r
        <CardDescription>A smaller card variant.</CardDescription>\r
      </CardHeader>\r
      <CardContent>\r
        <p>This is a small card.</p>\r
      </CardContent>\r
    </Card>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-sm">\r
      <CardHeader>\r
        <CardTitle>Card with Footer</CardTitle>\r
        <CardDescription>This card has a footer section.</CardDescription>\r
      </CardHeader>\r
      <CardContent>\r
        <p>Main content goes here.</p>\r
      </CardContent>\r
      <CardFooter className="gap-2">\r
        <Button variant="outline">Cancel</Button>\r
        <Button>Save</Button>\r
      </CardFooter>\r
    </Card>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-sm">\r
      <CardHeader>\r
        <CardTitle>Card with Action</CardTitle>\r
        <CardDescription>Action button in header.</CardDescription>\r
        <CardAction>\r
          <Button variant="outline" size="sm">Edit</Button>\r
        </CardAction>\r
      </CardHeader>\r
      <CardContent>\r
        <p>Main content goes here.</p>\r
      </CardContent>\r
    </Card>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Card className="max-w-sm">\r
      <CardHeader>\r
        <CardTitle>Project Status</CardTitle>\r
        <CardDescription>Current project state</CardDescription>\r
        <CardAction>\r
          <Badge>Active</Badge>\r
        </CardAction>\r
      </CardHeader>\r
      <CardContent>\r
        <p className="text-sm text-muted-foreground">Project is currently in development phase.</p>\r
      </CardContent>\r
    </Card>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4">\r
      <Card size="default">\r
        <CardHeader>\r
          <CardTitle>Default Size</CardTitle>\r
          <CardDescription>Standard spacing</CardDescription>\r
        </CardHeader>\r
        <CardContent>\r
          <p className="text-sm text-muted-foreground">Content</p>\r
        </CardContent>\r
      </Card>\r
      <Card size="sm">\r
        <CardHeader>\r
          <CardTitle>Small Size</CardTitle>\r
          <CardDescription>Compact spacing</CardDescription>\r
        </CardHeader>\r
        <CardContent>\r
          <p className="text-sm text-muted-foreground">Content</p>\r
        </CardContent>\r
      </Card>\r
    </div>
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Small`,`WithFooter`,`WithAction`,`WithBadge`,`AllSizes`]}))();export{x as AllSizes,g as Default,_ as Small,y as WithAction,b as WithBadge,v as WithFooter,S as __namedExportsOrder,h as default};