import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{n as i,t as a}from"./dist-BiFzeHEN.js";import{n as o,t as s}from"./input-Dt_ZSsjM.js";import{n as c,t as l}from"./label-B5g1qXOL.js";function u({className:e,columns:t,gap:n,children:i,...a}){return(0,f.jsx)(`div`,{"data-slot":`form-grid`,className:r(p({columns:t,gap:n,className:e})),...a,children:i})}function d({className:e,span:t,children:n,...i}){return(0,f.jsx)(`div`,{"data-slot":`form-grid-item`,className:r(t===2&&`sm:col-span-2`,t===3&&`sm:col-span-2 lg:col-span-3`,t===4&&`sm:col-span-2 lg:col-span-4`,e),...i,children:n})}var f,p,m=e((()=>{f=t(),n(),i(),p=a(`grid gap-4`,{variants:{columns:{1:`grid-cols-1`,2:`grid-cols-1 sm:grid-cols-2`,3:`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`,4:`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`},gap:{sm:`gap-2`,default:`gap-4`,lg:`gap-6`}},defaultVariants:{columns:2,gap:`default`}}),u.__docgenInfo={description:``,methods:[],displayName:`FormGrid`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}},composes:[`VariantProps`]},d.__docgenInfo={description:``,methods:[],displayName:`FormGridItem`,props:{span:{required:!1,tsType:{name:`union`,raw:`1 | 2 | 3 | 4`,elements:[{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`}]},description:``},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})),h,g,_,v,y,b;e((()=>{h=t(),m(),o(),c(),g={title:`Components/FormGrid`,component:u,tags:[`autodocs`]},_={render:()=>(0,h.jsxs)(u,{children:[(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`name`,children:`Name`}),(0,h.jsx)(s,{id:`name`,placeholder:`Enter name`})]}),(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`email`,children:`Email`}),(0,h.jsx)(s,{id:`email`,placeholder:`Enter email`})]})]})},v={render:()=>(0,h.jsxs)(u,{columns:3,children:[(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`first`,children:`First Name`}),(0,h.jsx)(s,{id:`first`,placeholder:`John`})]}),(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`middle`,children:`Middle`}),(0,h.jsx)(s,{id:`middle`,placeholder:`M`})]}),(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`last`,children:`Last Name`}),(0,h.jsx)(s,{id:`last`,placeholder:`Doe`})]})]})},y={render:()=>(0,h.jsxs)(u,{columns:3,children:[(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`name2`,children:`Name`}),(0,h.jsx)(s,{id:`name2`,placeholder:`Name`})]}),(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`email2`,children:`Email`}),(0,h.jsx)(s,{id:`email2`,placeholder:`Email`})]}),(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`phone2`,children:`Phone`}),(0,h.jsx)(s,{id:`phone2`,placeholder:`Phone`})]}),(0,h.jsx)(d,{span:2,children:(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`address`,children:`Address`}),(0,h.jsx)(s,{id:`address`,placeholder:`Address`})]})}),(0,h.jsxs)(`div`,{className:`space-y-2`,children:[(0,h.jsx)(l,{htmlFor:`city`,children:`City`}),(0,h.jsx)(s,{id:`city`,placeholder:`City`})]})]})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <FormGrid>\r
      <div className="space-y-2">\r
        <Label htmlFor="name">Name</Label>\r
        <Input id="name" placeholder="Enter name" />\r
      </div>\r
      <div className="space-y-2">\r
        <Label htmlFor="email">Email</Label>\r
        <Input id="email" placeholder="Enter email" />\r
      </div>\r
    </FormGrid>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <FormGrid columns={3}>\r
      <div className="space-y-2">\r
        <Label htmlFor="first">First Name</Label>\r
        <Input id="first" placeholder="John" />\r
      </div>\r
      <div className="space-y-2">\r
        <Label htmlFor="middle">Middle</Label>\r
        <Input id="middle" placeholder="M" />\r
      </div>\r
      <div className="space-y-2">\r
        <Label htmlFor="last">Last Name</Label>\r
        <Input id="last" placeholder="Doe" />\r
      </div>\r
    </FormGrid>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <FormGrid columns={3}>\r
      <div className="space-y-2">\r
        <Label htmlFor="name2">Name</Label>\r
        <Input id="name2" placeholder="Name" />\r
      </div>\r
      <div className="space-y-2">\r
        <Label htmlFor="email2">Email</Label>\r
        <Input id="email2" placeholder="Email" />\r
      </div>\r
      <div className="space-y-2">\r
        <Label htmlFor="phone2">Phone</Label>\r
        <Input id="phone2" placeholder="Phone" />\r
      </div>\r
      <FormGridItem span={2}>\r
        <div className="space-y-2">\r
          <Label htmlFor="address">Address</Label>\r
          <Input id="address" placeholder="Address" />\r
        </div>\r
      </FormGridItem>\r
      <div className="space-y-2">\r
        <Label htmlFor="city">City</Label>\r
        <Input id="city" placeholder="City" />\r
      </div>\r
    </FormGrid>
}`,...y.parameters?.docs?.source}}},b=[`Default`,`ThreeColumns`,`WithSpan`]}))();export{_ as Default,v as ThreeColumns,y as WithSpan,b as __namedExportsOrder,g as default};