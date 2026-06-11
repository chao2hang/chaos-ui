import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{r as o,t as s}from"./button-CoDyUfHr.js";import{n as c,t as l}from"./input-Dt_ZSsjM.js";import{I as u,S as d,t as f,ut as p}from"./lucide-react-CxNzvEkP.js";import{n as m,t as h}from"./label-B5g1qXOL.js";function g({value:e,defaultValue:t=[],onChange:n,onAdd:r,onRemove:i,renderItem:o,addButtonText:c=`Add Item`,addButtonVariant:l=`outline`,maxItems:f,minItems:m=0,disabled:h=!1,sortable:g=!1,className:y}){let[b,x]=v.useState(t),S=e??b,C=()=>{if(f&&S.length>=f)return;let e=r?r():{id:`item-${Date.now()}`},t=[...S,e];x(t),n?.(t)},w=e=>{if(S.length<=m)return;let t=S.filter((t,n)=>n!==e);x(t),n?.(t)},T=!f||S.length<f,E=S.length>m;return(0,_.jsxs)(`div`,{"data-slot":`form-list`,className:a(`space-y-3`,y),children:[S.map((e,t)=>(0,_.jsxs)(`div`,{"data-slot":`form-list-item`,className:`flex items-start gap-2 rounded-lg border p-4`,children:[g&&!h&&(0,_.jsxs)(s,{variant:`ghost`,size:`icon-xs`,className:`mt-1 cursor-grab`,tabIndex:-1,children:[(0,_.jsx)(p,{className:`size-3`}),(0,_.jsx)(`span`,{className:`sr-only`,children:`Drag to reorder`})]}),(0,_.jsx)(`div`,{className:`flex-1 min-w-0`,children:o(e,t)}),!h&&E&&(0,_.jsxs)(s,{variant:`ghost`,size:`icon-xs`,onClick:()=>w(t),className:`mt-1 shrink-0 text-muted-foreground hover:text-destructive`,children:[(0,_.jsx)(d,{className:`size-3`}),(0,_.jsx)(`span`,{className:`sr-only`,children:`Remove item`})]})]},e.id)),!h&&T&&(0,_.jsxs)(s,{variant:l,size:`sm`,onClick:C,className:`w-full`,children:[(0,_.jsx)(u,{className:`size-4 mr-1`}),c]})]})}var _,v,y=t((()=>{_=n(),v=e(r()),i(),o(),f(),g.__docgenInfo={description:``,methods:[],displayName:`FormList`,props:{value:{required:!1,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``},defaultValue:{required:!1,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``,defaultValue:{value:`[]`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: T[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},name:`value`}],return:{name:`void`}}},description:``},onAdd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => T`,signature:{arguments:[],return:{name:`T`}}},description:``},onRemove:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},renderItem:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(item: T, index: number) => React.ReactNode`,signature:{arguments:[{type:{name:`T`},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`ReactReactNode`,raw:`React.ReactNode`}}},description:``},addButtonText:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Add Item"`,computed:!1}},addButtonVariant:{required:!1,tsType:{name:`union`,raw:`"default" | "outline" | "ghost"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"outline"`},{name:`literal`,value:`"ghost"`}]},description:``,defaultValue:{value:`"outline"`,computed:!1}},maxItems:{required:!1,tsType:{name:`number`},description:``},minItems:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},sortable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}}})),b,x,S,C,w,T;t((()=>{b=n(),y(),c(),m(),x=e(r()),S={title:`Components/FormList`,component:g,tags:[`autodocs`]},C={render:()=>{let[e,t]=(0,x.useState)([{id:`1`,email:`john@example.com`,label:`John`}]);return(0,b.jsx)(g,{value:e,onChange:t,onAdd:()=>({id:`item-${Date.now()}`,email:``,label:``}),renderItem:(n,r)=>(0,b.jsxs)(`div`,{className:`grid grid-cols-2 gap-4`,children:[(0,b.jsxs)(`div`,{className:`space-y-2`,children:[(0,b.jsx)(h,{children:`Label`}),(0,b.jsx)(l,{value:n.label,onChange:i=>{let a=[...e];a[r]={...n,label:i.target.value},t(a)},placeholder:`Label`})]}),(0,b.jsxs)(`div`,{className:`space-y-2`,children:[(0,b.jsx)(h,{children:`Email`}),(0,b.jsx)(l,{value:n.email,onChange:i=>{let a=[...e];a[r]={...n,email:i.target.value},t(a)},placeholder:`Email`})]})]}),addButtonText:`Add Email`})}},w={render:()=>{let[e,t]=(0,x.useState)([]);return(0,b.jsx)(g,{value:e,onChange:t,onAdd:()=>({id:`item-${Date.now()}`,value:``}),renderItem:()=>(0,b.jsx)(l,{placeholder:`Enter value`}),maxItems:3,addButtonText:`Add Item`})}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [items, setItems] = useState<EmailItem[]>([{
      id: "1",
      email: "john@example.com",
      label: "John"
    }]);
    return <FormList<EmailItem> value={items} onChange={setItems} onAdd={() => ({
      id: \`item-\${Date.now()}\`,
      email: "",
      label: ""
    })} renderItem={(item, index) => <div className="grid grid-cols-2 gap-4">\r
            <div className="space-y-2">\r
              <Label>Label</Label>\r
              <Input value={item.label} onChange={e => {
          const newValue = [...items];
          newValue[index] = {
            ...item,
            label: e.target.value
          };
          setItems(newValue);
        }} placeholder="Label" />\r
            </div>\r
            <div className="space-y-2">\r
              <Label>Email</Label>\r
              <Input value={item.email} onChange={e => {
          const newValue = [...items];
          newValue[index] = {
            ...item,
            email: e.target.value
          };
          setItems(newValue);
        }} placeholder="Email" />\r
            </div>\r
          </div>} addButtonText="Add Email" />;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [items, setItems] = useState<FormListItem[]>([]);
    return <FormList value={items} onChange={setItems} onAdd={() => ({
      id: \`item-\${Date.now()}\`,
      value: ""
    })} renderItem={() => <Input placeholder="Enter value" />} maxItems={3} addButtonText="Add Item" />;
  }
}`,...w.parameters?.docs?.source}}},T=[`Default`,`WithMaxItems`]}))();export{C as Default,w as WithMaxItems,T as __namedExportsOrder,S as default};