import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,r,t as i}from"./scroll-area-DTVSAyBc.js";import{n as a,t as o}from"./separator-rZ-_XyCs.js";var s,c,l,u,d,f;e((()=>{s=t(),r(),a(),c={title:`Components/ScrollArea`,component:i,tags:[`autodocs`]},l=Array.from({length:50}).map((e,t,n)=>`v1.2.0-beta.${n.length-t}`),u={render:()=>(0,s.jsx)(i,{className:`h-72 w-48 rounded-md border`,children:(0,s.jsxs)(`div`,{className:`p-4`,children:[(0,s.jsx)(`h4`,{className:`mb-4 text-sm font-medium leading-none`,children:`Tags`}),l.map(e=>(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`text-sm`,children:e}),(0,s.jsx)(o,{className:`my-2`})]},e))]})})},d={render:()=>(0,s.jsxs)(i,{className:`w-96 whitespace-nowrap rounded-md border`,children:[(0,s.jsx)(`div`,{className:`flex w-max space-x-4 p-4`,children:Array.from({length:20}).map((e,t)=>(0,s.jsxs)(`div`,{className:`shrink-0 rounded-md border p-4 w-32`,children:[(0,s.jsxs)(`div`,{className:`text-sm font-medium`,children:[`Item `,t+1]}),(0,s.jsx)(`div`,{className:`text-xs text-muted-foreground`,children:`Description`})]},t))}),(0,s.jsx)(n,{orientation:`horizontal`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="h-72 w-48 rounded-md border">\r
      <div className="p-4">\r
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>\r
        {tags.map(tag => <div key={tag}>\r
            <div className="text-sm">{tag}</div>\r
            <Separator className="my-2" />\r
          </div>)}\r
      </div>\r
    </ScrollArea>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea className="w-96 whitespace-nowrap rounded-md border">\r
      <div className="flex w-max space-x-4 p-4">\r
        {Array.from({
        length: 20
      }).map((_, i) => <div key={i} className="shrink-0 rounded-md border p-4 w-32">\r
            <div className="text-sm font-medium">Item {i + 1}</div>\r
            <div className="text-xs text-muted-foreground">Description</div>\r
          </div>)}\r
      </div>\r
      <ScrollBar orientation="horizontal" />\r
    </ScrollArea>
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Horizontal`]}))();export{u as Default,d as Horizontal,f as __namedExportsOrder,c as default};