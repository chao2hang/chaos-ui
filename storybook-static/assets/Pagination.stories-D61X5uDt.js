import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{r as i,t as a}from"./button-CoDyUfHr.js";import{Ht as o,Wt as s,bt as c,t as l}from"./lucide-react-CxNzvEkP.js";function u({className:e,...t}){return(0,_.jsx)(`nav`,{role:`navigation`,"aria-label":`pagination`,"data-slot":`pagination`,className:r(`mx-auto flex w-full justify-center`,e),...t})}function d({className:e,...t}){return(0,_.jsx)(`ul`,{"data-slot":`pagination-content`,className:r(`flex items-center gap-0.5`,e),...t})}function f({...e}){return(0,_.jsx)(`li`,{"data-slot":`pagination-item`,...e})}function p({className:e,isActive:t,size:n=`icon`,...i}){return(0,_.jsx)(a,{variant:t?`outline`:`ghost`,size:n,className:r(e),nativeButton:!1,render:(0,_.jsx)(`a`,{"aria-current":t?`page`:void 0,"data-slot":`pagination-link`,"data-active":t,...i})})}function m({className:e,text:t=`Previous`,...n}){return(0,_.jsxs)(p,{"aria-label":`Go to previous page`,size:`default`,className:r(`pl-1.5!`,e),...n,children:[(0,_.jsx)(s,{"data-icon":`inline-start`}),(0,_.jsx)(`span`,{className:`hidden sm:block`,children:t})]})}function h({className:e,text:t=`Next`,...n}){return(0,_.jsxs)(p,{"aria-label":`Go to next page`,size:`default`,className:r(`pr-1.5!`,e),...n,children:[(0,_.jsx)(`span`,{className:`hidden sm:block`,children:t}),(0,_.jsx)(o,{"data-icon":`inline-end`})]})}function g({className:e,...t}){return(0,_.jsxs)(`span`,{"aria-hidden":!0,"data-slot":`pagination-ellipsis`,className:r(`flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4`,e),...t,children:[(0,_.jsx)(c,{}),(0,_.jsx)(`span`,{className:`sr-only`,children:`More pages`})]})}var _,v=e((()=>{_=t(),n(),i(),l(),u.__docgenInfo={description:``,methods:[],displayName:`Pagination`},d.__docgenInfo={description:``,methods:[],displayName:`PaginationContent`},g.__docgenInfo={description:``,methods:[],displayName:`PaginationEllipsis`},f.__docgenInfo={description:``,methods:[],displayName:`PaginationItem`},p.__docgenInfo={description:``,methods:[],displayName:`PaginationLink`,props:{isActive:{required:!1,tsType:{name:`boolean`},description:``},size:{defaultValue:{value:`"icon"`,computed:!1},required:!1}}},h.__docgenInfo={description:``,methods:[],displayName:`PaginationNext`,props:{text:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Next"`,computed:!1}}}},m.__docgenInfo={description:``,methods:[],displayName:`PaginationPrevious`,props:{text:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"Previous"`,computed:!1}}}}})),y,b,x,S,C;e((()=>{y=t(),v(),b={title:`Components/Pagination`,component:u,tags:[`autodocs`]},x={render:()=>(0,y.jsx)(u,{children:(0,y.jsxs)(d,{children:[(0,y.jsx)(f,{children:(0,y.jsx)(m,{href:`#`})}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`#`,children:`1`})}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`#`,isActive:!0,children:`2`})}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`#`,children:`3`})}),(0,y.jsx)(f,{children:(0,y.jsx)(g,{})}),(0,y.jsx)(f,{children:(0,y.jsx)(h,{href:`#`})})]})})},S={render:()=>(0,y.jsx)(u,{children:(0,y.jsxs)(d,{children:[(0,y.jsx)(f,{children:(0,y.jsx)(m,{href:`#`})}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`#`,children:`1`})}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`#`,children:`2`})}),(0,y.jsx)(f,{children:(0,y.jsx)(p,{href:`#`,children:`3`})}),(0,y.jsx)(f,{children:(0,y.jsx)(h,{href:`#`})})]})})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>\r
      <PaginationContent>\r
        <PaginationItem>\r
          <PaginationPrevious href="#" />\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationLink href="#">1</PaginationLink>\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationLink href="#" isActive>2</PaginationLink>\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationLink href="#">3</PaginationLink>\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationEllipsis />\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationNext href="#" />\r
        </PaginationItem>\r
      </PaginationContent>\r
    </Pagination>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Pagination>\r
      <PaginationContent>\r
        <PaginationItem>\r
          <PaginationPrevious href="#" />\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationLink href="#">1</PaginationLink>\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationLink href="#">2</PaginationLink>\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationLink href="#">3</PaginationLink>\r
        </PaginationItem>\r
        <PaginationItem>\r
          <PaginationNext href="#" />\r
        </PaginationItem>\r
      </PaginationContent>\r
    </Pagination>
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Simple`]}))();export{x as Default,S as Simple,C as __namedExportsOrder,b as default};