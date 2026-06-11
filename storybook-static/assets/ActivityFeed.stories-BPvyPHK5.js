import{c as e,i as t}from"./preload-helper-D2yxXLVK.js";import{d as n,j as r}from"./iframe-agP7ZJF7.js";import{n as i,t as a}from"./utils-CMVnEVHk.js";import{i as o,n as s,t as c}from"./avatar-BgbfBbAy.js";import{r as l,t as u}from"./button-CoDyUfHr.js";import{a as d,i as f,n as p,o as m,r as h,t as g}from"./timeline-B4fYWQlT.js";function _({items:e=[],onLoadMore:t,hasMore:n,className:r}){let i=y.useMemo(()=>{let t=new Date,n=new Date(t);n.setDate(n.getDate()-1);let r=t.toDateString(),i=n.toDateString(),a={today:[],yesterday:[],earlier:[]};return e.forEach(e=>{let t=new Date(e.time);t.toDateString()===r?a.today.push(e):t.toDateString()===i?a.yesterday.push(e):a.earlier.push(e)}),a},[e]),o=(e,t)=>t.length===0?null:(0,v.jsxs)(`div`,{className:`mb-6`,children:[(0,v.jsx)(`h4`,{className:`mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground`,children:e}),(0,v.jsx)(g,{children:t.map((e,t)=>(0,v.jsxs)(d,{children:[(0,v.jsx)(f,{variant:e.variant,children:e.avatarFallback?(0,v.jsx)(c,{className:`size-6`,children:(0,v.jsx)(s,{className:`text-[0.6rem]`,children:e.avatarFallback})}):null}),(0,v.jsx)(p,{}),(0,v.jsxs)(h,{children:[(0,v.jsxs)(`p`,{className:`text-sm`,children:[(0,v.jsx)(`span`,{className:`font-medium`,children:e.user}),` `,(0,v.jsx)(`span`,{className:`text-muted-foreground`,children:e.action})]}),(0,v.jsx)(`time`,{className:`text-xs text-muted-foreground`,children:new Date(e.time).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})})]})]},t))})]});return(0,v.jsxs)(`div`,{className:a(r),children:[o(`Today`,i.today),o(`Yesterday`,i.yesterday),o(`Earlier`,i.earlier),n&&(0,v.jsx)(u,{variant:`outline`,size:`sm`,onClick:t,className:`w-full mt-2`,children:`Load more`}),e.length===0&&(0,v.jsx)(`p`,{className:`text-sm text-muted-foreground text-center py-8`,children:`No activity yet.`})]})}var v,y,b=t((()=>{v=n(),y=e(r()),i(),o(),l(),m(),_.__docgenInfo={description:``,methods:[],displayName:`ActivityFeed`,props:{items:{required:!1,tsType:{name:`Array`,elements:[{name:`ActivityItem`}],raw:`ActivityItem[]`},description:``,defaultValue:{value:`[]`,computed:!1}},onLoadMore:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},hasMore:{required:!1,tsType:{name:`boolean`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})),x,S,C,w;t((()=>{x=n(),b(),o(),S={title:`Business/ActivityFeed`,component:_,tags:[`autodocs`]},C={args:{activities:[{id:`1`,user:{name:`John Doe`},action:`created a new project`,target:`Website Redesign`,time:`2 hours ago`,icon:(0,x.jsx)(c,{className:`size-6`,children:(0,x.jsx)(s,{children:`JD`})})},{id:`2`,user:{name:`Jane Smith`},action:`commented on`,target:`Bug #123`,time:`3 hours ago`,icon:(0,x.jsx)(c,{className:`size-6`,children:(0,x.jsx)(s,{children:`JS`})})},{id:`3`,user:{name:`Bob Wilson`},action:`completed task`,target:`Update docs`,time:`5 hours ago`,icon:(0,x.jsx)(c,{className:`size-6`,children:(0,x.jsx)(s,{children:`BW`})})}]}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    activities: [{
      id: "1",
      user: {
        name: "John Doe"
      },
      action: "created a new project",
      target: "Website Redesign",
      time: "2 hours ago",
      icon: <Avatar className="size-6"><AvatarFallback>JD</AvatarFallback></Avatar>
    }, {
      id: "2",
      user: {
        name: "Jane Smith"
      },
      action: "commented on",
      target: "Bug #123",
      time: "3 hours ago",
      icon: <Avatar className="size-6"><AvatarFallback>JS</AvatarFallback></Avatar>
    }, {
      id: "3",
      user: {
        name: "Bob Wilson"
      },
      action: "completed task",
      target: "Update docs",
      time: "5 hours ago",
      icon: <Avatar className="size-6"><AvatarFallback>BW</AvatarFallback></Avatar>
    }]
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`]}))();export{C as Default,w as __namedExportsOrder,S as default};