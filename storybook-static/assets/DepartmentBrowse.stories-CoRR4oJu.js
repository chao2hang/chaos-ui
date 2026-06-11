import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{r as o,t as s}from"./button-CoDyUfHr.js";import{n as c,t as l}from"./input-Dt_ZSsjM.js";import{n as u,t as d}from"./checkbox-sPz8JGcz.js";import{Ht as f,M as p,Qt as m,n as h,t as g}from"./lucide-react-CxNzvEkP.js";import{n as _,t as v}from"./badge-XiTNG6e3.js";import{c as y,l as b,o as x,r as S,s as C,t as w}from"./dialog-DUiQ0ThU.js";import{r as T,t as E}from"./scroll-area-DTVSAyBc.js";function D({department:e,selectedIds:t,onSelect:n,level:r=0}){let[i,o]=A.useState(r<2),c=e.children&&e.children.length>0,l=t.has(e.id);return(0,k.jsxs)(`div`,{children:[(0,k.jsxs)(`div`,{className:a(`flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer hover:bg-muted`,l&&`bg-muted`),style:{paddingLeft:`${r*16+8}px`},onClick:()=>n(e),children:[c?(0,k.jsx)(s,{variant:`ghost`,size:`icon-xs`,onClick:e=>{e.stopPropagation(),o(!i)},className:`shrink-0`,children:(0,k.jsx)(f,{className:a(`size-3 transition-transform`,i&&`rotate-90`)})}):(0,k.jsx)(`div`,{className:`size-4`}),(0,k.jsx)(d,{checked:l}),(0,k.jsx)(m,{className:`size-4 text-muted-foreground`}),(0,k.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,k.jsx)(`p`,{className:`text-sm font-medium truncate`,children:e.name}),e.code&&(0,k.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:e.code})]})]}),c&&i&&(0,k.jsx)(`div`,{children:e.children.map(e=>(0,k.jsx)(D,{department:e,selectedIds:t,onSelect:n,level:r+1},e.id))})]})}function O({value:e,defaultValue:t,placeholder:n=`Select department...`,disabled:r,multiple:i=!1,maxCount:o,departments:c=j,onChange:u,className:d}){let[f,g]=A.useState(!1),[_,b]=A.useState(``),[T,O]=A.useState(Array.isArray(t)?t:t?[t]:[]),M=e?Array.isArray(e)?e:[e]:T,N=A.useMemo(()=>new Set(M.map(e=>e.id)),[M]),P=A.useMemo(()=>{if(!_)return c;let e=_.toLowerCase(),t=n=>n.reduce((n,r)=>{let i=r.name.toLowerCase().includes(e)||r.code?.toLowerCase().includes(e),a=r.children?t(r.children):[];return(i||a.length>0)&&n.push({...r,children:a.length>0?a:r.children}),n},[]);return t(c)},[c,_]),F=e=>{let t;i?t=M.some(t=>t.id===e.id)?M.filter(t=>t.id!==e.id):[...M,e]:(t=[e],g(!1)),O(t),u?.(i?t:t[0])},I=e=>{let t=M.filter(t=>t.id!==e);O(t),u?.(i?t:t[0])};return(0,k.jsx)(`div`,{"data-slot":`department-browse`,className:a(`w-full`,d),children:(0,k.jsxs)(w,{open:f,onOpenChange:g,children:[(0,k.jsxs)(y,{render:(0,k.jsx)(`div`,{className:a(`flex min-h-8 w-full items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors`,`focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50`,`disabled:cursor-not-allowed disabled:opacity-50`,`dark:bg-input/30`,r&&`cursor-not-allowed opacity-50`)}),disabled:r,children:[M.length>0?(0,k.jsx)(`div`,{className:`flex flex-1 flex-wrap gap-1`,children:M.map(e=>(0,k.jsxs)(v,{variant:`secondary`,className:`gap-1`,children:[(0,k.jsx)(m,{className:`size-3`}),(0,k.jsx)(`span`,{children:e.name}),!r&&(0,k.jsxs)(`button`,{onClick:t=>{t.stopPropagation(),I(e.id)},className:`ml-0.5 rounded-full hover:bg-muted`,children:[(0,k.jsx)(h,{className:`size-3`}),(0,k.jsx)(`span`,{className:`sr-only`,children:`Remove`})]})]},e.id))}):(0,k.jsx)(`span`,{className:`flex-1 text-muted-foreground`,children:n}),M.length>0&&!r&&(0,k.jsxs)(s,{variant:`ghost`,size:`icon-xs`,onClick:e=>{e.stopPropagation(),O([]),u?.(i?[]:void 0)},className:`shrink-0`,children:[(0,k.jsx)(h,{className:`size-3`}),(0,k.jsx)(`span`,{className:`sr-only`,children:`Clear all`})]})]}),(0,k.jsxs)(S,{className:`sm:max-w-md`,children:[(0,k.jsx)(x,{children:(0,k.jsx)(C,{children:`Select Department`})}),(0,k.jsxs)(`div`,{className:`relative`,children:[(0,k.jsx)(p,{className:`absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`}),(0,k.jsx)(l,{value:_,onChange:e=>b(e.target.value),placeholder:`Search departments...`,className:`pl-8`})]}),(0,k.jsx)(E,{className:`h-[300px]`,children:(0,k.jsxs)(`div`,{className:`space-y-1`,children:[P.map(e=>(0,k.jsx)(D,{department:e,selectedIds:N,onSelect:F},e.id)),P.length===0&&(0,k.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-8 text-muted-foreground`,children:[(0,k.jsx)(m,{className:`size-8 mb-2`}),(0,k.jsx)(`p`,{className:`text-sm`,children:`No departments found`})]})]})}),i&&(0,k.jsxs)(`div`,{className:`flex items-center justify-between text-sm text-muted-foreground`,children:[(0,k.jsxs)(`span`,{children:[M.length,` department(s) selected`]}),o&&(0,k.jsxs)(`span`,{children:[`Max: `,o]})]})]})]})})}var k,A,j,M=t((()=>{k=n(),A=e(r()),i(),o(),c(),_(),b(),T(),u(),g(),j=[{id:`1`,name:`Head Office`,code:`HQ`,children:[{id:`1-1`,name:`Engineering`,code:`ENG`,parentId:`1`,children:[{id:`1-1-1`,name:`Frontend`,code:`FE`,parentId:`1-1`},{id:`1-1-2`,name:`Backend`,code:`BE`,parentId:`1-1`},{id:`1-1-3`,name:`DevOps`,code:`DO`,parentId:`1-1`}]},{id:`1-2`,name:`Design`,code:`DES`,parentId:`1`,children:[{id:`1-2-1`,name:`UI Design`,code:`UI`,parentId:`1-2`},{id:`1-2-2`,name:`UX Research`,code:`UX`,parentId:`1-2`}]},{id:`1-3`,name:`Marketing`,code:`MKT`,parentId:`1`},{id:`1-4`,name:`Sales`,code:`SAL`,parentId:`1`}]}],O.__docgenInfo={description:``,methods:[],displayName:`DepartmentBrowse`,props:{value:{required:!1,tsType:{name:`union`,raw:`Department | Department[]`,elements:[{name:`Department`},{name:`Array`,elements:[{name:`Department`}],raw:`Department[]`}]},description:``},defaultValue:{required:!1,tsType:{name:`union`,raw:`Department | Department[]`,elements:[{name:`Department`},{name:`Array`,elements:[{name:`Department`}],raw:`Department[]`}]},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Select department..."`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``},multiple:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},maxCount:{required:!1,tsType:{name:`number`},description:``},departments:{required:!1,tsType:{name:`Array`,elements:[{name:`Department`}],raw:`Department[]`},description:``,defaultValue:{value:`[
  {
    id: "1",
    name: "Head Office",
    code: "HQ",
    children: [
      {
        id: "1-1",
        name: "Engineering",
        code: "ENG",
        parentId: "1",
        children: [
          { id: "1-1-1", name: "Frontend", code: "FE", parentId: "1-1" },
          { id: "1-1-2", name: "Backend", code: "BE", parentId: "1-1" },
          { id: "1-1-3", name: "DevOps", code: "DO", parentId: "1-1" },
        ],
      },
      {
        id: "1-2",
        name: "Design",
        code: "DES",
        parentId: "1",
        children: [
          { id: "1-2-1", name: "UI Design", code: "UI", parentId: "1-2" },
          { id: "1-2-2", name: "UX Research", code: "UX", parentId: "1-2" },
        ],
      },
      {
        id: "1-3",
        name: "Marketing",
        code: "MKT",
        parentId: "1",
      },
      {
        id: "1-4",
        name: "Sales",
        code: "SAL",
        parentId: "1",
      },
    ],
  },
]`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: Department | Department[] | undefined) => void`,signature:{arguments:[{type:{name:`union`,raw:`Department | Department[] | undefined`,elements:[{name:`Department`},{name:`Array`,elements:[{name:`Department`}],raw:`Department[]`},{name:`undefined`}]},name:`value`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),N,P,F,I,L,R,z,B;t((()=>{N=n(),M(),P=e(r()),F={title:`Components/DepartmentBrowse`,component:O,tags:[`autodocs`]},I={render:()=>{let[e,t]=(0,P.useState)();return(0,N.jsx)(`div`,{className:`w-[300px]`,children:(0,N.jsx)(O,{value:e,onChange:t,placeholder:`Select department...`})})}},L={args:{defaultValue:{id:`1-1`,name:`Engineering`,code:`ENG`}}},R={render:()=>{let[e,t]=(0,P.useState)([]);return(0,N.jsx)(`div`,{className:`w-[300px]`,children:(0,N.jsx)(O,{value:e,onChange:t,multiple:!0,placeholder:`Select departments...`})})}},z={args:{disabled:!0,defaultValue:{id:`1-1`,name:`Engineering`,code:`ENG`}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<Department | undefined>();
    return <div className="w-[300px]">\r
        <DepartmentBrowse value={value} onChange={setValue} placeholder="Select department..." />\r
      </div>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      id: "1-1",
      name: "Engineering",
      code: "ENG"
    }
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<Department[]>([]);
    return <div className="w-[300px]">\r
        <DepartmentBrowse value={value} onChange={setValue} multiple placeholder="Select departments..." />\r
      </div>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: {
      id: "1-1",
      name: "Engineering",
      code: "ENG"
    }
  }
}`,...z.parameters?.docs?.source}}},B=[`Default`,`WithDefault`,`Multiple`,`Disabled`]}))();export{I as Default,z as Disabled,R as Multiple,L as WithDefault,B as __namedExportsOrder,F as default};