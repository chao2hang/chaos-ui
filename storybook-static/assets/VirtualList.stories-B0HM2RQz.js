import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{n as o,t as s}from"./skeleton-ABESTvDQ.js";import{n as c,t as l}from"./esm-_3Ed44Uf.js";function u({data:e,renderItem:t,estimateSize:n,overscan:r=5,height:i,width:o=`100%`,className:s,onEndReached:l,endReachedThreshold:u=100,loading:p=!1,loadingComponent:m,emptyComponent:h}){let g=f.useRef(null),_=c({count:e.length,getScrollElement:()=>g.current,estimateSize:()=>n,overscan:r});return f.useEffect(()=>{let e=g.current;if(!e||!l)return;let t=()=>{let{scrollTop:t,scrollHeight:n,clientHeight:r}=e;n-t-r<u&&l()};return e.addEventListener(`scroll`,t),()=>e.removeEventListener(`scroll`,t)},[l,u]),e.length===0&&!p?h||(0,d.jsx)(`div`,{className:`flex items-center justify-center p-8 text-muted-foreground`,children:`No data`}):(0,d.jsxs)(`div`,{ref:g,"data-slot":`virtual-list`,className:a(`overflow-auto`,s),style:{height:i,width:o},children:[(0,d.jsx)(`div`,{style:{height:`${_.getTotalSize()}px`,width:`100%`,position:`relative`},children:_.getVirtualItems().map(n=>(0,d.jsx)(`div`,{"data-slot":`virtual-list-item`,style:{position:`absolute`,top:0,left:0,width:`100%`,height:`${n.size}px`,transform:`translateY(${n.start}px)`},children:t(e[n.index],n.index)},n.key))}),p&&m&&(0,d.jsx)(`div`,{className:`flex items-center justify-center p-4`,children:m})]})}var d,f,p=t((()=>{d=n(),f=e(r()),l(),i(),u.__docgenInfo={description:``,methods:[],displayName:`VirtualList`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``},renderItem:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(item: T, index: number) => React.ReactNode`,signature:{arguments:[{type:{name:`T`},name:`item`},{type:{name:`number`},name:`index`}],return:{name:`ReactReactNode`,raw:`React.ReactNode`}}},description:``},estimateSize:{required:!0,tsType:{name:`number`},description:``},overscan:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`5`,computed:!1}},height:{required:!0,tsType:{name:`number`},description:``},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:``,defaultValue:{value:`"100%"`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},onEndReached:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},endReachedThreshold:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`100`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},loadingComponent:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},emptyComponent:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})),m,h,g,_,v,y,b;t((()=>{m=n(),p(),o(),h=e=>Array.from({length:e},(e,t)=>({id:t+1,name:`Item ${t+1}`,description:`Description for item ${t+1}`})),g={title:`Components/VirtualList`,component:u,tags:[`autodocs`]},_={args:{data:h(100),estimateSize:50,height:300,renderItem:e=>(0,m.jsx)(`div`,{className:`flex items-center border-b px-4 py-2`,children:(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`p`,{className:`font-medium`,children:e.name}),(0,m.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:e.description})]})})}},v={args:{data:h(1e4),estimateSize:50,height:300,renderItem:e=>(0,m.jsx)(`div`,{className:`flex items-center border-b px-4 py-2`,children:(0,m.jsx)(`p`,{className:`font-medium`,children:e.name})})}},y={args:{data:h(50),estimateSize:50,height:300,loading:!0,loadingComponent:(0,m.jsxs)(`div`,{className:`flex items-center gap-2 p-4`,children:[(0,m.jsx)(s,{className:`size-4 rounded-full`}),(0,m.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:`Loading more...`})]}),renderItem:e=>(0,m.jsx)(`div`,{className:`border-b px-4 py-2`,children:(0,m.jsx)(`p`,{className:`font-medium`,children:e.name})})}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    data: generateData(100),
    estimateSize: 50,
    height: 300,
    renderItem: item => <div className="flex items-center border-b px-4 py-2">\r
        <div>\r
          <p className="font-medium">{item.name}</p>\r
          <p className="text-sm text-muted-foreground">{item.description}</p>\r
        </div>\r
      </div>
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    data: generateData(10000),
    estimateSize: 50,
    height: 300,
    renderItem: item => <div className="flex items-center border-b px-4 py-2">\r
        <p className="font-medium">{item.name}</p>\r
      </div>
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    data: generateData(50),
    estimateSize: 50,
    height: 300,
    loading: true,
    loadingComponent: <div className="flex items-center gap-2 p-4">\r
        <Skeleton className="size-4 rounded-full" />\r
        <span className="text-sm text-muted-foreground">Loading more...</span>\r
      </div>,
    renderItem: item => <div className="border-b px-4 py-2">\r
        <p className="font-medium">{item.name}</p>\r
      </div>
  }
}`,...y.parameters?.docs?.source}}},b=[`Default`,`LargeDataset`,`WithLoading`]}))();export{_ as Default,v as LargeDataset,y as WithLoading,b as __namedExportsOrder,g as default};