import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{r as o,t as s}from"./button-CoDyUfHr.js";import{n as c,t as l}from"./dist-BiFzeHEN.js";import{n as u,t as d}from"./input-Dt_ZSsjM.js";import{M as f,n as p,t as m}from"./lucide-react-CxNzvEkP.js";function h({className:e,size:t,value:n,defaultValue:r,placeholder:i=`Select...`,disabled:o,readOnly:c,required:l,"aria-invalid":u,onBrowse:m,onChange:h,onClear:y,showClearButton:b=!0,showBrowseButton:x=!0,...S}){let[C,w]=_.useState(r||``),T=n??C,E=e=>{let t=e.target.value;w(t),h?.(t)},D=()=>{w(``),h?.(``),y?.()};return(0,g.jsxs)(`div`,{"data-slot":`browse-input`,"data-size":t,className:a(v({size:t,className:e})),"aria-invalid":u,...S,children:[(0,g.jsx)(d,{value:T,onChange:E,placeholder:i,disabled:o,readOnly:c,required:l,className:`border-0 bg-transparent focus-visible:ring-0 h-full`}),b&&T&&!o&&!c&&(0,g.jsxs)(s,{variant:`ghost`,size:`icon-xs`,onClick:D,className:`mr-1 shrink-0`,tabIndex:-1,children:[(0,g.jsx)(p,{className:`size-3`}),(0,g.jsx)(`span`,{className:`sr-only`,children:`Clear`})]}),x&&(0,g.jsxs)(s,{variant:`ghost`,size:`icon-xs`,onClick:m,disabled:o,className:`mr-1 shrink-0`,tabIndex:-1,children:[(0,g.jsx)(f,{className:`size-3`}),(0,g.jsx)(`span`,{className:`sr-only`,children:`Browse`})]})]})}var g,_,v,y=t((()=>{g=n(),_=e(r()),c(),i(),o(),u(),m(),v=l(`flex items-center gap-2 rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,{variants:{size:{default:`h-8`,sm:`h-7`,lg:`h-9`}},defaultVariants:{size:`default`}}),h.__docgenInfo={description:``,methods:[],displayName:`BrowseInput`,props:{value:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Select..."`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``},readOnly:{required:!1,tsType:{name:`boolean`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},"aria-invalid":{required:!1,tsType:{name:`boolean`},description:``},onBrowse:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},onClear:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},showClearButton:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showBrowseButton:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}},composes:[`Omit`,`VariantProps`]}})),b,x,S,C,w,T,E,D,O,k;t((()=>{b=n(),y(),x=e(r()),S={title:`Components/BrowseInput`,component:h,tags:[`autodocs`]},C={args:{placeholder:`Select item...`}},w={args:{defaultValue:`Selected item`}},T={args:{disabled:!0,placeholder:`Disabled`}},E={args:{readOnly:!0,defaultValue:`Read only`}},D={args:{placeholder:`Small size`}},O={render:()=>{let[e,t]=(0,x.useState)(``);return(0,b.jsxs)(`div`,{className:`space-y-2 max-w-sm`,children:[(0,b.jsx)(h,{value:e,onChange:t,onBrowse:()=>alert(`Browse clicked`),placeholder:`Click browse or type...`}),(0,b.jsxs)(`p`,{className:`text-sm text-muted-foreground`,children:[`Value: `,e||`(empty)`]})]})}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Select item..."
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "Selected item"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Disabled"
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    defaultValue: "Read only"
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Small size"
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div className="space-y-2 max-w-sm">\r
        <BrowseInput value={value} onChange={setValue} onBrowse={() => alert("Browse clicked")} placeholder="Click browse or type..." />\r
        <p className="text-sm text-muted-foreground">Value: {value || "(empty)"}</p>\r
      </div>;
  }
}`,...O.parameters?.docs?.source}}},k=[`Default`,`WithValue`,`Disabled`,`ReadOnly`,`Small`,`Interactive`]}))();export{C as Default,T as Disabled,O as Interactive,E as ReadOnly,D as Small,w as WithValue,k as __namedExportsOrder,S as default};