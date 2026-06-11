import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{n as i,t as a}from"./dist-BiFzeHEN.js";import{It as o,Mt as s,g as c,it as l,t as u}from"./lucide-react-CxNzvEkP.js";function d({className:e,variant:t=`default`,icon:n,children:i,...a}){let o=n??g[t??`default`];return(0,m.jsxs)(`div`,{role:`alert`,className:r(h({variant:t}),e),...a,children:[(0,m.jsx)(o,{className:`size-4 shrink-0 mt-0.5`}),(0,m.jsx)(`div`,{className:`flex-1 min-w-0`,children:i})]})}function f({className:e,...t}){return(0,m.jsx)(`h5`,{className:r(`mb-1 font-medium leading-none tracking-tight`,e),...t})}function p({className:e,...t}){return(0,m.jsx)(`div`,{className:r(`text-sm [&_p]:leading-relaxed`,e),...t})}var m,h,g,_=e((()=>{m=t(),i(),n(),u(),h=a(`relative w-full rounded-lg border px-4 py-3 text-sm flex items-start gap-3`,{variants:{variant:{default:`bg-background text-foreground`,info:`border-info/30 bg-info/10 text-info`,success:`border-success/30 bg-success/10 text-success`,warning:`border-warning/30 bg-warning/10 text-warning`,destructive:`border-destructive/30 bg-destructive/10 text-destructive`}},defaultVariants:{variant:`default`}}),g={default:o,info:l,success:s,warning:c,destructive:o},d.__docgenInfo={description:``,methods:[],displayName:`Alert`,props:{className:{required:!1,tsType:{name:`string`},description:``},variant:{required:!1,tsType:{name:`union`,raw:`"default" | "info" | "success" | "warning" | "destructive"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`},{name:`literal`,value:`"destructive"`}]},description:``,defaultValue:{value:`"default"`,computed:!1}},icon:{required:!1,tsType:{name:`ReactElementType`,raw:`React.ElementType`},description:``},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},f.__docgenInfo={description:``,methods:[],displayName:`AlertTitle`,props:{className:{required:!1,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}},p.__docgenInfo={description:``,methods:[],displayName:`AlertDescription`,props:{className:{required:!1,tsType:{name:`string`},description:``},children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})),v,y,b,x,S,C,w,T,E,D;e((()=>{v=t(),_(),u(),y={title:`Components/Alert`,component:d,tags:[`autodocs`],parameters:{layout:`padded`}},b={render:()=>(0,v.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,v.jsxs)(d,{children:[(0,v.jsx)(o,{}),(0,v.jsx)(f,{children:`Default Alert`}),(0,v.jsx)(p,{children:`This is a default alert message.`})]})})},x={render:()=>(0,v.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,v.jsxs)(d,{variant:`destructive`,children:[(0,v.jsx)(o,{}),(0,v.jsx)(f,{children:`Error`}),(0,v.jsx)(p,{children:`Your session has expired. Please log in again.`})]})})},S={render:()=>(0,v.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,v.jsxs)(d,{variant:`success`,children:[(0,v.jsx)(s,{}),(0,v.jsx)(f,{children:`Success`}),(0,v.jsx)(p,{children:`Your changes have been saved successfully.`})]})})},C={render:()=>(0,v.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,v.jsxs)(d,{variant:`warning`,children:[(0,v.jsx)(c,{}),(0,v.jsx)(f,{children:`Warning`}),(0,v.jsx)(p,{children:`Your storage is almost full.`})]})})},w={render:()=>(0,v.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,v.jsxs)(d,{variant:`info`,children:[(0,v.jsx)(l,{}),(0,v.jsx)(f,{children:`Info`}),(0,v.jsx)(p,{children:`A new version is available for download.`})]})})},T={render:()=>(0,v.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,v.jsxs)(d,{children:[(0,v.jsx)(f,{children:`Heads up!`}),(0,v.jsx)(p,{children:`This alert has no icon.`})]})})},E={render:()=>(0,v.jsxs)(`div`,{className:`w-full max-w-2xl space-y-4`,children:[(0,v.jsxs)(d,{variant:`default`,children:[(0,v.jsx)(o,{}),(0,v.jsx)(f,{children:`Default`}),(0,v.jsx)(p,{children:`Default alert message.`})]}),(0,v.jsxs)(d,{variant:`info`,children:[(0,v.jsx)(l,{}),(0,v.jsx)(f,{children:`Info`}),(0,v.jsx)(p,{children:`Informational message.`})]}),(0,v.jsxs)(d,{variant:`success`,children:[(0,v.jsx)(s,{}),(0,v.jsx)(f,{children:`Success`}),(0,v.jsx)(p,{children:`Success message.`})]}),(0,v.jsxs)(d,{variant:`warning`,children:[(0,v.jsx)(c,{}),(0,v.jsx)(f,{children:`Warning`}),(0,v.jsx)(p,{children:`Warning message.`})]}),(0,v.jsxs)(d,{variant:`destructive`,children:[(0,v.jsx)(o,{}),(0,v.jsx)(f,{children:`Error`}),(0,v.jsx)(p,{children:`Error message.`})]})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Alert>\r
        <AlertCircleIcon />\r
        <AlertTitle>Default Alert</AlertTitle>\r
        <AlertDescription>This is a default alert message.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Alert variant="destructive">\r
        <AlertCircleIcon />\r
        <AlertTitle>Error</AlertTitle>\r
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Alert variant="success">\r
        <CheckCircle2Icon />\r
        <AlertTitle>Success</AlertTitle>\r
        <AlertDescription>Your changes have been saved successfully.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Alert variant="warning">\r
        <AlertTriangleIcon />\r
        <AlertTitle>Warning</AlertTitle>\r
        <AlertDescription>Your storage is almost full.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Alert variant="info">\r
        <InfoIcon />\r
        <AlertTitle>Info</AlertTitle>\r
        <AlertDescription>A new version is available for download.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Alert>\r
        <AlertTitle>Heads up!</AlertTitle>\r
        <AlertDescription>This alert has no icon.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl space-y-4">\r
      <Alert variant="default">\r
        <AlertCircleIcon />\r
        <AlertTitle>Default</AlertTitle>\r
        <AlertDescription>Default alert message.</AlertDescription>\r
      </Alert>\r
      <Alert variant="info">\r
        <InfoIcon />\r
        <AlertTitle>Info</AlertTitle>\r
        <AlertDescription>Informational message.</AlertDescription>\r
      </Alert>\r
      <Alert variant="success">\r
        <CheckCircle2Icon />\r
        <AlertTitle>Success</AlertTitle>\r
        <AlertDescription>Success message.</AlertDescription>\r
      </Alert>\r
      <Alert variant="warning">\r
        <AlertTriangleIcon />\r
        <AlertTitle>Warning</AlertTitle>\r
        <AlertDescription>Warning message.</AlertDescription>\r
      </Alert>\r
      <Alert variant="destructive">\r
        <AlertCircleIcon />\r
        <AlertTitle>Error</AlertTitle>\r
        <AlertDescription>Error message.</AlertDescription>\r
      </Alert>\r
    </div>
}`,...E.parameters?.docs?.source}}},D=[`Default`,`Destructive`,`Success`,`Warning`,`Info`,`WithoutIcon`,`AllVariants`]}))();export{E as AllVariants,b as Default,x as Destructive,w as Info,S as Success,C as Warning,T as WithoutIcon,D as __namedExportsOrder,y as default};