import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{n as o,t as s}from"./dist-BiFzeHEN.js";import{n as c,t as l}from"./input-Dt_ZSsjM.js";import{Kt as u,t as d}from"./lucide-react-CxNzvEkP.js";import{n as f,t as p}from"./label-B5g1qXOL.js";function m({className:e,variant:t,title:n,description:r,collapsible:i=!1,defaultCollapsed:o=!1,required:s,extra:c,children:l,...d}){let[f,p]=g.useState(o);return(0,h.jsxs)(`div`,{"data-slot":`form-section`,"data-collapsed":f,className:a(_({variant:t,className:e})),...d,children:[(n||r)&&(0,h.jsxs)(`div`,{className:a(`flex items-center justify-between px-4 py-3`,i&&`cursor-pointer select-none`),onClick:()=>i&&p(!f),children:[(0,h.jsxs)(`div`,{className:`space-y-0.5`,children:[n&&(0,h.jsxs)(`h3`,{className:`text-sm font-medium leading-none`,children:[n,s&&(0,h.jsx)(`span`,{className:`text-destructive ml-1`,children:`*`})]}),r&&(0,h.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:r})]}),(0,h.jsxs)(`div`,{className:`flex items-center gap-2`,children:[c,i&&(0,h.jsx)(u,{className:a(`size-4 text-muted-foreground transition-transform`,f&&`-rotate-90`)})]})]}),(!i||!f)&&(0,h.jsx)(`div`,{className:a(`px-4 pb-4`,n||r?`pt-0`:`pt-4`),children:l})]})}var h,g,_,v=t((()=>{h=n(),g=e(r()),i(),o(),d(),_=s(`rounded-lg border bg-card text-card-foreground`,{variants:{variant:{default:``,elevated:`shadow-sm`,flat:`border-0 bg-transparent`}},defaultVariants:{variant:`default`}}),m.__docgenInfo={description:``,methods:[],displayName:`FormSection`,props:{title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},collapsible:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},defaultCollapsed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},required:{required:!1,tsType:{name:`boolean`},description:``},extra:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}},composes:[`VariantProps`]}})),y,b,x,S,C,w;t((()=>{y=n(),v(),c(),f(),b={title:`Components/FormSection`,component:m,tags:[`autodocs`]},x={render:()=>(0,y.jsx)(m,{title:`Basic Information`,description:`Enter your details`,children:(0,y.jsxs)(`div`,{className:`space-y-4`,children:[(0,y.jsxs)(`div`,{className:`space-y-2`,children:[(0,y.jsx)(p,{htmlFor:`name`,children:`Name`}),(0,y.jsx)(l,{id:`name`,placeholder:`Enter name`})]}),(0,y.jsxs)(`div`,{className:`space-y-2`,children:[(0,y.jsx)(p,{htmlFor:`email`,children:`Email`}),(0,y.jsx)(l,{id:`email`,placeholder:`Enter email`})]})]})})},S={render:()=>(0,y.jsx)(m,{title:`Advanced Settings`,description:`Configure options`,collapsible:!0,children:(0,y.jsx)(`div`,{className:`space-y-4`,children:(0,y.jsxs)(`div`,{className:`space-y-2`,children:[(0,y.jsx)(p,{htmlFor:`api-key`,children:`API Key`}),(0,y.jsx)(l,{id:`api-key`,placeholder:`Enter API key`})]})})})},C={render:()=>(0,y.jsx)(m,{title:`Required Fields`,description:`These fields are required`,required:!0,children:(0,y.jsx)(`div`,{className:`space-y-4`,children:(0,y.jsxs)(`div`,{className:`space-y-2`,children:[(0,y.jsx)(p,{htmlFor:`username`,children:`Username`}),(0,y.jsx)(l,{id:`username`,placeholder:`Enter username`})]})})})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <FormSection title="Basic Information" description="Enter your details">\r
      <div className="space-y-4">\r
        <div className="space-y-2">\r
          <Label htmlFor="name">Name</Label>\r
          <Input id="name" placeholder="Enter name" />\r
        </div>\r
        <div className="space-y-2">\r
          <Label htmlFor="email">Email</Label>\r
          <Input id="email" placeholder="Enter email" />\r
        </div>\r
      </div>\r
    </FormSection>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <FormSection title="Advanced Settings" description="Configure options" collapsible>\r
      <div className="space-y-4">\r
        <div className="space-y-2">\r
          <Label htmlFor="api-key">API Key</Label>\r
          <Input id="api-key" placeholder="Enter API key" />\r
        </div>\r
      </div>\r
    </FormSection>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <FormSection title="Required Fields" description="These fields are required" required>\r
      <div className="space-y-4">\r
        <div className="space-y-2">\r
          <Label htmlFor="username">Username</Label>\r
          <Input id="username" placeholder="Enter username" />\r
        </div>\r
      </div>\r
    </FormSection>
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Collapsible`,`Required`]}))();export{S as Collapsible,x as Default,C as Required,w as __namedExportsOrder,b as default};