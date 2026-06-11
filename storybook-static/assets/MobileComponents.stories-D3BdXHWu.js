import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{r as i,t as a}from"./button-CoDyUfHr.js";import{n as o,t as s}from"./input-Dt_ZSsjM.js";import{K as c,O as l,W as ee,cn as te,in as ne,o as u,t as d,un as re,wt as f}from"./lucide-react-CxNzvEkP.js";import{c as ie,i as ae,l as oe,n as se,s as ce,t as le}from"./select-vJ4_3F_x.js";import{n as ue,t as de}from"./empty-state-Duq4L86H.js";import{n as fe,t as pe}from"./form-field-LByK9WG8.js";import{n as me,t as he}from"./textarea-VEKEu-37.js";import{a as ge,c as p,i as _e,o as ve,r as m,s as ye,t as h}from"./card-kUQbP-z5.js";import{a as be,c as xe,i as Se,l as Ce,o as we,r as Te,s as Ee,t as De}from"./dialog-DUiQ0ThU.js";import{a as Oe,c as ke,i as Ae,l as je,o as Me,r as Ne,s as Pe,t as Fe}from"./sheet-H2Om6PBk.js";import{r as g,t as Ie}from"./scroll-area-DTVSAyBc.js";import{a as Le,i as Re,n as ze,r as Be,t as Ve}from"./tabs-hLc_jrUQ.js";import{n as He,t as Ue}from"./page-header-D6rlahL-.js";function _({className:e,fullWidth:t=!0,...n}){return(0,v.jsx)(a,{className:r(`h-12 px-6 text-base`,`md:h-8 md:px-3 md:text-sm`,t&&`w-full md:w-auto`,e),...n})}var v,We=e((()=>{v=t(),i(),n(),_.__docgenInfo={description:``,methods:[],displayName:`MobileButton`,props:{fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}}}}));function y({className:e,...t}){return(0,Ge.jsx)(s,{className:r(`h-12 px-4 text-base`,`md:h-8 md:px-2.5 md:text-sm`,e),...t})}var Ge,Ke=e((()=>{Ge=t(),o(),n(),y.__docgenInfo={description:``,methods:[],displayName:`MobileInput`}}));function b({className:e,...t}){return(0,qe.jsx)(he,{className:r(`min-h-[120px] px-4 py-3 text-base`,`md:min-h-[80px] md:px-2.5 md:py-1 md:text-sm`,e),...t})}var qe,Je=e((()=>{qe=t(),me(),n(),b.__docgenInfo={description:``,methods:[],displayName:`MobileTextarea`}}));function Ye({options:e,value:t,onValueChange:n,placeholder:i,disabled:a,className:o}){return(0,x.jsxs)(le,{value:t,onValueChange:n,disabled:a,children:[(0,x.jsx)(ce,{className:r(`h-12 px-4 text-base w-full`,`md:h-8 md:px-2.5 md:text-sm`,o),children:(0,x.jsx)(ie,{placeholder:i})}),(0,x.jsx)(se,{children:e.map(e=>(0,x.jsx)(ae,{value:e.value,children:e.label},e.value))})]})}var x,Xe=e((()=>{x=t(),oe(),n(),Ye.__docgenInfo={description:``,methods:[],displayName:`MobileSelect`,props:{options:{required:!0,tsType:{name:`Array`,elements:[{name:`MobileSelectOption`}],raw:`MobileSelectOption[]`},description:``},value:{required:!1,tsType:{name:`string`},description:``},onValueChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function Ze({children:e,title:t,description:n,trigger:i,actions:a,open:o,onOpenChange:s,className:c}){return(0,S.jsxs)(De,{open:o,onOpenChange:s,children:[i&&(0,S.jsx)(xe,{asChild:!0,children:i}),(0,S.jsxs)(Te,{className:r(`max-w-full inset-0 rounded-none p-0 translate-x-0 translate-y-0`,`sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:max-w-md sm:p-6`,c),children:[(0,S.jsxs)(we,{className:`p-4 sm:p-0 sm:mb-4 border-b sm:border-0`,children:[t&&(0,S.jsx)(Ee,{children:t}),n&&(0,S.jsx)(Se,{children:n})]}),(0,S.jsx)(`div`,{className:`flex-1 overflow-auto p-4 sm:p-0`,children:e}),a&&(0,S.jsx)(be,{className:`p-4 sm:p-0 sm:mt-4 border-t sm:border-0`,children:a})]})]})}var S,Qe=e((()=>{S=t(),Ce(),n(),Ze.__docgenInfo={description:``,methods:[],displayName:`MobileDialog`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},trigger:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},open:{required:!1,tsType:{name:`boolean`},description:``},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function $e({children:e,title:t,description:n,trigger:i,actions:a,side:o=`bottom`,open:s,onOpenChange:c,className:l}){return(0,C.jsxs)(Fe,{open:s,onOpenChange:c,children:[i&&(0,C.jsx)(ke,{asChild:!0,children:i}),(0,C.jsxs)(Ne,{side:o,className:r(`h-[80vh]`,`sm:h-auto sm:max-h-[90vh]`,l),children:[(0,C.jsxs)(Me,{className:`p-4 border-b`,children:[t&&(0,C.jsx)(Pe,{children:t}),n&&(0,C.jsx)(Ae,{children:n})]}),(0,C.jsx)(`div`,{className:`flex-1 overflow-auto p-4`,children:e}),a&&(0,C.jsx)(Oe,{className:`p-4 border-t`,children:a})]})]})}var C,et=e((()=>{C=t(),je(),n(),$e.__docgenInfo={description:``,methods:[],displayName:`MobileSheet`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},trigger:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},side:{required:!1,tsType:{name:`union`,raw:`"top" | "right" | "bottom" | "left"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"right"`},{name:`literal`,value:`"bottom"`},{name:`literal`,value:`"left"`}]},description:``,defaultValue:{value:`"bottom"`,computed:!1}},open:{required:!1,tsType:{name:`boolean`},description:``},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(open: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function w({title:e,description:t,children:n,actions:i,className:a}){return(0,T.jsxs)(h,{className:r(`w-full`,a),children:[(e||t)&&(0,T.jsxs)(ve,{className:`p-4 pb-2`,children:[e&&(0,T.jsx)(ye,{className:`text-lg`,children:e}),t&&(0,T.jsx)(_e,{className:`text-sm`,children:t})]}),(0,T.jsx)(m,{className:r(`p-4`,!(e||t)&&`pt-4`),children:n}),i&&(0,T.jsx)(ge,{className:`p-4 pt-2 border-t`,children:i})]})}var T,tt=e((()=>{T=t(),p(),n(),w.__docgenInfo={description:``,methods:[],displayName:`MobileCard`,props:{title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function E({title:e,value:t,change:n,changeType:i=`neutral`,icon:a,className:o}){let s={positive:ne,negative:re,neutral:ee},c={positive:`text-success`,negative:`text-destructive`,neutral:`text-muted-foreground`},l=s[i];return(0,D.jsxs)(h,{className:r(o),children:[(0,D.jsxs)(ve,{className:`flex flex-row items-center justify-between pb-2`,children:[(0,D.jsx)(ye,{className:`text-sm font-medium text-muted-foreground`,children:e}),a&&(0,D.jsx)(a,{className:`size-4 text-muted-foreground`})]}),(0,D.jsxs)(m,{children:[(0,D.jsx)(`div`,{className:`text-2xl font-bold`,children:t}),n&&(0,D.jsxs)(`div`,{className:r(`flex items-center gap-1 mt-1 text-xs`,c[i]),children:[(0,D.jsx)(l,{className:`size-3`}),(0,D.jsx)(`span`,{className:`font-medium`,children:n})]})]})]})}var D,nt=e((()=>{D=t(),p(),n(),d(),E.__docgenInfo={description:``,methods:[],displayName:`MobileKPICard`,props:{title:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`string`},description:``},change:{required:!1,tsType:{name:`string`},description:``},changeType:{required:!1,tsType:{name:`union`,raw:`"positive" | "negative" | "neutral"`,elements:[{name:`literal`,value:`"positive"`},{name:`literal`,value:`"negative"`},{name:`literal`,value:`"neutral"`}]},description:``,defaultValue:{value:`"neutral"`,computed:!1}},icon:{required:!1,tsType:{name:`ReactElementType`,raw:`React.ElementType`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function O({columns:e,data:t,onRowClick:n,className:i}){let a=e.find(e=>e.primary)||e[0],o=e.filter(e=>e.key!==a.key);return(0,k.jsx)(`div`,{className:r(`space-y-2`,i),children:t.map((e,t)=>(0,k.jsx)(h,{className:r(`cursor-pointer transition-colors hover:bg-muted/50`,n&&`active:bg-muted`),onClick:()=>n?.(e),children:(0,k.jsxs)(m,{className:`p-3`,children:[(0,k.jsx)(`div`,{className:`flex items-center justify-between`,children:(0,k.jsx)(`div`,{className:`font-medium text-sm`,children:a.render?a.render(e):String(e[a.key]??``)})}),(0,k.jsx)(`div`,{className:`mt-2 flex flex-wrap gap-2`,children:o.map(t=>(0,k.jsxs)(`div`,{className:`flex items-center gap-1 text-xs text-muted-foreground`,children:[(0,k.jsxs)(`span`,{className:`font-medium`,children:[t.header,`:`]}),(0,k.jsx)(`span`,{children:t.render?t.render(e):String(e[t.key]??``)})]},t.key))})]})},t))})}var k,rt=e((()=>{k=t(),p(),n(),O.__docgenInfo={description:``,methods:[],displayName:`MobileDataTable`,props:{columns:{required:!0,tsType:{name:`Array`,elements:[{name:`MobileColumn`,elements:[{name:`T`}],raw:`MobileColumn<T>`}],raw:`MobileColumn<T>[]`},description:``},data:{required:!0,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``},onRowClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(row: T) => void`,signature:{arguments:[{type:{name:`T`},name:`row`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function A({children:e,onSubmit:t,className:n}){return(0,it.jsx)(`form`,{onSubmit:t,className:r(`space-y-4 p-4`,`md:p-0 md:space-y-6`,n),children:e})}var it,at=e((()=>{it=t(),n(),A.__docgenInfo={description:``,methods:[],displayName:`MobileForm`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},onSubmit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(e: React.FormEvent) => void`,signature:{arguments:[{type:{name:`ReactFormEvent`,raw:`React.FormEvent`},name:`e`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function j({className:e,...t}){return(0,ot.jsx)(pe,{className:r(`space-y-2`,e),...t})}var ot,st=e((()=>{ot=t(),fe(),n(),j.__docgenInfo={description:``,methods:[],displayName:`MobileFormField`,props:{label:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`string`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function M({className:e,...t}){return(0,ct.jsx)(de,{className:r(`py-8`,e),...t})}var ct,lt=e((()=>{ct=t(),ue(),n(),M.__docgenInfo={description:``,methods:[],displayName:`MobileEmptyState`,props:{variant:{required:!1,tsType:{name:`string`},description:``},icon:{required:!1,tsType:{name:`ReactElementType`,raw:`React.ElementType`},description:``},title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},action:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function ut({items:e,className:t}){return(0,N.jsx)(Ie,{className:r(`w-full`,t),children:(0,N.jsx)(`div`,{className:`flex gap-2 p-2`,children:e.map((e,t)=>(0,N.jsx)(a,{variant:e.active?`default`:`outline`,size:`sm`,className:`shrink-0`,onClick:e.onClick,asChild:!!e.href,children:e.href?(0,N.jsxs)(`a`,{href:e.href,children:[e.icon&&(0,N.jsx)(e.icon,{className:`size-4 mr-1`}),e.label]}):(0,N.jsxs)(N.Fragment,{children:[e.icon&&(0,N.jsx)(e.icon,{className:`size-4 mr-1`}),e.label]})},t))})})}var N,dt=e((()=>{N=t(),n(),i(),g(),ut.__docgenInfo={description:``,methods:[],displayName:`MobileNavigation`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string
  href?: string
  icon?: React.ElementType
  active?: boolean
  onClick?: () => void
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`href`,value:{name:`string`,required:!1}},{key:`icon`,value:{name:`ReactElementType`,raw:`React.ElementType`,required:!1}},{key:`active`,value:{name:`boolean`,required:!1}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}}]}}],raw:`{
  label: string
  href?: string
  icon?: React.ElementType
  active?: boolean
  onClick?: () => void
}[]`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function ft({tabs:e,defaultValue:t,className:n}){return(0,P.jsxs)(Ve,{defaultValue:t||e[0]?.value,className:r(`w-full`,n),children:[(0,P.jsx)(Ie,{className:`w-full border-b`,children:(0,P.jsx)(Be,{className:`w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto`,children:e.map(e=>(0,P.jsx)(Re,{value:e.value,className:`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:shadow-none`,children:e.label},e.value))})}),e.map(e=>(0,P.jsx)(ze,{value:e.value,className:`p-4 mt-0`,children:e.content},e.value))]})}var P,pt=e((()=>{P=t(),Le(),g(),n(),ft.__docgenInfo={description:``,methods:[],displayName:`MobileTabs`,props:{tabs:{required:!0,tsType:{name:`Array`,elements:[{name:`MobileTabItem`}],raw:`MobileTabItem[]`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function mt({onBack:e,onMenu:t,className:n,...i}){return(0,F.jsxs)(`div`,{className:r(`flex items-center gap-3 p-4 border-b bg-background sticky top-0 z-10`,`md:p-0 md:border-0 md:mb-6 md:static md:z-auto`,n),children:[e&&(0,F.jsx)(a,{variant:`ghost`,size:`icon-sm`,onClick:e,className:`shrink-0`,children:(0,F.jsx)(te,{className:`size-5`})}),(0,F.jsx)(`div`,{className:`flex-1 min-w-0`,children:(0,F.jsx)(Ue,{...i})}),t&&(0,F.jsx)(a,{variant:`ghost`,size:`icon-sm`,onClick:t,className:`shrink-0`,children:(0,F.jsx)(c,{className:`size-5`})})]})}var F,ht=e((()=>{F=t(),He(),i(),n(),d(),mt.__docgenInfo={description:``,methods:[],displayName:`MobilePageHeader`,props:{title:{required:!0,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},breadcrumbItems:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ label: string; href?: string }`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`href`,value:{name:`string`,required:!1}}]}}],raw:`{ label: string; href?: string }[]`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onMenu:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function gt({children:e,title:t,description:n,actions:i,onBack:a,onMenu:o,className:s}){return(0,I.jsxs)(`div`,{className:r(`min-h-screen bg-background`,s),children:[t&&(0,I.jsx)(mt,{title:t,description:n,actions:i,onBack:a,onMenu:o}),(0,I.jsx)(`main`,{className:`p-4 md:p-6`,children:e})]})}var I,_t=e((()=>{I=t(),n(),ht(),gt.__docgenInfo={description:``,methods:[],displayName:`MobileDashboardLayout`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},title:{required:!1,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`string`},description:``},actions:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onMenu:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function vt({children:e,className:t}){return(0,L.jsx)(`div`,{className:r(`flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4`,t),children:(0,L.jsx)(`div`,{className:`w-full max-w-md`,children:e})})}var L,yt=e((()=>{L=t(),n(),vt.__docgenInfo={description:``,methods:[],displayName:`MobileAuthLayout`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}}));function R({children:e,device:t=`desktop`,showFrame:n=!0,showLabel:i=!0,className:a}){let o=bt[t];return(0,z.jsxs)(`div`,{className:r(`flex flex-col items-center gap-2`,a),children:[i&&(0,z.jsxs)(`div`,{className:`text-xs text-muted-foreground font-medium`,children:[o.label,` (`,o.width,` × `,o.height,`)`]}),(0,z.jsx)(`div`,{className:r(`border rounded-lg overflow-hidden bg-background`,n&&`shadow-lg`),style:{width:n?Math.min(o.width,800):`100%`,height:n?Math.min(o.height,600):`auto`},children:(0,z.jsx)(`div`,{className:`w-full h-full overflow-auto`,children:e})})]})}var z,bt,xt=e((()=>{z=t(),n(),bt={mobile:{width:375,height:667,label:`Mobile`},tablet:{width:768,height:1024,label:`Tablet`},desktop:{width:1024,height:768,label:`Desktop`}},R.__docgenInfo={description:``,methods:[],displayName:`ResponsivePreview`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},device:{required:!1,tsType:{name:`union`,raw:`"mobile" | "tablet" | "desktop"`,elements:[{name:`literal`,value:`"mobile"`},{name:`literal`,value:`"tablet"`},{name:`literal`,value:`"desktop"`}]},description:``,defaultValue:{value:`"desktop"`,computed:!1}},showFrame:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showLabel:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}}})),B,St,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{B=t(),We(),Ke(),Je(),Xe(),Qe(),et(),tt(),nt(),rt(),at(),st(),lt(),dt(),pt(),_t(),yt(),xt(),d(),St={title:`Mobile/Components`,component:_,tags:[`autodocs`],parameters:{layout:`centered`}},V={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsxs)(`div`,{className:`p-4 space-y-4`,children:[(0,B.jsx)(_,{children:`Full Width Button`}),(0,B.jsx)(_,{variant:`outline`,children:`Outline Button`}),(0,B.jsx)(_,{variant:`secondary`,children:`Secondary Button`}),(0,B.jsx)(_,{variant:`destructive`,children:`Destructive Button`}),(0,B.jsx)(_,{variant:`ghost`,children:`Ghost Button`})]})})},H={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsxs)(`div`,{className:`p-4 space-y-4`,children:[(0,B.jsx)(y,{placeholder:`Mobile input`}),(0,B.jsx)(y,{placeholder:`With error`,"aria-invalid":!0}),(0,B.jsx)(b,{placeholder:`Mobile textarea`}),(0,B.jsx)(Ye,{options:[{value:`1`,label:`Option 1`},{value:`2`,label:`Option 2`},{value:`3`,label:`Option 3`}],placeholder:`Select option`})]})})},U={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsxs)(`div`,{className:`p-4 space-y-4`,children:[(0,B.jsx)(E,{title:`Revenue`,value:`$45,231`,change:`+20.1%`,changeType:`positive`,icon:f}),(0,B.jsx)(E,{title:`Users`,value:`2,350`,change:`+12.5%`,changeType:`positive`,icon:u}),(0,B.jsx)(E,{title:`Sales`,value:`+12,234`,change:`-2.5%`,changeType:`negative`,icon:l})]})})},W={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(`div`,{className:`p-4 space-y-4`,children:(0,B.jsx)(Ze,{title:`Confirm Action`,description:`Are you sure you want to proceed?`,trigger:(0,B.jsx)(_,{children:`Open Dialog`}),actions:(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(_,{variant:`outline`,children:`Cancel`}),(0,B.jsx)(_,{children:`Confirm`})]}),children:(0,B.jsx)(`p`,{children:`This is a mobile-optimized dialog that takes full screen on mobile devices.`})})})})},G={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(`div`,{className:`p-4 space-y-4`,children:(0,B.jsx)($e,{title:`Bottom Sheet`,description:`Swipe down to close`,trigger:(0,B.jsx)(_,{variant:`outline`,children:`Open Bottom Sheet`}),children:(0,B.jsxs)(`div`,{className:`space-y-4`,children:[(0,B.jsx)(`p`,{children:`This is a mobile-optimized bottom sheet.`}),(0,B.jsx)(_,{children:`Action 1`}),(0,B.jsx)(_,{variant:`outline`,children:`Action 2`})]})})})})},K={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(`div`,{className:`p-4`,children:(0,B.jsx)(O,{columns:[{key:`id`,header:`ID`,primary:!0},{key:`customer`,header:`Customer`},{key:`amount`,header:`Amount`},{key:`status`,header:`Status`}],data:[{id:`ORD-001`,customer:`Alice Johnson`,amount:`$250.00`,status:`Completed`},{id:`ORD-002`,customer:`Bob Smith`,amount:`$120.50`,status:`Pending`},{id:`ORD-003`,customer:`Carol White`,amount:`$89.99`,status:`Processing`}]})})})},q={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsxs)(A,{children:[(0,B.jsx)(j,{label:`Name`,required:!0,children:(0,B.jsx)(y,{placeholder:`Enter your name`})}),(0,B.jsx)(j,{label:`Email`,required:!0,children:(0,B.jsx)(y,{type:`email`,placeholder:`Enter your email`})}),(0,B.jsx)(j,{label:`Message`,children:(0,B.jsx)(b,{placeholder:`Enter your message`})}),(0,B.jsx)(_,{children:`Submit`})]})})},J={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsxs)(`div`,{className:`p-4 space-y-8`,children:[(0,B.jsx)(M,{variant:`default`,action:(0,B.jsx)(_,{size:`sm`,children:`Create Item`})}),(0,B.jsx)(M,{variant:`search`,action:(0,B.jsx)(_,{size:`sm`,variant:`outline`,children:`Clear Filters`})}),(0,B.jsx)(M,{variant:`error`,action:(0,B.jsx)(_,{size:`sm`,children:`Retry`})})]})})},Y={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(`div`,{className:`p-4`,children:(0,B.jsx)(ut,{items:[{label:`All`,active:!0},{label:`Active`},{label:`Completed`},{label:`Pending`},{label:`Archived`}]})})})},X={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(ft,{tabs:[{value:`overview`,label:`Overview`,content:(0,B.jsx)(`p`,{children:`Overview content for mobile`})},{value:`details`,label:`Details`,content:(0,B.jsx)(`p`,{children:`Details content for mobile`})},{value:`settings`,label:`Settings`,content:(0,B.jsx)(`p`,{children:`Settings content for mobile`})}]})})},Z={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(gt,{title:`Dashboard`,description:`Welcome back`,children:(0,B.jsxs)(`div`,{className:`space-y-4`,children:[(0,B.jsx)(E,{title:`Revenue`,value:`$45,231`,change:`+20.1%`,changeType:`positive`,icon:f}),(0,B.jsx)(E,{title:`Users`,value:`2,350`,change:`+12.5%`,changeType:`positive`,icon:u})]})})})},Q={render:()=>(0,B.jsx)(R,{device:`mobile`,children:(0,B.jsx)(vt,{children:(0,B.jsx)(w,{title:`Sign In`,description:`Enter your credentials`,children:(0,B.jsxs)(`div`,{className:`space-y-4`,children:[(0,B.jsx)(j,{label:`Email`,required:!0,children:(0,B.jsx)(y,{type:`email`,placeholder:`Enter your email`})}),(0,B.jsx)(j,{label:`Password`,required:!0,children:(0,B.jsx)(y,{type:`password`,placeholder:`Enter your password`})}),(0,B.jsx)(_,{children:`Sign In`})]})})})})},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4 space-y-4">\r
        <MobileButton>Full Width Button</MobileButton>\r
        <MobileButton variant="outline">Outline Button</MobileButton>\r
        <MobileButton variant="secondary">Secondary Button</MobileButton>\r
        <MobileButton variant="destructive">Destructive Button</MobileButton>\r
        <MobileButton variant="ghost">Ghost Button</MobileButton>\r
      </div>\r
    </ResponsivePreview>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4 space-y-4">\r
        <MobileInput placeholder="Mobile input" />\r
        <MobileInput placeholder="With error" aria-invalid />\r
        <MobileTextarea placeholder="Mobile textarea" />\r
        <MobileSelect options={[{
        value: "1",
        label: "Option 1"
      }, {
        value: "2",
        label: "Option 2"
      }, {
        value: "3",
        label: "Option 3"
      }]} placeholder="Select option" />\r
      </div>\r
    </ResponsivePreview>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4 space-y-4">\r
        <MobileKPICard title="Revenue" value="$45,231" change="+20.1%" changeType="positive" icon={DollarSignIcon} />\r
        <MobileKPICard title="Users" value="2,350" change="+12.5%" changeType="positive" icon={UsersIcon} />\r
        <MobileKPICard title="Sales" value="+12,234" change="-2.5%" changeType="negative" icon={ShoppingCartIcon} />\r
      </div>\r
    </ResponsivePreview>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4 space-y-4">\r
        <MobileDialog title="Confirm Action" description="Are you sure you want to proceed?" trigger={<MobileButton>Open Dialog</MobileButton>} actions={<>\r
              <MobileButton variant="outline">Cancel</MobileButton>\r
              <MobileButton>Confirm</MobileButton>\r
            </>}>\r
          <p>This is a mobile-optimized dialog that takes full screen on mobile devices.</p>\r
        </MobileDialog>\r
      </div>\r
    </ResponsivePreview>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4 space-y-4">\r
        <MobileSheet title="Bottom Sheet" description="Swipe down to close" trigger={<MobileButton variant="outline">Open Bottom Sheet</MobileButton>}>\r
          <div className="space-y-4">\r
            <p>This is a mobile-optimized bottom sheet.</p>\r
            <MobileButton>Action 1</MobileButton>\r
            <MobileButton variant="outline">Action 2</MobileButton>\r
          </div>\r
        </MobileSheet>\r
      </div>\r
    </ResponsivePreview>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const columns = [{
      key: "id",
      header: "ID",
      primary: true
    }, {
      key: "customer",
      header: "Customer"
    }, {
      key: "amount",
      header: "Amount"
    }, {
      key: "status",
      header: "Status"
    }];
    const data = [{
      id: "ORD-001",
      customer: "Alice Johnson",
      amount: "$250.00",
      status: "Completed"
    }, {
      id: "ORD-002",
      customer: "Bob Smith",
      amount: "$120.50",
      status: "Pending"
    }, {
      id: "ORD-003",
      customer: "Carol White",
      amount: "$89.99",
      status: "Processing"
    }];
    return <ResponsivePreview device="mobile">\r
        <div className="p-4">\r
          <MobileDataTable columns={columns} data={data} />\r
        </div>\r
      </ResponsivePreview>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <MobileForm>\r
        <MobileFormField label="Name" required>\r
          <MobileInput placeholder="Enter your name" />\r
        </MobileFormField>\r
        <MobileFormField label="Email" required>\r
          <MobileInput type="email" placeholder="Enter your email" />\r
        </MobileFormField>\r
        <MobileFormField label="Message">\r
          <MobileTextarea placeholder="Enter your message" />\r
        </MobileFormField>\r
        <MobileButton>Submit</MobileButton>\r
      </MobileForm>\r
    </ResponsivePreview>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4 space-y-8">\r
        <MobileEmptyState variant="default" action={<MobileButton size="sm">Create Item</MobileButton>} />\r
        <MobileEmptyState variant="search" action={<MobileButton size="sm" variant="outline">Clear Filters</MobileButton>} />\r
        <MobileEmptyState variant="error" action={<MobileButton size="sm">Retry</MobileButton>} />\r
      </div>\r
    </ResponsivePreview>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <div className="p-4">\r
        <MobileNavigation items={[{
        label: "All",
        active: true
      }, {
        label: "Active"
      }, {
        label: "Completed"
      }, {
        label: "Pending"
      }, {
        label: "Archived"
      }]} />\r
      </div>\r
    </ResponsivePreview>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <MobileTabs tabs={[{
      value: "overview",
      label: "Overview",
      content: <p>Overview content for mobile</p>
    }, {
      value: "details",
      label: "Details",
      content: <p>Details content for mobile</p>
    }, {
      value: "settings",
      label: "Settings",
      content: <p>Settings content for mobile</p>
    }]} />\r
    </ResponsivePreview>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <MobileDashboardLayout title="Dashboard" description="Welcome back">\r
        <div className="space-y-4">\r
          <MobileKPICard title="Revenue" value="$45,231" change="+20.1%" changeType="positive" icon={DollarSignIcon} />\r
          <MobileKPICard title="Users" value="2,350" change="+12.5%" changeType="positive" icon={UsersIcon} />\r
        </div>\r
      </MobileDashboardLayout>\r
    </ResponsivePreview>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <ResponsivePreview device="mobile">\r
      <MobileAuthLayout>\r
        <MobileCard title="Sign In" description="Enter your credentials">\r
          <div className="space-y-4">\r
            <MobileFormField label="Email" required>\r
              <MobileInput type="email" placeholder="Enter your email" />\r
            </MobileFormField>\r
            <MobileFormField label="Password" required>\r
              <MobileInput type="password" placeholder="Enter your password" />\r
            </MobileFormField>\r
            <MobileButton>Sign In</MobileButton>\r
          </div>\r
        </MobileCard>\r
      </MobileAuthLayout>\r
    </ResponsivePreview>
}`,...Q.parameters?.docs?.source}}},$=[`MobileButtons`,`MobileInputs`,`MobileCards`,`MobileDialogs`,`MobileSheets`,`MobileDataTables`,`MobileForms`,`MobileEmptyStates`,`MobileNavigations`,`MobileTabsDemo`,`MobileDashboardLayouts`,`MobileAuthLayouts`]}))();export{Q as MobileAuthLayouts,V as MobileButtons,U as MobileCards,Z as MobileDashboardLayouts,K as MobileDataTables,W as MobileDialogs,J as MobileEmptyStates,q as MobileForms,H as MobileInputs,Y as MobileNavigations,G as MobileSheets,X as MobileTabsDemo,$ as __namedExportsOrder,St as default};