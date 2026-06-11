import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{r as o,t as s}from"./button-CoDyUfHr.js";import{n as c,t as l}from"./input-Dt_ZSsjM.js";import{Ht as u,Jt as d,Wt as f,t as p}from"./lucide-react-CxNzvEkP.js";import{n as m,t as h}from"./label-B5g1qXOL.js";import{n as g,t as _}from"./textarea-VEKEu-37.js";import{n as v,r as y,t as b}from"./stepper-DaAPAiRc.js";function x({steps:e,onComplete:t,className:n}){let[r,i]=C.useState(0),[o,c]=C.useState({}),[l,p]=C.useState({}),m=e[r],h=r===0,g=r===e.length-1,_=()=>{if(!m.validate)return!0;let e=m.validate?m.validate(o):{};return p(e),Object.keys(e).length===0};return(0,S.jsxs)(`div`,{className:a(`space-y-6`,n),children:[(0,S.jsx)(v,{activeStep:r,children:e.map(e=>(0,S.jsx)(b,{children:e.title},e.title))}),(0,S.jsxs)(`div`,{className:`min-h-[200px] rounded-lg border p-6`,children:[(0,S.jsx)(`h3`,{className:`text-lg font-semibold mb-1`,children:m.title}),m.description&&(0,S.jsx)(`p`,{className:`text-sm text-muted-foreground mb-4`,children:m.description}),m.render({formData:o,updateField:(e,t)=>{c(n=>({...n,[e]:t})),l[e]&&p(t=>{let n={...t};return delete n[e],n})},errors:l})]}),(0,S.jsxs)(`div`,{className:`flex justify-between`,children:[(0,S.jsxs)(s,{variant:`outline`,onClick:()=>{p({}),i(e=>e-1)},disabled:h,children:[(0,S.jsx)(f,{className:`size-4 mr-1`}),`Back`]}),(0,S.jsx)(s,{onClick:()=>{_()&&(g?t?.(o):i(e=>e+1))},children:g?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(d,{className:`size-4 mr-1`}),` Submit`]}):(0,S.jsxs)(S.Fragment,{children:[`Next `,(0,S.jsx)(u,{className:`size-4 ml-1`})]})})]})]})}var S,C,w=t((()=>{S=n(),C=e(r()),i(),o(),y(),p(),x.__docgenInfo={description:``,methods:[],displayName:`FormWizard`,props:{steps:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ title: string; description?: string; render: (...args: any[]) => React.ReactNode; validate?: (data: Record<string, unknown>) => Record<string, string> }`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`description`,value:{name:`string`,required:!1}},{key:`render`,value:{name:`signature`,type:`function`,raw:`(...args: any[]) => React.ReactNode`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`any`}],raw:`any[]`},name:`args`,rest:!0}],return:{name:`ReactReactNode`,raw:`React.ReactNode`}},required:!0}},{key:`validate`,value:{name:`signature`,type:`function`,raw:`(data: Record<string, unknown>) => Record<string, string>`,signature:{arguments:[{type:{name:`Record`,elements:[{name:`string`},{name:`unknown`}],raw:`Record<string, unknown>`},name:`data`}],return:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<string, string>`}},required:!1}}]}}],raw:`{ title: string; description?: string; render: (...args: any[]) => React.ReactNode; validate?: (data: Record<string, unknown>) => Record<string, string> }[]`},description:``},onComplete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(data: Record<string, unknown>) => void`,signature:{arguments:[{type:{name:`Record`,elements:[{name:`string`},{name:`unknown`}],raw:`Record<string, unknown>`},name:`data`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),T,E,D,O;t((()=>{T=n(),w(),c(),m(),g(),E={title:`Business/FormWizard`,component:x,tags:[`autodocs`]},D={render:()=>(0,T.jsx)(x,{steps:[{title:`Account`,description:`Create your account`,render:()=>(0,T.jsxs)(`div`,{className:`space-y-4`,children:[(0,T.jsxs)(`div`,{className:`space-y-2`,children:[(0,T.jsx)(h,{children:`Name`}),(0,T.jsx)(l,{placeholder:`Your name`})]}),(0,T.jsxs)(`div`,{className:`space-y-2`,children:[(0,T.jsx)(h,{children:`Email`}),(0,T.jsx)(l,{type:`email`,placeholder:`Your email`})]})]})},{title:`Profile`,description:`Tell us about yourself`,render:()=>(0,T.jsx)(`div`,{className:`space-y-4`,children:(0,T.jsxs)(`div`,{className:`space-y-2`,children:[(0,T.jsx)(h,{children:`Bio`}),(0,T.jsx)(_,{placeholder:`A short bio`})]})})},{title:`Confirm`,description:`Review and submit`,render:()=>(0,T.jsx)(`div`,{className:`space-y-4`,children:(0,T.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Click Submit to create your account.`})})}],onComplete:()=>alert(`Wizard completed!`)})},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <FormWizard steps={[{
    title: "Account",
    description: "Create your account",
    render: () => <div className="space-y-4">\r
              <div className="space-y-2">\r
                <Label>Name</Label>\r
                <Input placeholder="Your name" />\r
              </div>\r
              <div className="space-y-2">\r
                <Label>Email</Label>\r
                <Input type="email" placeholder="Your email" />\r
              </div>\r
            </div>
  }, {
    title: "Profile",
    description: "Tell us about yourself",
    render: () => <div className="space-y-4">\r
              <div className="space-y-2">\r
                <Label>Bio</Label>\r
                <Textarea placeholder="A short bio" />\r
              </div>\r
            </div>
  }, {
    title: "Confirm",
    description: "Review and submit",
    render: () => <div className="space-y-4">\r
              <p className="text-sm text-muted-foreground">\r
                Click Submit to create your account.\r
              </p>\r
            </div>
  }]} onComplete={() => alert("Wizard completed!")} />
}`,...D.parameters?.docs?.source}}},O=[`Default`]}))();export{D as Default,O as __namedExportsOrder,E as default};